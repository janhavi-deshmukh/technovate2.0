// App.js
import React from 'react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import TwoSections from './components/TwoSections';
import './App.css';

const App = () => {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <TwoSections />
      {/* Other sections of the app */}
    </div>
  );
};

export default App;
