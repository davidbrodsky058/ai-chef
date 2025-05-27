import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const IntroContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: #34495e;
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const Features = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 2rem 0;
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StartButton = styled(motion.button)`
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.2s ease;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);

  &:hover {
    background: #2980b9;
    transform: translateY(-2px);
  }
`;

const Intro = () => {
  const navigate = useNavigate();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const handleStart = () => {
    navigate('/catalog');
  };

  return (
    <IntroContainer>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Title variants={itemVariants}>
          Welcome to AI Chef Assistant
        </Title>
        
        <Description variants={itemVariants}>
          Transform your available ingredients into delicious meals! Our AI-powered system helps you discover recipes based on what you already have in your kitchen.
        </Description>

        <Features>
          <FeatureCard variants={itemVariants} whileHover={{ scale: 1.05 }}>
            <h3>Smart Recipe Matching</h3>
            <p>Enter your ingredients and let our AI find the perfect recipes for you</p>
          </FeatureCard>

          <FeatureCard variants={itemVariants} whileHover={{ scale: 1.05 }}>
            <h3>Reduce Food Waste</h3>
            <p>Make the most of what you have and minimize food waste</p>
          </FeatureCard>

          <FeatureCard variants={itemVariants} whileHover={{ scale: 1.05 }}>
            <h3>Quick & Easy</h3>
            <p>Get instant recipe suggestions tailored to your available ingredients</p>
          </FeatureCard>
        </Features>

        <StartButton
          variants={itemVariants}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
        >
          Let's Start Cooking
        </StartButton>
      </motion.div>
    </IntroContainer>
  );
};

export default Intro;