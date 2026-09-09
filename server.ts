import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// AI UPSC & UPPSC Guru Doubt Clearing / Topic Deep Dive
app.post("/api/ai/ask", async (req, res) => {
  try {
    const { question, topicContext, examFocus = "Both UPSC & UPPSC" } = req.body;
    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Valid question is required." });
    }

    const ai = getGeminiClient();
    const systemInstruction = `You are a premier UPSC Civil Services Examination (CSE) and UPPSC Provincial Civil Services mentor and author of top civil services preparation materials (grounded in NCERT Class 6-12, Laxmikanth, Spectrum, Ramesh Singh, Shankar IAS, GC Leong, and UP Special GS Papers 5 & 6).
Provide crisp, high-yield, exam-oriented responses.
Structure your answer using:
1. **Core Concept / Definition**: Concise and precise, grounded in NCERT & standard references.
2. **Key Salient Features / Historical / Legal / Economic Context**: Bulleted with bold keywords, constitutional articles, committee reports, and data.
3. **Prelims High-Yield Trap / Mnemonics**: Critical nuances UPSC/UPPSC frequently test (e.g. Assertion-Reason traps, tricky exceptions, statement eliminators).
4. **Mains Dimension / Keywords / UPPSC Special Angle**: High-scoring terminology to include in answers and relevant GS 1-4 / UP GS 5-6 dimensions.
Keep the tone encouraging, authoritative, analytical, and sharp.`;

    const prompt = `Target Exam: ${examFocus}\n${topicContext ? `Topic Context: ${topicContext}\n\n` : ""}Aspirant Query: ${question}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ answer: response.text || "No response generated." });
  } catch (error: any) {
    console.error("Error in /api/ai/ask:", error);
    res.status(500).json({ 
      error: error.message || "Failed to consult MyndMap AI mentor." 
    });
  }
});

// AI Generated Custom Mind Map and Flowchart
app.post("/api/ai/generate-mindmap", async (req, res) => {
  try {
    const { topic, subject = "Polity", examFocus = "Both UPSC & UPPSC" } = req.body;
    if (!topic || typeof topic !== "string") {
      return res.status(400).json({ error: "Valid topic is required." });
    }

    const ai = getGeminiClient();
    const systemInstruction = `You are an expert UPSC & UPPSC syllabus architect for 'MyndMap'.
Generate an interactive concept mind map and a 5-step procedural flowchart for the requested topic.
Grounded in NCERTs and standard sources (Laxmikanth, Ramesh Singh, Shankar IAS, UP Special).
Return clean JSON matching the specified schema.`;

    const prompt = `Generate a comprehensive Mind Map and Step-by-Step Flowchart for the topic: "${topic}". Subject: ${subject}. Exam focus: ${examFocus}. Include shortcut mnemonic, key concepts, prelims traps, and mains keywords.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            subject: { type: Type.STRING },
            description: { type: Type.STRING },
            sources: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            shortcutMnemonic: { type: Type.STRING },
            flowchart: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                steps: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      step: { type: Type.INTEGER },
                      label: { type: Type.STRING },
                      description: { type: Type.STRING },
                      tag: { type: Type.STRING },
                      highlight: { type: Type.BOOLEAN },
                    },
                    required: ["step", "label", "description"],
                  },
                },
              },
              required: ["title", "steps"],
            },
            rootNode: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                label: { type: Type.STRING },
                type: { type: Type.STRING },
                children: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      label: { type: Type.STRING },
                      type: { type: Type.STRING },
                      notes: { type: Type.STRING },
                    },
                    required: ["id", "label"],
                  },
                },
              },
              required: ["id", "label"],
            },
          },
          required: ["id", "title", "subject", "description", "rootNode"],
        },
      },
    });

    const parsed = JSON.parse(response.text?.trim() || "{}");
    res.json({ mindMap: parsed });
  } catch (error: any) {
    console.error("Error in /api/ai/generate-mindmap:", error);
    res.status(500).json({ error: error.message || "Failed to generate mind map." });
  }
});

