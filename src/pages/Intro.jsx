import React from 'react';
import { motion } from 'framer-motion';
import '../style.css';

const features = [
  {
    title: "Smart Recipe Generation",
    description: "Get personalized recipe suggestions based on your available ingredients"
  },
  {
    title: "Taste Preferences",
    description: "Customize recipes according to your taste preferences"
  },
  {
    title: "Time Management",
    description: "Find recipes that fit your available cooking time"
  },
  {
    title: "Skill Level Matching",
    description: "Get recipes that match your cooking expertise"
  }
];

const Intro = ({ onStart }) => {
  const handleStart = () => {
    if (typeof onStart === 'function') {
      onStart();
    }
  };

  return (
    <motion.div 
      className="intro-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="intro-title"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        AI Chef Assistant
      </motion.h1>

      <motion.p
        className="intro-description"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Your personal cooking companion that helps you create delicious meals 
        with the ingredients you have at hand.
      </motion.p>

      <motion.div
        className="features-grid"
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
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        className="btn-start"
        onClick={handleStart}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Start Cooking
      </motion.button>
    </motion.div>
  );
};

export default Intro;