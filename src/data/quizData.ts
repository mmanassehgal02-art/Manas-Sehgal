import { QuizQuestion } from "../types";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // =========================================================================
  // 1. POLITY & GOVERNANCE
  // =========================================================================
  {
    id: "pol-q1",
    moduleId: "indian-polity-governance",
    subject: "Polity",
    topicId: "constitutional-amendments-basic-structure",
    topicTitle: "Constitutional Amendment (Art 368)",
    question: "With reference to the procedure for amending the Constitution under Article 368, consider the following statements:",
    statements: [
      "A Constitutional Amendment Bill can be initiated only in the Lok Sabha with the prior recommendation of the President.",
      "If there is a disagreement between the two Houses on a Constitutional Amendment Bill, a joint sitting of both Houses is summoned under Article 108.",
      "The President has no veto power over a Constitutional Amendment Bill and must give assent to it."
    ],
    options: [
      "1 and 2 only",
      "3 only",
      "2 and 3 only",
      "1, 2 and 3"
    ],
    correctAnswerIndex: 1,
    explanation: "Statement 1 is incorrect: A Constitutional Amendment Bill can be introduced in EITHER House of Parliament (Lok Sabha or Rajya Sabha) by a Minister or a private member, and DOES NOT require prior recommendation of the President. Statement 2 is incorrect: There is no provision for holding a joint sitting of both Houses of Parliament if there is a deadlock over a Constitutional Amendment Bill. Statement 3 is correct: Under the 24th Constitutional Amendment Act of 1971, the President is bound to give assent to a Constitutional Amendment Bill; the President cannot withhold assent nor return the bill for reconsideration.",
    pyqYear: "UPSC Prelims 2013 / 2020 Pattern",
    trapAlert: "Remember: 'No Joint Sitting, No Veto' under Article 368.",
    difficulty: "Prelims Standard",
    examTarget: "Both",
    sourceRef: "NCERT Class 11 Constitution at Work & M. Laxmikanth"
  },
  {
    id: "pol-q2",
    moduleId: "indian-polity-governance",
    subject: "Polity",
    topicId: "constitutional-amendments-basic-structure",
    topicTitle: "Basic Structure Doctrine",
    question: "Consider the following statements regarding the 'Basic Structure' of the Indian Constitution:",
    statements: [
      "The term 'Basic Structure' is explicitly defined in Part XX of the Constitution of India.",
      "The Supreme Court of India first propounded the Basic Structure Doctrine in the historic Kesavananda Bharati case (1973).",
      "Judicial review and federalism have both been recognized as integral elements of the basic structure."
    ],
    options: [
      "1 only",
      "2 and 3 only",
      "1 and 3 only",
      "1, 2 and 3"
    ],
    correctAnswerIndex: 1,
    explanation: "Statement 1 is incorrect: The Constitution of India DOES NOT define or even mention the phrase 'Basic Structure'; it is entirely an organic judicial creation. Statements 2 and 3 are correct: Propounded by a 13-judge bench in Kesavananda Bharati v. State of Kerala (1973), the doctrine holds that Parliament's constituent power under Art 368 does not extend to destroying core tenets such as judicial review, federalism, secularism, and rule of law.",
    pyqYear: "UPSC Prelims 2020",
    trapAlert: "UPSC frequently tests whether terms like 'Basic Structure', 'Cabinet', or 'Martial Law' are defined in the Constitution.",
    difficulty: "Prelims Standard",
    examTarget: "UPSC Prelims",
    sourceRef: "Kesavananda Bharati (1973) 4 SCC 225 & Laxmikanth"
  },
  {
    id: "pol-q3",
    moduleId: "indian-polity-governance",
    subject: "Polity",
    topicId: "federalism-interstate-relations",
    topicTitle: "Centre-State Legislative Relations (7th Schedule)",
    question: "Which of the following subjects was/were shifted from the State List to the Concurrent List by the 42nd Constitutional Amendment Act, 1976?",
    statements: [
      "1. Education",
      "2. Forests",
      "3. Public health and sanitation",
      "4. Protection of wild animals and birds"
    ],
    options: [
      "1 and 2 only",
      "1, 2 and 4 only",
      "2, 3 and 4 only",
      "1, 2, 3 and 4"
    ],
    correctAnswerIndex: 1,
    explanation: "The 42nd Constitutional Amendment Act of 1976 transferred five subjects from the State List to the Concurrent List: (1) Education, (2) Forests, (3) Weights and measures, (4) Protection of wild animals and birds, and (5) Administration of justice (constitution and organization of all courts except the Supreme Court and High Courts). 'Public health and sanitation' remains strictly in the State List (Entry 6).",
    pyqYear: "UPPSC Prelims 2021 / UPSC 2019",
    trapAlert: "Notice that 'Public Health and Sanitation' is in the State List, NOT the Concurrent List!",
    difficulty: "Prelims Standard",
    examTarget: "Both",
    sourceRef: "7th Schedule, Constitution of India & Laxmikanth"
  },

  // =========================================================================
  // 2. INDIAN ECONOMY
  // =========================================================================
  {
    id: "eco-q1",
    moduleId: "indian-economy-development",
    subject: "Economy",
    topicId: "monetary-policy-inflation-targeting",
    topicTitle: "Monetary Policy & Liquidity Tools",
    question: "With reference to the Standing Deposit Facility (SDF) introduced by the Reserve Bank of India, consider the following statements:",
    statements: [
      "The SDF acts as the floor of the Liquidity Adjustment Facility (LAF) corridor.",
      "Unlike the reverse repo window, the RBI is not required to provide government securities as collateral when absorbing liquidity under SDF.",
      "Only Regional Rural Banks (RRBs) are eligible to participate in the SDF window."
    ],
    options: [
      "1 and 2 only",
      "2 and 3 only",
      "1 only",
      "1, 2 and 3"
    ],
    correctAnswerIndex: 0,
    explanation: "Statements 1 and 2 are correct: In April 2022, RBI operationalized the Standing Deposit Facility (SDF) as the new floor of the LAF corridor (replacing fixed-rate reverse repo). The breakthrough feature of SDF is that RBI absorbs overnight liquidity from banks WITHOUT giving collateral (G-Secs) in return, thereby preventing depletion of RBI's bond holdings. Statement 3 is incorrect: All scheduled commercial banks (and primary dealers) that have LAF eligibility can participate, not just RRBs.",
    pyqYear: "UPSC Prelims 2022 / 2023",
    trapAlert: "SDF is uncollateralized liquidity absorption, which is its defining feature.",
    difficulty: "Advanced",
    examTarget: "Both",
    sourceRef: "RBI Monetary Policy Report & Ramesh Singh"
  },
  {
    id: "eco-q2",
    moduleId: "indian-economy-development",
    subject: "Economy",
    topicId: "monetary-policy-inflation-targeting",
    topicTitle: "Monetary Policy Committee (MPC)",
    question: "Consider the following statements regarding the Monetary Policy Committee (MPC):",
    statements: [
      "The MPC is a six-member body constituted under Section 45ZB of the amended RBI Act, 1934.",
      "The Governor of the Reserve Bank of India is the ex-officio Chairperson of the MPC and exercises a casting vote in the event of an equality of votes.",
      "The MPC targets Wholesale Price Index (WPI) inflation within a band of 2% to 6%."
    ],
    options: [
      "1 and 2 only",
      "2 and 3 only",
      "1 and 3 only",
      "1, 2 and 3"
    ],
    correctAnswerIndex: 0,
    explanation: "Statements 1 and 2 are correct: The MPC has 6 members (3 from RBI, 3 appointed by Central Govt). RBI Governor is the ex-officio Chairperson and has a casting (deciding) vote in case of a tie. Statement 3 is incorrect: The target is Headline Consumer Price Index (CPI-Combined), NOT WPI! The target is 4% with a tolerance band of +/- 2% (2% to 6%).",
    pyqYear: "UPSC Prelims 2017 & UPPSC 2021",
    trapAlert: "Inflation targeting in India is based on Headline CPI (Combined), not WPI or Core CPI.",
    difficulty: "Prelims Standard",
    examTarget: "Both",
    sourceRef: "RBI Act 1934 Section 45ZB"
  },

  // =========================================================================
  // 3. GEOGRAPHY
  // =========================================================================
  {
    id: "geo-q1",
    moduleId: "geography-climate-drainage",
    subject: "Geography",
    topicId: "monsoon-mechanism-el-nino",
    topicTitle: "Indian Monsoon Mechanism",
    question: "Why does the Tamil Nadu coast (Coromandel Coast) remain relatively dry during the South-West monsoon season in India?",
    statements: [
      "The Tamil Nadu coast is situated parallel to the Bay of Bengal branch of the southwest monsoon.",
      "The Tamil Nadu coast lies in the rain-shadow area of the Arabian Sea branch of the southwest monsoon."
    ],
    options: [
      "1 only",
      "2 only",
      "Both 1 and 2",
      "Neither 1 nor 2"
    ],
    correctAnswerIndex: 2,
    explanation: "Both statements 1 and 2 are correct: The Coromandel / Tamil Nadu coast receives meager rainfall during June-September because: (1) It lies parallel to the moisture-laden winds of the Bay of Bengal branch, preventing orographic ascent, and (2) It falls directly in the rain-shadow of the Western Ghats for the Arabian Sea branch. Tamil Nadu receives its major precipitation from the Northeast (Retreating) monsoon during October-December.",
    pyqYear: "NCERT Class 11 India Physical Environment & UPSC PYQ",
    trapAlert: "Both reasons together explain the phenomenon; do not choose only one.",
    difficulty: "Moderate",
    examTarget: "Both",
    sourceRef: "NCERT Class 11 (Ch 4 Climate)"
  },
  {
    id: "geo-q2",
    moduleId: "geography-climate-drainage",
    subject: "Geography",
    topicId: "monsoon-mechanism-el-nino",
    topicTitle: "Indian Ocean Dipole (IOD)",
    question: "With reference to the 'Indian Ocean Dipole (IOD)', consider the following statements:",
    statements: [
      "A positive IOD phenomenon is characterized by warmer sea surface temperatures in the western Indian Ocean relative to the eastern Indian Ocean south of Indonesia.",
      "A positive IOD can counteract the adverse impact of El Niño on the southwest monsoon in India."
    ],
    options: [
      "1 only",
      "2 only",
      "Both 1 and 2",
      "Neither 1 nor 2"
    ],
    correctAnswerIndex: 2,
    explanation: "Both statements are correct: (1) Positive IOD occurs when the western tropical Indian Ocean (near Arabian Sea and Africa) becomes warmer than the eastern Indian Ocean (near Sumatra/Indonesia). (2) This gradient creates low pressure over the western Indian Ocean, driving enhanced moisture towards the Indian subcontinent, frequently neutralizing or buffering the drying impact of an El Niño in the Pacific.",
    pyqYear: "UPSC Prelims 2017",
    trapAlert: "Positive IOD = Good for Indian Monsoon. Negative IOD = Bad for Indian Monsoon.",
    difficulty: "Prelims Standard",
    examTarget: "UPSC Prelims",
    sourceRef: "NCERT & IMD Climatology"
  },

  // =========================================================================
  // 4. ENVIRONMENT & CLIMATE CHANGE
  // =========================================================================
  {
    id: "env-q1",
    moduleId: "environment-ecology-biodiversity",
    subject: "Environment",
    topicId: "carbon-markets-paris-article-6",
    topicTitle: "Article 6 of Paris Agreement & Carbon Credits",
    question: "With reference to the Paris Agreement mechanisms, 'ITMOs' (Internationally Transferred Mitigation Outcomes) are associated with which article?",
    options: [
      "Article 2 (Temperature Goals)",
      "Article 6 (Market and Non-Market Cooperation)",
      "Article 8 (Loss and Damage)",
      "Article 13 (Transparency Framework)"
    ],
    correctAnswerIndex: 1,
    explanation: "Article 6 of the 2015 Paris Agreement establishes the framework for countries to cooperate voluntarily to reach their climate targets. Specifically, Article 6.2 covers bilateral or multilateral trading of greenhouse gas emission reductions, known as 'Internationally Transferred Mitigation Outcomes' (ITMOs), requiring Corresponding Adjustments to avoid double counting.",
    pyqYear: "UPSC Prelims 2022 / COP26 Reference",
    trapAlert: "Article 6 is all about carbon markets (6.2 bilateral, 6.4 global crediting).",
    difficulty: "Advanced",
    examTarget: "Both",
    sourceRef: "UNFCCC Secretariat & Shankar IAS"
  },

  // =========================================================================
  // 5. UTTAR PRADESH SPECIAL (UPPSC PRELIMS & MAINS)
  // =========================================================================
  {
    id: "up-q1",
    moduleId: "uttar-pradesh-special",
    subject: "UP Special",
    topicId: "up-administration-geography-odop",
    topicTitle: "UP ODOP GI Matching",
    question: "Match List-I (District of Uttar Pradesh) with List-II (Flagship ODOP Product) and select the correct answer:",
    statements: [
      "A. Aligarh — 1. Brassware",
      "B. Moradabad — 2. Locks & Hardware",
      "C. Kannauj — 3. Black Clay Pottery",
      "D. Nizamabad (Azamgarh) — 4. Natural Perfume (Attar)"
    ],
    options: [
      "A-2, B-1, C-4, D-3",
      "A-1, B-2, C-4, D-3",
      "A-2, B-1, C-3, D-4",
      "A-3, B-4, C-1, D-2"
    ],
    correctAnswerIndex: 0,
    explanation: "Correct matching: Aligarh is renowned for Locks and Hardware (2); Moradabad is known as 'Pital Nagari' for Brass metal craft (1); Kannauj is the historical capital of Indian Attar / Perfume (4); and Nizamabad in Azamgarh district is famous for its distinctive GI-tagged Black Clay Pottery (3).",
    pyqYear: "UPPSC Prelims 2022 & 2023 Direct Pattern",
    trapAlert: "Do not confuse Nizamabad (Azamgarh - Black Pottery) with Khurja (Bulandshahr - Ceramic Pottery).",
    difficulty: "Moderate",
    examTarget: "UPPSC Prelims",
    sourceRef: "UP Directorate of Industries & UPPSC GS-5"
  },
  {
    id: "up-q2",
    moduleId: "uttar-pradesh-special",
    subject: "UP Special",
    topicId: "up-administration-geography-odop",
    topicTitle: "UP Defence Industrial Corridor (Assertion-Reason)",
    question: "Given below are two statements, one is labelled as Assertion (A) and other as Reason (R):",
    assertionReason: {
      assertion: "The Uttar Pradesh Defence Industrial Corridor includes Jhansi and Chitrakoot as nodes to foster industrial development in the Bundelkhand region.",
      reason: "Bundelkhand is an ecologically fragile, drought-prone area characterized by high out-migration and low manufacturing penetration."
    },
    options: [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      "(A) is true but (R) is false",
      "(A) is false but (R) is true"
    ],
    correctAnswerIndex: 0,
    explanation: "Both (A) and (R) are true and (R) correctly explains (A). The UP Defence Corridor has 6 designated nodes: Lucknow, Kanpur, Agra, Aligarh, Jhansi, and Chitrakoot. Locating two nodes specifically in Bundelkhand (Jhansi and Chitrakoot) is a deliberate policy intervention to redress severe regional imbalances, create skilled employment, and arrest youth distress migration from this drought-prone terrain.",
    pyqYear: "UPPSC Prelims 2022 Assertion-Reason Pattern",
    trapAlert: "Classic UPPSC Assertion-Reason style: Check if the reason provides the causal 'why' for the assertion.",
    difficulty: "Advanced",
    examTarget: "UPPSC Prelims",
    sourceRef: "UPEIDA Annual Report & UPPSC GS Paper 5"
  },
  {
    id: "up-q3",
    moduleId: "uttar-pradesh-special",
    subject: "UP Special",
    topicId: "up-administration-geography-odop",
    topicTitle: "Physiography of UP: Bhabhar vs Tarai",
    question: "With reference to the physical geography of Uttar Pradesh, consider the following statements:",
    statements: [
      "In the Bhabhar tract along the foothills of the Shivaliks, Himalayan streams disappear underground due to coarse gravel and boulders.",
      "In the Tarai belt immediately south of Bhabhar, these underground streams re-emerge, creating marshy and swampy forested tracts.",
      "Dudhwa National Park is situated in the dry, rocky Bundelkhand plateau."
    ],
    options: [
      "1 and 2 only",
      "2 and 3 only",
      "1 and 3 only",
      "1, 2 and 3"
    ],
    correctAnswerIndex: 0,
    explanation: "Statements 1 and 2 are correct: Bhabhar is a narrow pebble and boulder belt where streams sink subterranean; Tarai is the damp, swampy belt south of Bhabhar where streams re-emerge, creating fertile wetlands. Statement 3 is incorrect: Dudhwa National Park is located in Lakhimpur Kheri district in the TARAI zone, NOT in the rocky Bundelkhand plateau.",
    pyqYear: "UPPSC Prelims 2021",
    trapAlert: "Dudhwa is in Lakhimpur Kheri (Tarai belt), not Bundelkhand.",
    difficulty: "Prelims Standard",
    examTarget: "UPPSC Prelims",
    sourceRef: "UPPSC GS Paper 5 Physical Geography"
  },

  // =========================================================================
  // 6. HISTORY, ART & CULTURE
  // =========================================================================
  {
    id: "arch-q1",
    moduleId: "architecture-sculpture",
    subject: "History & Culture",
    topicId: "harappan-art-architecture",
    topicTitle: "Harappan Architecture & Sculpture",
    question: "With reference to the Indus Valley Civilisation (IVC) architecture and art, consider the following statements:",
    statements: [
      "The 'Dancing Girl' from Mohenjo-daro was sculpted using the Lost-Wax (Cire Perdue) casting technique.",
      "Extensive remains of stone-built grand temples dedicated to female mother goddesses have been discovered in the Citadel of Harappa.",
      "Dholavira in Gujarat features an extraordinary cascade of rock-cut water reservoirs and unique water management systems."
    ],
    options: [
      "1 and 2 only",
      "1 and 3 only",
      "2 and 3 only",
      "1, 2 and 3"
    ],
    correctAnswerIndex: 1,
    explanation: "Statement 1 is correct: The bronze Dancing Girl from Mohenjo-daro was cast using Cire Perdue. Statement 2 is incorrect: No temples or dedicated royal palaces have been discovered across IVC sites. Statement 3 is correct: Dholavira in the Rann of Kutch features grand stone-cut water reservoirs.",
    pyqYear: "UPSC Prelims 2021 Reference",
    trapAlert: "The absence of dedicated stone temples is a classic hallmark of the Indus Valley Civilisation.",
    difficulty: "Prelims Standard",
    examTarget: "Both",
    sourceRef: "NCERT Class 11 Fine Arts"
  },
  {
    id: "arch-q2",
    moduleId: "architecture-sculpture",
    subject: "History & Culture",
    topicId: "temple-architecture-nagara-dravida",
    topicTitle: "Classical Temple Architecture (Nagara vs Dravida)",
    question: "Building 'Kalyana Mandapas' (elaborate marriage pavilions for deities) was a notable architectural feature in the temple construction of which kingdom?",
    options: [
      "Chalukyas of Badami",
      "Rashtrakutas",
      "Vijayanagara",
      "Hoysalas"
    ],
    correctAnswerIndex: 2,
    explanation: "Kalyana Mandapas were an iconic signature of the Vijayanagara Empire (14th-16th century CE). These ornate pillared open pavilions were constructed to celebrate the divine wedding ceremonies (Kalyanotsavam) of the temple deity, featuring intricate carvings of Yalis and musical pillars.",
    pyqYear: "UPSC Prelims 2019 Direct Question",
    trapAlert: "Kalyana Mandapa is uniquely identified with Vijayanagara temple complexes like the Vitthala temple at Hampi.",
    difficulty: "Prelims Standard",
    examTarget: "Both",
    sourceRef: "NCERT Class 11 Fine Arts (Ch 7)"
  }
];
