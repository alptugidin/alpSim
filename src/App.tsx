import React from 'react';
import Home from './components/Home.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import StandingsBox from './components/Settings/Standings/StandingsBox.tsx';
import {useAppSelector} from './hooks.ts';
import StandingsWrapper from './components/Box/Standings/StandingsWrapper.tsx';
import Debug from './components/Debug.tsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/StandingsWrapper" element={<StandingsWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
