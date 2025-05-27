import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../style.css';

const buttonVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
};

const timeEmojis = {
    'Under 30 minutes': '⚡',
    '30-60 minutes': '⏰',
    '1-2 hours': '🕐',
    'Over 2 hours': '👨‍🍳'
};

function Time({ onTimeSubmit }) {
    const [selectedTime, setSelectedTime] = useState('');
    const timeOptions = Object.keys(timeEmojis);

    const handleContinue = () => {
        const timeData = {
            "preparation_time": [selectedTime]
        };
        onTimeSubmit(timeData);
    };

    return (
        <div className="page-container">
            <motion.h1
                className="page-title"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                How Much Time Do You Have? ⏱️
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
                {timeOptions.map((time) => (
                    <motion.button
                        key={time}
                        className={`btn ${selectedTime === time ? 'btn-primary' : ''}`}
                        onClick={() => setSelectedTime(time)}
                        variants={buttonVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="emoji">{timeEmojis[time]}</span>
                        {time}
                    </motion.button>
                ))}
            </motion.div>
            <motion.button
                className="continue-button"
                onClick={handleContinue}
                disabled={!selectedTime}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: selectedTime ? 1.05 : 1 }}
                whileTap={{ scale: selectedTime ? 0.95 : 1 }}
            >
                <span>Continue</span>
                <span className="emoji">⏱️</span>
            </motion.button>
        </div>
    );
}

export default Time; 