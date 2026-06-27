import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini Client
let geminiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY environment variable is not configured.");
    }
    geminiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// Endpoint to verify system status
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    hasApiKey: !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY",
  });
});

// Interactive AI UAT Builder Proxy Endpoint
app.post("/api/generate-uat", async (req, res) => {
  const { steps } = req.body;

  if (!steps || typeof steps !== "string" || steps.trim().length === 0) {
    return res.status(400).json({ error: "Please provide valid raw test steps." });
  }

  try {
    const ai = getGeminiClient();

    const systemInstruction = `You are an expert Quality Assurance Engineer and Application Maintenance Associate.
Your job is to convert raw, informal, or conversational test instructions into structured, professional, ready-to-execute UAT (User Acceptance Testing) scripts.
Analyze the user's raw steps, identify pre-conditions, break them down into granular step-by-step actions with clear physical actions, and define highly specific expected results. Include post-conditions or clean-up steps if applicable.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Generate a structured UAT script for the following raw user actions:\n\n"${steps}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "A clear, concise, and professional title of the test case, starting with a verb like 'Verify' or 'Validate'.",
            },
            description: {
              type: Type.STRING,
              description: "A short professional summary explaining the goal, scope, and business value of this acceptance test.",
            },
            preconditions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "System pre-conditions, user roles, state requirements, or initial setups required before starting the test.",
            },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stepNumber: { type: Type.INTEGER },
                  action: {
                    type: Type.STRING,
                    description: "Specific, active-voice, granular action taken by the tester (e.g., 'Click on the Add to Cart button').",
                  },
                  expectedResult: {
                    type: Type.STRING,
                    description: "What the system should display, update, or do as a result of this action, with clear indicators.",
                  },
                },
                required: ["stepNumber", "action", "expectedResult"],
              },
              description: "Sequenced list of test actions and expected system outputs.",
            },
            postconditions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Final system state, clean-up operations, or database checks following a successful test flow.",
            },
          },
          required: ["title", "description", "preconditions", "steps", "postconditions"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    const uatScript = JSON.parse(text.trim());
    return res.json({ success: true, data: uatScript, simulated: false });

  } catch (error: any) {
    console.warn("Gemini API Error or Missing Key. Using professional QA simulator fallback:", error.message);
    
    // Fallback: Smart mock generation to ensure the portfolio works beautifully even without an active key!
    // It detects keywords in the user's input and returns a realistic custom-tailored UAT script.
    const inputLower = steps.toLowerCase();
    let title = "Verify Application Flow";
    let description = "Validate the system handles the user's custom scenario without errors and adheres to acceptance criteria.";
    let preconditions = ["User is successfully logged into the application sandbox environment.", "Browser session is active and responsive."];
    let testSteps = [
      { stepNumber: 1, action: "Navigate to the designated application page.", expectedResult: "The system loads successfully with all elements fully rendered." },
      { stepNumber: 2, action: `Execute user instructions: "${steps}"`, expectedResult: "The application processes the actions correctly and updates the database." },
      { stepNumber: 3, action: "Verify status reports and visual feedback are correct.", expectedResult: "System shows success alerts and displays updated state with zero latency." }
    ];
    let postconditions = ["The system updates database logs to reflect successful transaction status.", "The user remains in a stable and active session state."];

    if (inputLower.includes("login") || inputLower.includes("signin") || inputLower.includes("sign in")) {
      title = "Verify User Authentication Flow";
      description = "Ensure that users can securely log in using valid credentials and that appropriate validation errors appear for invalid inputs.";
      preconditions = ["User has a registered account in the system database.", "User is currently on the login screen."];
      testSteps = [
        { stepNumber: 1, action: "Input registered email address into the Email field.", expectedResult: "The field accepts the input and does not display formatting errors." },
        { stepNumber: 2, action: "Enter the correct password into the Password field.", expectedResult: "Characters are masked for security; password strength validation passes." },
        { stepNumber: 3, action: "Click the 'Login' action button.", expectedResult: "The system processes credentials, redirects the user to the central dashboard, and loads user profile data." }
      ];
      postconditions = ["A secure JWT auth session token is initialized in local storage.", "An audit log entry records the successful authentication timestamp."];
    } else if (inputLower.includes("cart") || inputLower.includes("buy") || inputLower.includes("checkout") || inputLower.includes("shop")) {
      title = "Verify E-Commerce Add-to-Cart & Checkout Sequence";
      description = "Validate that items selected by the user are accurately captured in the checkout basket, price calculation includes tax/shipping, and order completes.";
      preconditions = ["User is logged in.", "Item inventory is positive in database.", "Designated item is visible on product catalogue page."];
      testSteps = [
        { stepNumber: 1, action: "Click 'Add to Cart' on the selected item card.", expectedResult: "A micro-animation completes; shopping cart badge increments from 0 to 1." },
        { stepNumber: 2, action: "Click the shopping cart icon and choose 'Proceed to Checkout'.", expectedResult: "User is navigated to order checkout interface displaying item name, quantity (1), and correct subtotal." },
        { stepNumber: 3, action: "Complete mock shipping details and click 'Submit Order'.", expectedResult: "Order is registered in server database, order confirmation ID is generated on screen, and cart resets to empty." }
      ];
      postconditions = ["E-commerce cart contents are cleared.", "An order summary email is dispatched to user's registered inbox."];
    } else if (inputLower.includes("create") || inputLower.includes("add") || inputLower.includes("new task") || inputLower.includes("todo")) {
      title = "Verify New Item Creation & Listing Update";
      description = "Ensure users can create a new record (task, item, note) through the UI and verify it immediately renders on the active listing panel.";
      preconditions = ["User is navigated to the listing dashboard.", "Create input is active and focused."];
      testSteps = [
        { stepNumber: 1, action: "Enter a valid name in the creation text field.", expectedResult: "The text is accepted; characters remain within limit bounds." },
        { stepNumber: 2, action: "Click the 'Add Item' or 'Create' button.", expectedResult: "A request is sent, the input field clears automatically, and a confirmation toast message appears." },
        { stepNumber: 3, action: "Observe the active list element.", expectedResult: "The newly created item is rendered at the top of the list with accurate titles and standard default settings." }
      ];
      postconditions = ["New record is written into local state/database.", "Dashboard analytics update to increment total item count."];
    }

    return res.json({
      success: true,
      data: {
        title,
        description,
        preconditions,
        steps: testSteps,
        postconditions
      },
      simulated: true,
      message: "This is a high-fidelity simulation generated by our backup QA engine. To activate live real-time Gemini generation, configure a GEMINI_API_KEY in Settings."
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
