import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// Page Components
import Intro from './pages/Intro'
import Catalog from './pages/Catalog'
import Taste from './pages/Taste'
import Time from './pages/Time'
import Level from './pages/level'
import ResponsAi from './pages/responsAi'

function App() {
    const navigate = useNavigate();
    
    // Application State
    const [recipeData, setRecipeData] = useState({
        ingredients: [],
        taste_preferences: [],
        preparation_time: [],
        cooking_level: []
    });

    // Navigation Handlers
    const handleStart = () => {
        navigate('/catalog');
    };

    const handleIngredientsSubmit = (data) => {
        setRecipeData(prev => ({ ...prev, ...data }));
        navigate('/taste');
    };

    const handleTasteSubmit = (data) => {
        setRecipeData(prev => ({ ...prev, ...data }));
        navigate('/time');
    };

    const handleTimeSubmit = (data) => {
        setRecipeData(prev => ({ ...prev, ...data }));
        navigate('/level');
    };

    const handleLevelSubmit = async (data) => {
        const finalData = { ...recipeData, ...data };
        setRecipeData(finalData);
        
        try {
            const response = await fetch('http://localhost:5000/generate-recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ingredients: finalData.ingredients,
                    complexity: finalData.cooking_level[0],
                    time: finalData.preparation_time[0],
                    taste: finalData.taste_preferences
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Full response from server:', result);
            
            // Make sure we have the recipes array in the correct format
            let recipes = [];
            if (result.recipes) {
                if (Array.isArray(result.recipes)) {
                    recipes = result.recipes;
                } else if (result.recipes.recipes && Array.isArray(result.recipes.recipes)) {
                    recipes = result.recipes.recipes;
                } else if (typeof result.recipes === 'object') {
                    // If we got a single recipe object, wrap it in an array
                    recipes = [result.recipes];
                }
            }
            
            // Update the state with the processed recipes
            setRecipeData(prevData => ({
                ...prevData,
                recipes: recipes
            }));
            
            console.log('Processed recipes:', recipes);
        } catch (error) {
            console.error('Error:', error);
            // You might want to handle the error appropriately here
            // For example, showing an error message to the user
        }
        
        navigate('/result');
    };

    return (
        <Routes>
            <Route path="/" element={<Intro onStart={handleStart} />} />
            <Route path="/catalog" element={<Catalog onIngredientsSubmit={handleIngredientsSubmit} />} />
            <Route path="/taste" element={<Taste onTasteSubmit={handleTasteSubmit} />} />
            <Route path="/time" element={<Time onTimeSubmit={handleTimeSubmit} />} />
            <Route path="/level" element={<Level onLevelSubmit={handleLevelSubmit} />} />
            <Route path="/result" element={<ResponsAi recipeData={recipeData} />} />
        </Routes>
    )
}

export default App
