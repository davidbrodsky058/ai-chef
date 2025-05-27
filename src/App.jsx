import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Intro from './Intro'
import Catalog from './Catalog'


function App() {
    return (
        <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/catalog" element={<Catalog />} />
        </Routes>
    )

}

export default App
