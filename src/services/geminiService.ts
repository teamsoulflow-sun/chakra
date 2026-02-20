import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosticResult, ChakraStatus } from "../types";
import { CHAKRAS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateDiagnosticReport(results: DiagnosticResult[]) {
  const chakraData = results.map(r => {
    const info = CHAKRAS.find(c => c.id === r.chakraId);
    return {
      name: info?.name,
      sanskritName: info?.sanskritName,
      status: r.status,
      score: r.score
    };
  });

  const prompt = `
    You are a wise and empathetic Ayurvedic and Spiritual guide specializing in Chakra healing for Indian women.
    Based on the following chakra diagnostic results, provide a comprehensive, engaging, and culturally resonant report.
    
    Results:
    ${JSON.stringify(chakraData, null, 2)}
    
    The report should include:
    1. A warm, empowering introduction addressing the user as a "Shakti".
    2. A detailed breakdown of their most active and most blocked chakras.
    3. Practical, fun, and culturally relevant advice for balancing each chakra (e.g., specific yoga poses, foods like 'haldi doodh' or 'amla', mantras, or even lifestyle changes like 'setting boundaries with relatives').
    4. A final "Soul Message" for her journey.
    
    Use a mix of English and common Hindi/Sanskrit spiritual terms (like Prana, Dharma, Karma, Ojas) where appropriate to make it feel authentic.
    Keep the tone "fun and engaging" but deeply insightful.
    Format the output in Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text || "I'm sorry, I couldn't generate your report at this time. Please try again later.";
  } catch (error) {
    console.error("Error generating report:", error);
    return "The cosmic energies are a bit tangled right now. Please try again in a moment.";
  }
}
