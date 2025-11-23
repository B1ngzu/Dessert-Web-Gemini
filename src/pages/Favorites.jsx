import React from 'react';
import { useApp } from '../context/AppContext';
import RecipeCard from '../components/RecipeCard';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Favorites = () => {
    const { favorites, language } = useApp();

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <Heart className="text-wood-300" size={32} fill="currentColor" />
                <h2 className="text-3xl font-bold text-wood-300">
                    {language === 'th' ? 'เมนูโปรดของคุณ' : 'Your Favorite Recipes'}
                </h2>
            </div>

            {favorites.length === 0 ? (
                <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-beige-300">
                    <p className="text-gray-500 text-lg">
                        {language === 'th'
                            ? 'ยังไม่มีรายการโปรด เริ่มค้นหาและบันทึกสูตรที่คุณชอบได้เลย'
                            : 'No favorites yet. Start searching and save recipes you like.'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favorites.map((recipe, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <RecipeCard recipe={recipe} />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
