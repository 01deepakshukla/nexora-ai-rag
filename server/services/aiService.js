require('dotenv').config();

let genAI = null;

async function getAI() {
  if (!genAI) {
    const { GoogleGenAI } = await import('@google/genai');

    genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  return genAI;
}

async function generateReply(prompt) {
  if (!prompt || !prompt.trim()) {
    return 'Please enter a message.';
  }

  try {
    // Lazy-load the Gemini client only when the first AI response is needed.
    const ai = await getAI();

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt.trim(),
    });

    return response.text;
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'Sorry, I am unable to generate a response right now.';
  }
}

module.exports = {
  generateReply,
};
