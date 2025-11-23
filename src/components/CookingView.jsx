import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CookingView = ({ recipe, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [wakeLock, setWakeLock] = useState(null);

    useEffect(() => {
        // Request Wake Lock
        const requestWakeLock = async () => {
            try {
                if ('wakeLock' in navigator) {
                    const lock = await navigator.wakeLock.request('screen');
                    setWakeLock(lock);
                }
            } catch (err) {
                console.log('Wake Lock not supported or rejected');
            }
        };
        requestWakeLock();

        return () => {
            if (wakeLock) wakeLock.release();
        };
    }, []);

    const steps = recipe.instructions || [];

    const nextStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(c => c + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(c => c - 1);
    };

    return (
        <div className="fixed inset-0 bg-wood-300 z-50 flex flex-col text-beige-100">
            {/* Header */}
            <div className="p-4 flex justify-between items-center bg-wood-400/20 backdrop-blur-sm">
                <h2 className="text-xl font-bold truncate pr-4">{recipe.name}</h2>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X size={32} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 text-center overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="max-w-3xl"
                    >
                        <span className="text-beige-300 text-xl font-medium mb-4 block">
                            Step {currentStep + 1} of {steps.length}
                        </span>
                        <p className="text-3xl md:text-5xl font-bold leading-tight">
                            {steps[currentStep]}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="p-6 pb-12 flex justify-between items-center max-w-4xl mx-auto w-full gap-4">
                <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="p-6 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronLeft size={48} />
                </button>

                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden mx-4">
                    <div
                        className="h-full bg-beige-200 transition-all duration-300"
                        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    />
                </div>

                <button
                    onClick={nextStep}
                    disabled={currentStep === steps.length - 1}
                    className="p-6 rounded-full bg-beige-200 text-wood-300 hover:bg-beige-100 disabled:opacity-50 disabled:bg-white/10 disabled:text-white disabled:cursor-not-allowed transition-all"
                >
                    {currentStep === steps.length - 1 ? <Check size={48} /> : <ChevronRight size={48} />}
                </button>
            </div>
        </div>
    );
};

export default CookingView;
