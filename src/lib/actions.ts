"use server";

import { GoogleGenAI } from "@google/genai";
import { Riddle, RiddleResult } from "../model/riddle";
import * as prompts from "../constants/prompt";

let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (aiClient) return aiClient;

  aiClient = new GoogleGenAI({});

  return aiClient;
}

function sanitize(text: string | undefined) {
  if (!text) return null;

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  return text.slice(start, end + 1);
}

async function generate(ai: GoogleGenAI, prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text || "";
}

function parseJson<T>(json: string): T {
  const sanitizedJson = sanitize(json) || "";
  return JSON.parse(sanitizedJson) as T;
}

export async function startNewGame(): Promise<Riddle> {
  const ai = getAI();

  console.log("Generating new game");

  const text = await generate(ai, prompts.GEN_RIDDLE);

  return parseJson<Riddle>(text);
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

  const userPrompt = prompts.VALIDATE_RIDDLE + JSON.stringify(userSumission);

  const text = await generate(ai, userPrompt);

  return parseJson<RiddleResult>(text);
}
