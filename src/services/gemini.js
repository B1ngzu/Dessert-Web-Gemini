import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateRecipe = async (menuName, language = 'th', allergies = [], mood = null) => {
  // Using gemini-1.5-flash as it is the standard efficient model
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  let prompt = `
    You are a professional dessert chef.
    Language: ${language === 'th' ? 'Thai' : 'English'}.
  `;

  if (mood) {
    prompt += `
      The user is feeling "${mood}". Suggest a dessert that fits this mood.
      Explain why this dessert fits the mood in the "story" field.
    `;
  } else {
    prompt += `The user wants a recipe for: "${menuName}".`;
  }

  if (allergies.length > 0) {
    prompt += `
      IMPORTANT: The user has the following allergies: ${allergies.join(', ')}.
      Ensure the recipe DOES NOT contain these ingredients.
      If the requested dessert typically contains these, suggest a safe alternative or modify the recipe.
      If it's impossible to make safe, set "isDessert" to false and explain why in "message".
    `;
  }

  prompt += `
    1. Check if the request is valid (is a dessert or a valid mood request).
    2. If NOT valid, return JSON: { "isDessert": false, "message": "..." }
    3. If VALID, return JSON:
       {
         "isDessert": true,
         "name": "Dessert Name",
         "story": "Short description or story about the dessert (especially if mood-based)",
         "ingredients": [
           { "name": "ingredient name", "quantity": number, "unit": "unit (g, ml, cup, pcs)" }
         ],
         "instructions": ["step 1", "step 2", ...]
       }
    
    For "quantity", use numbers only. If it's "to taste", use 0.
    Return ONLY valid JSON.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw error;
  }
};
