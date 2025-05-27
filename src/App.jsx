import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Intro from './Intro'
import Catalog from './Catalog'
import Recipe from './Recipe'
import './App.css'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/recipe" element={<Recipe />} />
        </Routes>
    )

}

export default App
