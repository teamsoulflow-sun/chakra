import { GoogleGenerativeAI } from "@google/generative-ai";
import { DiagnosticResult } from "../types";
import { CHAKRAS } from "../constants";

// Vite standard way of accessing env variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateDiagnosticReport(results: DiagnosticResult[]) {
  const chakraData = results.map(r => {
    const info = CHAKRAS.find(c => c.id === r.chakraId);
    return {
      name: info?.name,
      sanskritName: info?.sanskritName,
      status: r.status,
      score: r.score,
      color: info?.color
    };
  });

  // Sort to find dominant and blocked
  const sorted = [...chakraData].sort((a, b) => b.score - a.score);
  const dominant = sorted[0];
  const blocked = sorted[sorted.length - 1];

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
    // Attempt AI Generation
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (text) return text;
    throw new Error("Empty response from AI");

  } catch (error: any) {
    console.error("Gemini API Error:", error);

    // FALLBACK REPORT: If API fails (Quota/Key issues), generate a beautiful static report
    // This ensures the user NEVER sees an error message instead of their results.

    return `
# Your Shakti Energy Report
*Guided by the Wisdom of the Chakras*

Namaste, Shakti. The cosmic energies are flowing through you in unique patterns today. While our AI guide is momentarily meditating, I have prepared this personalized analysis of your energy centers based on your diagnostic results.

### 🌟 Your Core Energy: ${dominant.name} (${dominant.status})
Your **${dominant.name}** is your strongest light right now. This means your sense of ${dominant.name === 'Root' ? 'grounding and stability' : dominant.name === 'Sacral' ? 'creativity and emotion' : dominant.name === 'Solar Plexus' ? 'power and will' : dominant.name === 'Heart' ? 'love and compassion' : dominant.name === 'Throat' ? 'truth and expression' : dominant.name === 'Third Eye' ? 'intuition and vision' : 'connection to the divine'} is radiating beautifully.

### 🧘 Area for Healing: ${blocked.name} (${blocked.status})
Your **${blocked.name}** is calling for your attention. When this center is ${blocked.status}, you might feel ${blocked.name === 'Root' ? 'unsettled or anxious' : blocked.name === 'Sacral' ? 'creatively blocked' : blocked.name === 'Solar Plexus' ? 'a lack of confidence' : blocked.name === 'Heart' ? 'guarded or lonely' : blocked.name === 'Throat' ? 'unable to speak your truth' : blocked.name === 'Third Eye' ? 'disconnected from your inner voice' : 'spiritually adrift'}.

---

### ✨ Sacred Practices for Balance

**For your ${blocked.name}:**
*   **Mantra:** Chant the seed mantra *"${blocked.name === 'Root' ? 'LAM' : blocked.name === 'Sacral' ? 'VAM' : blocked.name === 'Solar Plexus' ? 'RAM' : blocked.name === 'Heart' ? 'YAM' : blocked.name === 'Throat' ? 'HAM' : blocked.name === 'Third Eye' ? 'OM' : 'AH'}"* during your morning tea.
*   **Nourishment:** Incorporate more ${blocked.name === 'Root' ? 'root vegetables like beetroot' : blocked.name === 'Sacral' ? 'fluids and orange fruits' : blocked.name === 'Solar Plexus' ? 'yellow lentils and ginger' : blocked.name === 'Heart' ? 'leafy greens and rose tea' : blocked.name === 'Throat' ? 'honey and blue berries' : blocked.name === 'Third Eye' ? 'dark grapes and herbal teas' : 'cleansing water'} into your diet.
*   **Daily Ritual:** Spend 5 minutes grounding your feet on the earth (Prithvi Namaskar).

---

### 🕊️ Your Soul Message
*"You are not a drop in the ocean, you are the entire ocean in a drop."* My dear Shakti, your journey towards balance is a sacred dance. Trust the process, nourish your Prana, and remember that you carry the light of the universe within you.

---
*Note: This report was generated using our diagnostic fallback system due to high traffic on our AI servers. For a deeper personalized container, join us in **Zen Gym 2.0**.*
`;
  }
}
