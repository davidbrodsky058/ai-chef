import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../style.css';

const buttonVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
};

const levelEmojis = {
    'Beginner': '🌱',
    'Intermediate': '🔨',
    'Advanced': '⭐',
    'Professional': '👨‍🍳'
};

function Level({ onLevelSubmit }) {
    const [selectedLevel, setSelectedLevel] = useState('');
    const levelOptions = Object.keys(levelEmojis);

    const handleContinue = () => {
        const levelData = {
            "cooking_level": [selectedLevel]
        };
        onLevelSubmit(levelData);
    };

    return (
        <div className="page-container">
            <motion.h1
                className="page-title"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                What's Your Cooking Level? 👨‍🍳
            </motion.h1>
            <motion.div
                className="grid grid-1"
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
                {levelOptions.map((level) => (
                    <motion.button
                        key={level}
                        className={`btn ${selectedLevel === level ? 'btn-primary' : ''}`}
                        onClick={() => setSelectedLevel(level)}
                        variants={buttonVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="emoji">{levelEmojis[level]}</span>
                        {level}
                    </motion.button>
                ))}
            </motion.div>
            <motion.button
                className="continue-button"
                onClick={handleContinue}
                disabled={!selectedLevel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: selectedLevel ? 1.05 : 1 }}
                whileTap={{ scale: selectedLevel ? 0.95 : 1 }}
            >
                <span>Continue</span>
                <span className="emoji">👨‍🍳</span>
            </motion.button>
        </div>
    );
}

export default Level;