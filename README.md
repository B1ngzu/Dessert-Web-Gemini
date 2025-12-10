# 🍰 Dessert AI Generator


**Dessert AI Generator** is a web-based application designed to help users discover, create, and cook delicious desserts. It goes beyond simple recipe searching by using Generative AI to create custom recipes, adjust portions dynamically, and even recommend treats based on your mood.

## ✨ Key Features

### 🤖 1. AI Recipe Generator & Validation
* **Generative AI Core:** Instantly generates detailed ingredients and step-by-step cooking instructions based on the menu name provided.
* **Smart Context Awareness:** Equipped with intelligent validation to ensure relevance. If a user inputs a non-dessert item (e.g., "Fried Rice" or random objects), the AI detects the context and refuses to generate a recipe, preventing hallucinated or incorrect outputs.

### 📌 2. Recipe Collection & Pinning
* **History Log:** Automatically saves previously generated recipes in a dedicated history page.
* **Favorites System:** Users can **"Pin"** or star their favorite recipes to keep them permanently in their personal gallery for quick access.

### 🎭 3. Dessert Roulette (Mood-Based Recommendation)
* **Mood Analysis:** Unsure what to eat? Select your current mood (e.g., "Heartbroken", "Exhausted", "Happy"), and the AI will analyze flavor profiles to recommend the perfect comfort dessert (e.g., Chocolate Lava for healing, Bingsu for refreshing).

### 🔢 4. Smart Portion Calculator
* **Dynamic Scaling:** Automatically recalculates ingredient quantities based on the desired number of servings.
* **Auto-Adjust:** Simply increase or decrease the serving count, and the system instantly updates grams/tablespoons—no manual math required.

### 👨‍🍳 5. Cooking View (Hands-Free Mode)
* **Optimized UI:** A simplified, large-text interface designed for readability from a distance while cooking.
* **Screen Awake:** Prevents the device screen from turning off automatically, so you don't have to touch the screen with messy hands (flour/butter) to wake it up.

### 🛡️ 6. Allergy Filter System
* **Safety First:** Filters and highlights common allergens (e.g., Peanuts, Dairy, Gluten).
* **Smart Alerts:** Warns users with red indicators or hides menus entirely based on their safety profile settings.

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite
* **AI Model:** Google Gemini API (Generative Language API)
* **Styling:** Tailwind CSS
* **State Management:** React Hooks & LocalStorage (for History/Favorites persistence)
