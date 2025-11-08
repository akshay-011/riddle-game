"use server";

import { GoogleGenAI } from "@google/genai";
import { Riddle, RiddleResult } from "../model/riddle";

let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (aiClient) return aiClient;

  aiClient = new GoogleGenAI({});

  return aiClient;
}

export async function startNewGame(): Promise<Riddle> {
  const ai = getAI();
  console.log("Generating new game");

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are an expert riddle generator. Create a challenging, multi-step logic riddle. The riddle must be solvable by pure logic and simple arithmetic. Respond ONLY with a single JSON object that strictly matches the provided structure. DO NOT wrap the JSON in markdown code fences or add any other commentary.
* Corresponding JSON Structure (User Query Example)
JSON

{
  "title": "A catchy title for the riddle.",
  "challengeLevel": "Hard",
  "riddleText": "The full text of the riddle, including all necessary constraints, conditions, and details to solve it.",
  "correctAnswer": "The concise, final solution (e.g., '17 minutes', 'A match', or 'The letter N')."
}

This structure clearly separates the instructions (System Prompt) from the format (User Query), which is the most effective way to guide the AI for reliable JSON output.
`,
  });

  console.log("Game generated", response.text);
  const sanitizedJson = sanitize(response.text) || "";

  return JSON.parse(sanitizedJson) as Riddle;
}

export async function submitRiddleAnswer(
  riddle: Riddle,
  userInput: string
): Promise<RiddleResult> {
  const ai = getAI();

  console.log("Submitting answer", userInput, "for riddle", riddle);

  const userSumission = {
    correctAnswer: riddle.correctAnswer,
    userInput,
  };

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
You are an intelligent human-level validator. Your task is to evaluate a user's riddle solution against the known correct answer. Ignore minor differences in phrasing, capitalization, spelling (if the intent is clear), or formatting. The core question is: 'Did the user logically solve the riddle?' You MUST respond ONLY with a single JSON object.
User Query (The Input & Output Specification)
This is the JSON object that is sent to the AI. It contains the input data and serves as a strict template for the output data.
JSON

{
  "correctAnswer": "The stored correct answer from the generated JSON.",
  "userInput": "The text submitted by the user.",
}
You should return this model json
{
  "isCorrect": "Based on your human-level judgment, is the user_submission a substantially correct answer? Respond with ONLY true or false."
}
This structure clearly separates the instructions (System Prompt) from the format (User Query), which is the most effective way to guide the AI for reliable JSON output.
`,
  });

  const sanitizedJson = sanitize(response.text) || "";
  const result = JSON.parse(sanitizedJson) as RiddleResult;

  return {
    ...userSumission,
    ...result,
  };
}

function sanitize(text: string | undefined) {
  if (!text) return null;

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  return text.slice(start, end + 1);
}
