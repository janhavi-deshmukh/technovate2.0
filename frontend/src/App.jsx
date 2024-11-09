// App.js
import React from 'react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import './App.css';

const App = () => {
  return (
    <div>
      <NavBar />
      <HeroSection />
      {/* Other sections of the app */}
    </div>
  );
};

export default App;
