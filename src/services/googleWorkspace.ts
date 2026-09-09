import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User,
  signOut
} from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase App singleton safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

export const WORKSPACE_SCOPES = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/forms.body",
  "https://www.googleapis.com/auth/forms.body.readonly",
  "https://www.googleapis.com/auth/forms.responses.readonly",
];

const provider = new GoogleAuthProvider();
WORKSPACE_SCOPES.forEach((scope) => provider.addScope(scope));
provider.setCustomParameters({
  prompt: "select_account",
});

let cachedAccessToken: string | null = null;
let isSigningIn = false;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("Failed to get Google Workspace access token.");
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    // Handle expected user actions: closing popup or cancelling sign-in
    if (
      error?.code === "auth/popup-closed-by-user" ||
      error?.code === "auth/cancelled-popup-request"
    ) {
      // User dismissed or closed the sign-in popup without completing it
      return null;
    }
    if (error?.code === "auth/popup-blocked") {
      console.warn("Sign-in popup was blocked by browser. Please allow popups or open in a new tab.");
      return null;
    }
    console.warn("Google sign-in attempt did not complete:", error?.message || error);
    return null;
  } finally {
    isSigningIn = false;
  }
};

export const getCachedAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const logoutWorkspace = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

/**
 * Exports UPSC/UPPSC Notes or Study Content to Google Drive
 */
export async function exportNoteToGoogleDrive(
  title: string,
  content: string,
  token: string
): Promise<{ fileId: string; webViewLink?: string }> {
  const metadata = {
    name: `MyndMap - ${title}.txt`,
    mimeType: "text/plain",
    description: "Exported UPSC / UPPSC CSE Study Material from MyndMap",
  };

  const form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  form.append("file", new Blob([content], { type: "text/plain" }));

  const response = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to upload file to Google Drive: ${err}`);
  }

  return response.json();
}

/**
 * Creates a Google Form Quiz containing UPSC / UPPSC Prelims practice questions
 */
export async function exportQuizToGoogleForms(
  quizTitle: string,
  questions: Array<{
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation?: string;
  }>,
  token: string
): Promise<{ formId: string; responderUri: string }> {
  // Step 1: Create the form
  const createRes = await fetch("https://forms.googleapis.com/v1/forms", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      info: {
        title: `MyndMap Quiz: ${quizTitle}`,
        documentTitle: `MyndMap - ${quizTitle}`,
      },
    }),
  });

  if (!createRes.ok) {
    const err = await createRes.text();
    throw new Error(`Failed to create Google Form: ${err}`);
  }

  const createdForm = await createRes.json();
  const formId = createdForm.formId;

  // Step 2: Add questions to the Form via batchUpdate
  if (questions.length > 0) {
    const requests = questions.map((q, index) => ({
      createItem: {
        item: {
          title: `${index + 1}. ${q.question}`,
          description: q.explanation ? `Hint/Explanation: ${q.explanation}` : undefined,
          questionItem: {
            question: {
              required: true,
              choiceQuestion: {
                type: "RADIO",
                options: q.options.map((opt) => ({ value: opt })),
                shuffle: false,
              },
            },
          },
        },
        location: {
          index,
        },
      },
    }));

    const updateRes = await fetch(
      `https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requests }),
      }
    );

    if (!updateRes.ok) {
      console.warn("Failed to add questions to form batchUpdate", await updateRes.text());
    }
  }

  return {
    formId,
    responderUri: createdForm.responderUri || `https://docs.google.com/forms/d/${formId}/viewform`,
  };
}
