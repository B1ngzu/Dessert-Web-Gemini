import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateRecipe } from '../services/gemini';
import { Sparkles, HeartCrack, BatteryLow, PartyPopper, Loader2 } from 'lucide-react';

const moods = [
    { id: 'heartbroken', icon: HeartCrack, labelTh: 'อกหัก', labelEn: 'Heartbroken', color: 'bg-red-100 text-red-500' },
    { id: 'tired', icon: BatteryLow, labelTh: 'เหนื่อย', labelEn: 'Tired', color: 'bg-blue-100 text-blue-500' },
    { id: 'celebrate', icon: PartyPopper, labelTh: 'ฉลอง', labelEn: 'Celebrate', color: 'bg-yellow-100 text-yellow-600' },
    { id: 'random', icon: Sparkles, labelTh: 'สุ่มเลย!', labelEn: 'Surprise Me!', color: 'bg-purple-100 text-purple-500' },
];

const MoodRoulette = ({ onRecipeGenerated }) => {
    const { language, allergies } = useApp();
    const [loading, setLoading] = useState(false);
    const [selectedMood, setSelectedMood] = useState(null);

    const handleMoodSelect = async (mood) => {
        setSelectedMood(mood.id);
        setLoading(true);
        try {
            const result = await generateRecipe(null, language, allergies, mood.labelEn);
            onRecipeGenerated(result);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setSelectedMood(null);
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-beige-200 shadow-lg mb-12">
            <h3 className="text-2xl font-bold text-center text-wood-300 mb-6">
                {language === 'th' ? 'วันนี้รู้สึกยังไง?' : 'How are you feeling today?'}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {moods.map((mood) => (
                    <button
                        key={mood.id}
                        onClick={() => handleMoodSelect(mood)}
                        disabled={loading}
                        className={`
                            relative p-4 rounded-xl flex flex-col items-center gap-3 transition-all
                            ${mood.color} hover:scale-105 active:scale-95
                            ${loading && selectedMood !== mood.id ? 'opacity-50 cursor-not-allowed' : ''}
                            ${loading && selectedMood === mood.id ? 'ring-2 ring-wood-300' : ''}
                        `}
                    >
                        {loading && selectedMood === mood.id ? (
                            <Loader2 className="animate-spin" size={32} />
                        ) : (
                            <mood.icon size={32} />
                        )}
                        <span className="font-bold">
                            {language === 'th' ? mood.labelTh : mood.labelEn}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MoodRoulette;
