import { GoogleGenerativeAI } from "@google/generative-ai";
import { DiagnosticResult } from "../types";
import { CHAKRAS } from "../constants";

// Using VITE_ prefix for environment variables in Vite projects
const API_KEY = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text || "I'm sorry, I couldn't generate your report at this time. Please try again later.";
  } catch (error: any) {
    console.error("Error generating report:", error);

    if (error?.message?.includes('429')) {
      return "The cosmic energies are receiving too many requests right now (API Quota Exceeded). Please wait a minute and try clicking 'Retake' or refreshing the page. Your Shakti journey is worth the wait!";
    }

    return "The cosmic energies are a bit tangled right now. Please check your API key or connection and try again.";
  }
}
