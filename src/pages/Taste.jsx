import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../style.css';

const buttonVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
};

const tasteEmojis = {
    'Sweet': '🍯',
    'Salty': '🧂',
    'Spicy': '🌶️',
    'Sour': '🍋',
    'Umami': '🍄',
    'Bitter': '☕'
};

function Taste({ onTasteSubmit }) {
    const [selectedTastes, setSelectedTastes] = useState([]);
    const tasteOptions = Object.keys(tasteEmojis);

    const toggleTaste = (taste) => {
        if (selectedTastes.includes(taste)) {
            setSelectedTastes(selectedTastes.filter(t => t !== taste));
        } else {
            setSelectedTastes([...selectedTastes, taste]);
        }
    };

    const handleContinue = () => {
        const tasteData = {
            "taste_preferences": selectedTastes
        };
        onTasteSubmit(tasteData);
    };

    return (
        <div className="page-container">
            <motion.h1
                className="page-title"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                What Flavors Do You Prefer? 🍽️
            </motion.h1>
            <motion.div
                className="grid grid-2"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.15
                        }
                    }
                }}
            >
                {tasteOptions.map((taste) => (
                    <motion.button
                        key={taste}
                        className={`btn ${selectedTastes.includes(taste) ? 'btn-primary' : ''}`}
                        onClick={() => toggleTaste(taste)}
                        variants={buttonVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="emoji">{tasteEmojis[taste]}</span>
                        {taste}
                    </motion.button>
                ))}
            </motion.div>
            <motion.button
                className="continue-button"
                onClick={handleContinue}
                disabled={selectedTastes.length === 0}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: selectedTastes.length > 0 ? 1.05 : 1 }}
                whileTap={{ scale: selectedTastes.length > 0 ? 0.95 : 1 }}
            >
                <span>Continue</span>
                <span className="emoji">🍽️</span>
            </motion.button>
        </div>
    );
}

export default Taste; 