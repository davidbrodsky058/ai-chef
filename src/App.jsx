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

    const handleLevelSubmit = (data) => {
        const finalData = { ...recipeData, ...data };
        setRecipeData(finalData);
        console.log("Final Recipe Data:", finalData);
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
