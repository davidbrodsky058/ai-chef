import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './style.css';

const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

function Level({ onLevelSubmit }) {
    const [selectedLevel, setSelectedLevel] = useState('');

    const levels = [
        'מתחיל - מתכונים פשוטים',
        'בינוני - מתכונים מורכבים יותר',
        'מתקדם - מתכונים מאתגרים'
    ];

    const handleContinue = () => {
        const levelData = {
            "רמת בישול": [selectedLevel]
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
                באיזו רמת בישול אתה? 👨‍🍳
            </motion.h1>
            <motion.div
                className="grid grid-1"
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
                {levels.map((level) => (
                    <motion.button
                        key={level}
                        className={`btn ${selectedLevel === level ? 'btn-primary' : ''}`}
                        onClick={() => setSelectedLevel(level)}
                        variants={buttonVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {level}
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
                המשך ✨
            </motion.button>
        </div>
    );
}

export default Level;