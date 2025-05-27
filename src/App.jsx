import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Intro from './Intro'
import Catalog from './Catalog'
import Taset from './taset'
import Time from './time'
import Level from './level'

function App() {
    const navigate = useNavigate();
    const [recipeData, setRecipeData] = useState({
        ingredients: [],
        taste_preferences: [],
        preparation_time: [],
        cooking_level: []
    });

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
        // Here you can navigate to the results page or send data to AI
    };

    return (
        <Routes>
            <Route path="/" element={<Intro onStart={handleStart} />} />
            <Route path="/catalog" element={<Catalog onIngredientsSubmit={handleIngredientsSubmit} />} />
            <Route path="/taste" element={<Taset onTasteSubmit={handleTasteSubmit} />} />
            <Route path="/time" element={<Time onTimeSubmit={handleTimeSubmit} />} />
            <Route path="/level" element={<Level onLevelSubmit={handleLevelSubmit} />} />
        </Routes>
    )
}

export default App
