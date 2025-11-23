import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [language, setLanguage] = useState('th'); // 'th' or 'en'
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('history');
        return saved ? JSON.parse(saved) : [];
    });
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });
    const [allergies, setAllergies] = useState([]);

    useEffect(() => {
        localStorage.setItem('history', JSON.stringify(history));
    }, [history]);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToHistory = (recipe) => {
        setHistory(prev => {
            const newHistory = [recipe, ...prev.filter(r => r.name !== recipe.name)].slice(0, 20);
            return newHistory;
        });
    };

    const toggleFavorite = (recipe) => {
        setFavorites(prev => {
            const exists = prev.find(r => r.name === recipe.name);
            if (exists) {
                return prev.filter(r => r.name !== recipe.name);
            }
            return [recipe, ...prev];
        });
    };

    const isFavorite = (recipe) => {
        return favorites.some(r => r.name === recipe.name);
    };

    const toggleAllergy = (allergy) => {
        setAllergies(prev =>
            prev.includes(allergy)
                ? prev.filter(a => a !== allergy)
                : [...prev, allergy]
        );
    };

    return (
        <AppContext.Provider value={{
            language,
            setLanguage,
            history,
            addToHistory,
            favorites,
            toggleFavorite,
            isFavorite,
            allergies,
            toggleAllergy
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
