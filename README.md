# Dessert AI Generator 🧁

A smart web application that generates dessert recipes based on your cravings, mood, or available ingredients using Google's Gemini AI.

## Features

- **AI Recipe Generation**: Instantly generate detailed recipes for any dessert.
- **Mood Roulette**: Don't know what to eat? Let your mood decide! (Heartbroken, Tired, Celebrate, etc.)
- **Portion Calculator**: Easily scale ingredients for any number of people.
- **Cooking Mode**: Hands-free, large-text view for easy cooking.
- **Allergy Filter**: Automatically exclude ingredients you are allergic to.
- **Bilingual Support**: Full support for Thai (TH) and English (EN).
- **Favorites**: Save your best discoveries to your personal collection.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **AI**: Google Gemini API (gemini-1.5-flash)
- **State Management**: React Context API
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory and add your Gemini API key:
    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

## License

MIT
