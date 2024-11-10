// App.js
import React from 'react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
<<<<<<< HEAD
import TwoSections from './components/TwoSections';
=======
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SingleProductPage from './components/SingleProductPage';
>>>>>>> 65be7ea6eb4fe21c5864b6dc0ceaea2304f4231a
import './App.css';

const App = () => {
  return (
    <Router>
    <div>
      <NavBar />
<<<<<<< HEAD
      <HeroSection />
      <TwoSections />
      {/* Other sections of the app */}
=======
      <Routes>
        <Route path="/productdetail" element={<SingleProductPage />} />
        <Route path="/" element={<HeroSection />} />
      </Routes>
>>>>>>> 65be7ea6eb4fe21c5864b6dc0ceaea2304f4231a
    </div>
  </Router>

    
  );
};

export default App;
