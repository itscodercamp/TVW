import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: 'AIzaSyCdoEKGjKG9H59SnoBtLiLAWncnbsshpec' });

export const getGeminiResponse = async (prompt: string, context: string = ''): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: `You are 'Trusty', the AI automotive assistant for 'Trusted Vehicles'. 
        We are a platform for buying, selling, insuring, and valuing cars.
        Tone: Professional, helpful, friendly, and knowledgeable about Indian and Global car markets.
        Context: ${context}
        Keep answers concise (under 100 words) unless asked for a detailed report.
        If asked about prices, give a realistic market range based on year 2024/2025 data.`,
      }
    });

    return response.text || "I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error while processing your request. Please try again later.";
  }
};

export const getCarValuation = async (make: string, model: string, year: string, condition: string): Promise<string> => {
  const prompt = `Provide a market valuation estimate and a brief 3-bullet point review for a ${condition} condition ${year} ${make} ${model}. Currency: INR (Lakhs) and USD. Output format: "**Estimated Value:** [Range]\n\n**Quick Review:**\n* [Point 1]\n* [Point 2]\n* [Point 3]"`;
  return getGeminiResponse(prompt, "Task: Car Valuation");
};