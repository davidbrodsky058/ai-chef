import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../style.css';

const buttonVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
};

const ingredientCategories = {
    'Proteins': ['Chicken', 'Beef', 'Fish', 'Eggs', 'Tofu'],
    'Vegetables': ['Tomatoes', 'Onions', 'Carrots', 'Potatoes', 'Spinach'],
    'Grains': ['Rice', 'Pasta', 'Bread', 'Quinoa'],
    'Dairy': ['Cheese', 'Milk', 'Yogurt', 'Butter'],
    'Herbs & Spices': ['Garlic', 'Ginger', 'Basil', 'Cumin', 'Pepper']
};

const categoryEmojis = {
    'Proteins': '🥩',
    'Vegetables': '🥕',
    'Grains': '🌾',
    'Dairy': '🧀',
    'Herbs & Spices': '🌿'
};

function Catalog({ onIngredientsSubmit }) {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Proteins');

    const toggleIngredient = (ingredient) => {
        if (selectedIngredients.includes(ingredient)) {
            setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
        } else {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
    };

    const handleContinue = () => {
        const ingredientData = {
            "ingredients": selectedIngredients
        };
        onIngredientsSubmit(ingredientData);
    };

    return (
        <div className="page-container">
            <motion.h1
                className="page-title"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Select Your Ingredients 🥘
            </motion.h1>

            {/* Category Selection */}
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
                {Object.keys(ingredientCategories).map((category) => (
                    <motion.button
                        key={category}
                        className={`btn ${activeCategory === category ? 'btn-primary' : ''}`}
                        onClick={() => setActiveCategory(category)}
                        variants={buttonVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="emoji">{categoryEmojis[category]}</span>
                        {category}
                    </motion.button>
                ))}
            </motion.div>

            {/* Ingredient Selection */}
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
                {ingredientCategories[activeCategory].map((ingredient) => (
                    <motion.button
                        key={ingredient}
                        className={`btn ${selectedIngredients.includes(ingredient) ? 'btn-primary' : ''}`}
                        onClick={() => toggleIngredient(ingredient)}
                        variants={buttonVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {ingredient}
                    </motion.button>
                ))}
            </motion.div>

            <motion.button
                className="continue-button"
                onClick={handleContinue}
                disabled={selectedIngredients.length === 0}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: selectedIngredients.length > 0 ? 1.05 : 1 }}
                whileTap={{ scale: selectedIngredients.length > 0 ? 0.95 : 1 }}
            >
                <span>Continue with {selectedIngredients.length} ingredients</span>
                <span className="emoji">🥘</span>
            </motion.button>
        </div>
    );
}

export default Catalog; 