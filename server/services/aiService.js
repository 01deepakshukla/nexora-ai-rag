require('dotenv').config();

let genAI = null;
const MODEL = 'gemini-3.8-flash';

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
      model: MODEL,
      contents: prompt.trim(),
    });

    if (typeof response.text !== 'string' || !response.text.trim()) {
      throw new Error('Gemini returned an empty response.');
    }

    return response.text.trim();
  } catch (error) {
    let message = error instanceof Error ? error.message : 'Unknown provider error.';

    try {
      message = JSON.parse(message).error?.message || message;
    } catch {
      // Keep the original message when the provider did not return JSON.
    }

    if (process.env.GEMINI_API_KEY) {
      message = message.replaceAll(process.env.GEMINI_API_KEY, '[REDACTED]');
    }
    message = message
      .replace(/([?&]key=)[^&\s]+/gi, '$1[REDACTED]')
      .replace(/Bearer\s+\S+/gi, 'Bearer [REDACTED]')
      .slice(0, 500);

    console.error('Gemini API request failed:', {
      status: Number.isInteger(error?.status) ? error.status : undefined,
      message,
    });

    const responseError = new Error('The AI provider could not generate a response. Please try again later.');
    responseError.status = 502;
    throw responseError;
  }
}

module.exports = {
  generateReply,
};
