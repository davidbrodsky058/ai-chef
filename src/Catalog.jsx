import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './style.css';

const categories = {
  vegetables: {
    name: "Vegetables",
    items: [
      "Cucumber", "Tomato", "Carrot", "Onion", "Potato", "Bell Pepper", "Lettuce", "Garlic",
      "Zucchini", "Eggplant", "Mushrooms", "Spinach", "Broccoli", "Cauliflower", "Sweet Potato",
      "Asparagus", "Green Beans", "Corn", "Peas", "Celery"
    ]
  },
  proteins: {
    name: "Proteins",
    items: [
      "Chicken Breast", "Chicken Thighs", "Ground Beef", "Steak", "Turkey", "Lamb",
      "Salmon", "Tuna", "Shrimp", "Tofu", "Eggs", "Tempeh", "Pork Chops", "Duck",
      "Cod", "Sardines", "Lentils", "Chickpeas", "Black Beans", "Quinoa"
    ]
  },
  dairy: {
    name: "Dairy & Alternatives",
    items: [
      "Milk", "Cheese", "Yogurt", "Butter", "Cream", "Heavy Cream", "Sour Cream",
      "Mozzarella", "Parmesan", "Cheddar", "Cottage Cheese", "Almond Milk",
      "Soy Milk", "Oat Milk", "Coconut Milk", "Cream Cheese", "Feta", "Ricotta"
    ]
  },
  pantry: {
    name: "Pantry",
    items: [
      "Rice", "Pasta", "Canned Tomatoes", "Beans", "Flour", "Sugar", "Olive Oil",
      "Soy Sauce", "Vinegar", "Honey", "Maple Syrup", "Bread", "Nuts", "Seeds",
      "Dried Herbs", "Stock Cubes", "Coconut Oil", "Tomato Paste", "Mustard", "Mayo"
    ]
  },
  spices: {
    name: "Spices & Herbs",
    items: [
      "Salt", "Black Pepper", "Paprika", "Cumin", "Oregano", "Basil", "Thyme",
      "Rosemary", "Cinnamon", "Nutmeg", "Curry Powder", "Chili Powder", "Garlic Powder",
      "Onion Powder", "Ginger", "Turmeric", "Cardamom", "Bay Leaves", "Sage", "Coriander"
    ]
  }
};

const Catalog = ({ onIngredientsSubmit }) => {
  const [selectedItems, setSelectedItems] = useState({});
  const [openCategory, setOpenCategory] = useState(null);
  const [customItems, setCustomItems] = useState({});

  const handleItemChange = (category, item) => {
    setSelectedItems(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: !prev[category]?.[item]
      }
    }));
  };

  const handleCustomItemChange = (category, value) => {
    setCustomItems(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const getSelectedCount = () => {
    let count = 0;
    // Count checked items
    Object.values(selectedItems).forEach(category => {
      Object.values(category).forEach(isSelected => {
        if (isSelected) count++;
      });
    });
    // Count custom items
    Object.values(customItems).forEach(item => {
      if (item && item.trim()) count++;
    });
    return count;
  };

  const handleContinue = () => {
    const selectedIngredients = [];

    // Add checked items
    Object.entries(selectedItems).forEach(([category, items]) => {
      Object.entries(items).forEach(([item, isSelected]) => {
        if (isSelected) {
          selectedIngredients.push(item);
        }
      });
    });

    // Add custom items
    Object.values(customItems).forEach(item => {
      if (item && item.trim()) {
        selectedIngredients.push(item.trim());
      }
    });

    onIngredientsSubmit({
      "ingredients": selectedIngredients
    });
  };

  return (
    <div className="catalog-container">
      <motion.h1
        className="page-title"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Select Your Available Ingredients
      </motion.h1>

      <div className="accordion">
        {Object.entries(categories).map(([key, { name, items }]) => (
          <div key={key}>
            <motion.div
              className="accordion-header"
              onClick={() => setOpenCategory(openCategory === key ? null : key)}
              whileHover={{ scale: 1.01 }}
            >
              <h2>{name}</h2>
              <span>{openCategory === key ? '−' : '+'}</span>
            </motion.div>
            
            <AnimatePresence>
              {openCategory === key && (
                <motion.div
                  className="accordion-content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {items.map(item => (
                    <div key={item} className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        id={`${key}-${item}`}
                        checked={selectedItems[key]?.[item] || false}
                        onChange={() => handleItemChange(key, item)}
                      />
                      <label htmlFor={`${key}-${item}`}>{item}</label>
                    </div>
                  ))}
                  <div className="checkbox-wrapper" style={{ gridColumn: '1/-1' }}>
                    <input
                      type="text"
                      placeholder={`Add other ${name.toLowerCase()}...`}
                      value={customItems[key] || ''}
                      onChange={(e) => handleCustomItemChange(key, e.target.value)}
                      className="input"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <motion.button
        className="btn btn-accent"
        onClick={handleContinue}
        disabled={getSelectedCount() === 0}
        whileHover={{ scale: getSelectedCount() > 0 ? 1.05 : 1 }}
        whileTap={{ scale: getSelectedCount() > 0 ? 0.95 : 1 }}
        style={{ marginTop: '2rem' }}
      >
        Continue with {getSelectedCount()} ingredients
      </motion.button>
    </div>
  );
};

export default Catalog; 