// AI Shortcut Revision Summary
app.post("/api/ai/shortcut-revision", async (req, res) => {
  try {
    const { topic, examType = "Both" } = req.body;
    if (!topic || typeof topic !== "string") {
      return res.status(400).json({ error: "Valid topic is required." });
    }

    const ai = getGeminiClient();
    const prompt = `Provide a 3-minute rapid revision shortcut for the UPSC / UPPSC topic: "${topic}".
Target: ${examType}.
Include:
1. 💡 **Core Mnemonic / Shortcut Rule**
2. ⚠️ **Top 3 Prelims Elimination Traps / Statement Pitfalls**
3. ✍️ **Top 3 High-Scoring Mains Keywords & Phrases**
4. 📊 **Micro Flowchart / Sequence (ASCII/Step format)**
5. 🏛️ **UPPSC Specific Fact / District / Art / Case Law (if applicable)**`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert UPSC CSE and UPPSC exam ranker summarizing high-yield topics into punchy, high-retention revision shortcuts.",
      },
    });

    res.json({ revision: response.text || "No revision generated." });
  } catch (error: any) {
    console.error("Error in /api/ai/shortcut-revision:", error);
    res.status(500).json({ error: error.message || "Failed to generate shortcut revision." });
  }
});

// AI Generated Custom Prelims Quiz
app.post("/api/ai/generate-quiz", async (req, res) => {
  try {
    const { topic, difficulty = "UPSC Prelims Standard" } = req.body;
    if (!topic || typeof topic !== "string") {
      return res.status(400).json({ error: "Valid topic is required." });
    }

    const ai = getGeminiClient();
    const systemInstruction = `You are an expert UPSC Civil Services Prelims question setter specializing in Indian Heritage and Culture (GS Paper 1).
Generate 4 high-quality Prelims questions reflecting authentic modern UPSC patterns:
- Multi-statement questions ("Consider the following statements...", "Which of the statements given above is/are correct?")
- Modern UPSC pattern options ("Only one", "Only two", "All three", "None") or pair matching ("Which of the pairs given above is/are correctly matched?")
- Include subtle historical nuances, patrons, architectural features, literature, philosophy, or festivals.
- Provide comprehensive explanation for each question with elimination logic.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Generate 4 UPSC Prelims pattern multiple choice questions on the Art & Culture topic: "${topic}". Difficulty level: ${difficulty}.`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING },
              statements: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Numbered statements (1., 2., 3.) if multi-statement question",
              },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Four options (A, B, C, D)",
              },
              correctAnswerIndex: { 
                type: Type.INTEGER, 
                description: "Index from 0 to 3 corresponding to options array" 
              },
              explanation: { 
                type: Type.STRING, 
                description: "Detailed explanation analyzing each statement and referencing historical sources" 
              },
              pyqRelevance: { 
                type: Type.STRING, 
                description: "How this concept appeared or can appear in UPSC Prelims" 
              },
            },
            required: ["id", "question", "options", "correctAnswerIndex", "explanation"],
          },
        },
      },
    });

    const parsedQuestions = JSON.parse(response.text?.trim() || "[]");
    res.json({ questions: parsedQuestions });
  } catch (error: any) {
    console.error("Error in /api/ai/generate-quiz:", error);
    res.status(500).json({ 
      error: error.message || "Failed to generate AI quiz questions." 
    });
  }
});

// AI Mains Answer Evaluator
app.post("/api/ai/evaluate-answer", async (req, res) => {
  try {
    const { question, userAnswer } = req.body;
    if (!question || !userAnswer) {
      return res.status(400).json({ error: "Both question and user answer are required." });
    }

    const ai = getGeminiClient();
    const prompt = `UPSC GS-1 Art and Culture Mains Question:
"${question}"

Aspirant's Answer Draft:
"${userAnswer}"

Please evaluate this answer like a senior UPSC evaluator and provide:
1. Overall Estimated Score (out of 10 or 15 marks)
2. Strengths of the answer
3. Missing Dimensions / Keywords / Examples (e.g. specific temple examples, dynasties, texts, or geographical Spread)
4. Recommended Diagram / Map additions (how a map or sketch would fetch +1.5 marks)
5. Model Answer Outline (ideal Introduction, 4-5 bulleted body arguments, and balanced Conclusion)`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an official UPSC Mains GS Paper 1 examiner evaluating Indian Heritage and Culture answers.",
      },
    });

    res.json({ evaluation: response.text || "No evaluation generated." });
  } catch (error: any) {
    console.error("Error in /api/ai/evaluate-answer:", error);
    res.status(500).json({ error: error.message || "Failed to evaluate answer." });
  }
});

// Vite middleware for development & Static Serving for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`UPSC Art & Culture Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
