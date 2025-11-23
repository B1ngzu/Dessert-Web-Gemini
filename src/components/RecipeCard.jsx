import React, { useState } from 'react';
import { Heart, ChevronDown, ChevronUp, Users, Play, ChefHat } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import CookingView from './CookingView';

const RecipeCard = ({ recipe }) => {
    const { toggleFavorite, isFavorite, language } = useApp();
    const [isExpanded, setIsExpanded] = useState(true);
    const [servings, setServings] = useState(1);
    const [showCookingMode, setShowCookingMode] = useState(false);

    const isFav = isFavorite(recipe);

    // Helper to format ingredient quantity
    const formatQuantity = (qty) => {
        if (!qty) return '';
        const scaled = qty * servings;
        return Number.isInteger(scaled) ? scaled : scaled.toFixed(1);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-beige-200 hover:shadow-2xl transition-shadow duration-300"
            >
                <div className="p-6 bg-beige-100/50">
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                            <h3 className="text-2xl font-bold text-wood-300 mb-2">{recipe.name}</h3>
                            {recipe.story && (
                                <p className="text-gray-600 italic text-sm mb-2">{recipe.story}</p>
                            )}
                        </div>
                        <button
                            onClick={() => toggleFavorite(recipe)}
                            className={`p-2 rounded-full transition-colors ${isFav ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-400'}`}
                        >
                            <Heart fill={isFav ? "currentColor" : "none"} size={24} />
                        </button>
                    </div>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full flex justify-center mt-2 text-wood-200 hover:text-wood-300"
                    >
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                </div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-beige-200"
                        >
                            <div className="p-6 space-y-8">
                                {/* Controls */}
                                <div className="flex flex-wrap gap-4 justify-between items-center bg-beige-50 p-4 rounded-xl">
                                    {/* Portion Calculator */}
                                    <div className="flex items-center gap-3">
                                        <Users size={20} className="text-wood-200" />
                                        <span className="text-sm font-medium text-gray-600">
                                            {language === 'th' ? 'สำหรับ' : 'Serves'}:
                                        </span>
                                        <div className="flex items-center gap-2 bg-white rounded-lg border border-beige-200 p-1">
                                            <button
                                                onClick={() => setServings(Math.max(1, servings - 1))}
                                                className="w-8 h-8 flex items-center justify-center rounded hover:bg-beige-100 text-wood-300 font-bold"
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center font-bold text-wood-300">{servings}</span>
                                            <button
                                                onClick={() => setServings(servings + 1)}
                                                className="w-8 h-8 flex items-center justify-center rounded hover:bg-beige-100 text-wood-300 font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Cooking Mode Button */}
                                    <button
                                        onClick={() => setShowCookingMode(true)}
                                        className="flex items-center gap-2 bg-wood-300 text-beige-100 px-4 py-2 rounded-lg hover:bg-wood-200 transition-colors shadow-sm"
                                    >
                                        <Play size={18} />
                                        {language === 'th' ? 'เริ่มทำอาหาร' : 'Start Cooking'}
                                    </button>
                                </div>

                                {/* Ingredients */}
                                <div>
                                    <h4 className="text-lg font-bold text-wood-200 mb-4 flex items-center gap-2">
                                        <ChefHat size={20} />
                                        {language === 'th' ? 'วัตถุดิบ' : 'Ingredients'}
                                    </h4>
                                    <ul className="space-y-3">
                                        {recipe.ingredients.map((ing, index) => (
                                            <li key={index} className="flex items-start gap-3 text-gray-700 bg-white p-3 rounded-lg border border-beige-100 shadow-sm">
                                                <span className="w-2 h-2 mt-2 rounded-full bg-wood-200 flex-shrink-0" />
                                                <span className="flex-1">
                                                    {typeof ing === 'string' ? ing : (
                                                        <>
                                                            <span className="font-bold text-wood-300">
                                                                {formatQuantity(ing.quantity)} {ing.unit}
                                                            </span>{' '}
                                                            {ing.name}
                                                        </>
                                                    )}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Instructions */}
                                <div>
                                    <h4 className="text-lg font-bold text-wood-200 mb-4">
                                        {language === 'th' ? 'วิธีทำ' : 'Instructions'}
                                    </h4>
                                    <div className="space-y-6">
                                        {recipe.instructions.map((step, index) => (
                                            <div key={index} className="flex gap-4 group">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-beige-200 text-wood-300 flex items-center justify-center font-bold group-hover:bg-wood-300 group-hover:text-beige-100 transition-colors">
                                                    {index + 1}
                                                </div>
                                                <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {showCookingMode && (
                <CookingView recipe={recipe} onClose={() => setShowCookingMode(false)} />
            )}
        </>
    );
};

export default RecipeCard;
