import React from 'react';
import Popup from './components/Popup.tsx';
import Home from './components/Home.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popup" element={<Popup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
