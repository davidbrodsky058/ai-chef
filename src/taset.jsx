import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './style.css';

const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const tasteEmojis = {
    'Spicy': '🌶️',
    'Sweet': '🍯',
    'Sour': '🍋',
    'Salty': '🧂',
    'Umami': '🍜',
    'Fresh': '🌿',
    'Rich': '🥘',
    'Crunchy': '🥜'
};

function Taset({ onTasteSubmit }) {
    const [selectedTastes, setSelectedTastes] = useState([]);

    const tastes = Object.keys(tasteEmojis);

    const toggleTaste = (taste) => {
        setSelectedTastes(prev => 
            prev.includes(taste)
                ? prev.filter(t => t !== taste)
                : [...prev, taste]
        );
    };

    const handleContinue = () => {
        const tasteData = {
            "taste_preferences": selectedTastes
        };
        onTasteSubmit(tasteData);
    };

    return (
        <div className="taste-container">
            <motion.h1
                className="page-title"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                What Flavors Do You Prefer? 🍽️
            </motion.h1>
            <motion.div
                className="grid grid-3"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
            >
                {tastes.map((taste) => (
                    <motion.button
                        key={taste}
                        className={`btn ${selectedTastes.includes(taste) ? 'btn-primary' : ''}`}
                        onClick={() => toggleTaste(taste)}
                        variants={buttonVariants}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <span>{tasteEmojis[taste]}</span>
                        {taste}
                    </motion.button>
                ))}
            </motion.div>
            <motion.button
                className="btn btn-accent"
                onClick={handleContinue}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Continue ✨
            </motion.button>
        </div>
    );
}

export default Taset;