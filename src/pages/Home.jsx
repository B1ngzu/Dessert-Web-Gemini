import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateRecipe } from '../services/gemini';
import RecipeCard from '../components/RecipeCard';
import MoodRoulette from '../components/MoodRoulette';
import { Search, Loader2, AlertCircle, UtensilsCrossed } from 'lucide-react';
import { motion } from 'framer-motion';

const POPULAR_DESSERTS = [
    { name: 'Chocolate Lava Cake', nameTh: 'ช็อกโกแลตลาวา', image: '🍫' },
    { name: 'Mango Sticky Rice', nameTh: 'ข้าวเหนียวมะม่วง', image: '🥭' },
    { name: 'Strawberry Bingsu', nameTh: 'บิงซูสตรอว์เบอร์รี', image: '🍧' },
];

const COMMON_ALLERGIES = [
    { id: 'nuts', labelTh: 'ถั่ว', labelEn: 'Nuts' },
    { id: 'dairy', labelTh: 'นม', labelEn: 'Dairy' },
    { id: 'gluten', labelTh: 'กลูเตน (แป้งสาลี)', labelEn: 'Gluten' },
    { id: 'eggs', labelTh: 'ไข่', labelEn: 'Eggs' },
];

const Home = () => {
    const { language, addToHistory, allergies, toggleAllergy } = useApp();
    const [menuName, setMenuName] = useState('');
    const [loading, setLoading] = useState(false);
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(null);

    const handleGenerate = async (name) => {
        setLoading(true);
        setError(null);
        setRecipe(null);
        setMenuName(name);

        try {
            const result = await generateRecipe(name, language, allergies);

            if (result.isDessert) {
                setRecipe(result);
                addToHistory(result);
            } else {
                setError(result.message);
            }
        } catch (err) {
            console.error("Recipe generation error:", err);
            setError(language === 'th'
                ? `เกิดข้อผิดพลาด: ${err.message || 'โปรดลองใหม่อีกครั้ง'}`
                : `Error: ${err.message || 'Something went wrong. Please try again.'}`
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!menuName.trim()) return;
        handleGenerate(menuName);
    };

    const handleRouletteResult = (result) => {
        if (result.isDessert) {
            setRecipe(result);
            addToHistory(result);
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-wood-300 mb-4 drop-shadow-sm">
                    {language === 'th' ? 'ค้นหาสูตรของหวานที่คุณชื่นชอบ' : 'Find Your Favorite Dessert Recipe'}
                </h2>
                <p className="text-gray-600 text-lg font-medium">
                    {language === 'th'
                        ? 'เพียงพิมพ์ชื่อเมนู เราจะช่วยคุณหาสูตรและวิธีทำ'
                        : 'Just type the menu name, and we will find the ingredients and instructions for you.'}
                </p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSubmit} className="mb-8 relative max-w-2xl mx-auto">
                <div className="relative group">
                    <input
                        type="text"
                        value={menuName}
                        onChange={(e) => setMenuName(e.target.value)}
                        placeholder={language === 'th' ? 'เช่น บราวนี่, บิงซู...' : 'e.g., Brownie, Bingsu...'}
                        className="w-full px-6 py-4 pl-14 rounded-full border-2 border-beige-300 focus:border-wood-200 focus:outline-none text-lg shadow-sm bg-white/90 backdrop-blur-sm transition-all group-hover:shadow-md"
                        disabled={loading}
                    />
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-wood-200" size={24} />
                    <button
                        type="submit"
                        disabled={loading || !menuName.trim()}
                        className="absolute right-2 top-2 bottom-2 bg-wood-200 hover:bg-wood-300 text-white px-6 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : (language === 'th' ? 'ค้นหา' : 'Search')}
                    </button>
                </div>
            </form>

            {/* Allergy Filter */}
            <div className="max-w-2xl mx-auto mb-12">
                <div className="flex flex-wrap justify-center gap-3">
                    <div className="flex items-center gap-2 text-wood-300 font-bold mr-2">
                        <UtensilsCrossed size={20} />
                        <span>{language === 'th' ? 'แพ้อาหาร:' : 'Allergies:'}</span>
                    </div>
                    {COMMON_ALLERGIES.map((allergy) => (
                        <button
                            key={allergy.id}
                            onClick={() => toggleAllergy(allergy.labelEn)}
                            className={`
                                px-4 py-1.5 rounded-full text-sm font-medium transition-all border
                                ${allergies.includes(allergy.labelEn)
                                    ? 'bg-red-100 text-red-600 border-red-200'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-wood-200'}
                            `}
                        >
                            {language === 'th' ? allergy.labelTh : allergy.labelEn}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mood Roulette */}
            <MoodRoulette onRecipeGenerated={handleRouletteResult} />

            {/* Popular Desserts */}
            {!recipe && !loading && (
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-center text-wood-300 mb-6">
                        {language === 'th' ? 'เมนูยอดฮิต' : 'Popular Desserts'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {POPULAR_DESSERTS.map((dessert, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                onClick={() => handleGenerate(language === 'th' ? dessert.nameTh : dessert.name)}
                                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-beige-200 cursor-pointer hover:shadow-md hover:border-wood-200 transition-all text-center"
                            >
                                <div className="text-4xl mb-3">{dessert.image}</div>
                                <h4 className="font-bold text-wood-300">
                                    {language === 'th' ? dessert.nameTh : dessert.name}
                                </h4>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 max-w-2xl mx-auto mb-8 border border-red-100 shadow-sm"
                >
                    <AlertCircle size={24} />
                    <p>{error}</p>
                </motion.div>
            )}

            {recipe && <RecipeCard recipe={recipe} />}
        </div>
    );
};

export default Home;
