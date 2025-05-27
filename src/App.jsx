import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Intro from './Intro'
import Catalog from './Catalog'


function App() {
    return (
        <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path='/taste' element={<Taste />} />
            <Route path='/time' element={<Time />} />
            <Route path="/level" element={<Level />} />
            <Route path="/responsAi" element={<ResponsAi />} />
        </Routes>
    )

}

export default App
