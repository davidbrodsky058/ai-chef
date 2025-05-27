import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CatalogContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Title = styled(motion.h1)`
  text-align: center;
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const CategoryCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CategoryTitle = styled.h2`
  color: #34495e;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;

const ItemCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  label {
    cursor: pointer;
    font-size: 1rem;
    color: #2c3e50;
  }
`;

const OtherInput = styled.div`
  margin-top: 1rem;
  
  input[type="text"] {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #cbd5e0;
    border-radius: 5px;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #3498db;
    }
  }
`;

const ContinueButton = styled(motion.button)`
  display: block;
  margin: 2rem auto;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);

  &:hover {
    background: #2980b9;
  }
`;

const categories = {
  vegetables: {
    icon: "🥬",
    items: ["Cucumber", "Tomato", "Carrot", "Onion", "Potato", "Bell Pepper", "Lettuce", "Garlic"]
  },
  meat: {
    icon: "🍗",
    items: ["Chicken Breast", "Chicken Thighs", "Ground Beef", "Steak", "Turkey", "Lamb"]
  },
  dairy: {
    icon: "🥛",
    items: ["Milk", "Cheese", "Yogurt", "Butter", "Cream", "Eggs"]
  },
  pantry: {
    icon: "🥫",
    items: ["Rice", "Pasta", "Canned Tomatoes", "Beans", "Tuna", "Corn"]
  },
  spices: {
    icon: "🌶️",
    items: ["Salt", "Pepper", "Paprika", "Cumin", "Oregano", "Basil"]
  }
};

const Catalog = ({ onIngredientsSubmit }) => {
  const [selectedItems, setSelectedItems] = useState({});
  const [otherItems, setOtherItems] = useState({});

  const handleItemChange = (category, item) => {
    setSelectedItems(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: !prev[category]?.[item]
      }
    }));
  };

  const handleOtherItemsChange = (category, value) => {
    setOtherItems(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleContinue = () => {
    // Create array of selected ingredients
    const selectedIngredients = [];

    // Add checked items
    Object.entries(selectedItems).forEach(([category, items]) => {
      Object.entries(items).forEach(([item, isSelected]) => {
        if (isSelected) {
          selectedIngredients.push(item);
        }
      });
    });

    // Add other items from input fields
    Object.values(otherItems).forEach(item => {
      if (item && item.trim() !== '') {
        selectedIngredients.push(item.trim());
      }
    });

    // Create the formatted object with title
    const formattedData = {
      "מצרכים": selectedIngredients
    };

    // Pass the formatted data to App component
    onIngredientsSubmit(formattedData);
  };

  return (
    <CatalogContainer>
      <Title
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        What do you have in your fridge? 🍽️
      </Title>

      <CategoriesGrid>
        {Object.entries(categories).map(([category, { icon, items }]) => (
          <CategoryCard
            key={category}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <CategoryTitle>
              {icon} {category.charAt(0).toUpperCase() + category.slice(1)}
            </CategoryTitle>
            
            <ItemsGrid>
              {items.map(item => (
                <ItemCheckbox key={item}>
                  <input
                    type="checkbox"
                    id={`${category}-${item}`}
                    checked={selectedItems[category]?.[item] || false}
                    onChange={() => handleItemChange(category, item)}
                  />
                  <label htmlFor={`${category}-${item}`}>{item}</label>
                </ItemCheckbox>
              ))}
            </ItemsGrid>

            <OtherInput>
              <input
                type="text"
                placeholder={`Other ${category}...`}
                value={otherItems[category] || ''}
                onChange={(e) => handleOtherItemsChange(category, e.target.value)}
              />
            </OtherInput>
          </CategoryCard>
        ))}
      </CategoriesGrid>

      <ContinueButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleContinue}
      >
        Continue to Recipe Generation
      </ContinueButton>
    </CatalogContainer>
  );
};

export default Catalog; 