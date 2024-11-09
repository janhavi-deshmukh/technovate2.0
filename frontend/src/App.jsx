// App.js
import React from 'react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SingleProductPage from './components/SingleProductPage';
import './App.css';

const App = () => {
  return (
    <Router>
    <div>
      <NavBar />
      <Routes>
        <Route path="/productdetail" element={<SingleProductPage />} />
        <Route path="/" element={<HeroSection />} />
      </Routes>
    </div>
  </Router>

    
  );
};

export default App;
