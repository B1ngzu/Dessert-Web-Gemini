import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ChefHat, Heart, Globe } from 'lucide-react';

const Layout = ({ children }) => {
    const { language, setLanguage } = useApp();
    const location = useLocation();

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'th' ? 'en' : 'th');
    };

    return (
        <div className="min-h-screen font-sans text-gray-800" style={{ backgroundImage: "url('/bg-pattern.png')", backgroundRepeat: 'repeat', backgroundSize: '300px' }}>
            <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 text-wood-300 hover:text-wood-200 transition-colors">
                        <ChefHat size={32} />
                        <h1 className="text-2xl font-bold tracking-tight">
                            {language === 'th' ? 'สูตรของหวาน' : 'Dessert Recipes'}
                        </h1>
                    </Link>

                    <nav className="flex items-center gap-6">
                        <Link
                            to="/"
                            className={`font-medium transition-colors ${location.pathname === '/' ? 'text-wood-300' : 'text-gray-500 hover:text-wood-200'}`}
                        >
                            {language === 'th' ? 'หน้าแรก' : 'Home'}
                        </Link>
                        <Link
                            to="/favorites"
                            className={`font-medium transition-colors flex items-center gap-1 ${location.pathname === '/favorites' ? 'text-wood-300' : 'text-gray-500 hover:text-wood-200'}`}
                        >
                            <Heart size={18} />
                            {language === 'th' ? 'รายการโปรด' : 'Favorites'}
                        </Link>

                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-beige-200 text-wood-300 hover:bg-beige-300 transition-colors text-sm font-medium"
                        >
                            <Globe size={16} />
                            {language.toUpperCase()}
                        </button>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {children}
            </main>

            <footer className="bg-wood-300 text-beige-100 py-6 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm opacity-80">
                        © {new Date().getFullYear()} Dessert AI. Powered by Gemini.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
