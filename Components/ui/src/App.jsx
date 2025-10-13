//Website logic, as in what should be shown

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell/AppShell.jsx';
import Home from './components/Pages/Home.jsx';

//TO BE IMPLEMENTED
//import Allergies from './pages/Allergies.jsx';
//import Bloodwork from './pages/Bloodwork.jsx';
//import Medications from './pages/Medications.jsx';
//import Other from './pages/Other.jsx';

const NotFound = () => <div style={{ padding: 24 }}>Not found</div>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AppShell = persistent layout */}
        <Route path="/" element={<AppShell />}>
          <Route index element={<Home />} />
          {/*<Route path="allergies" element={<Allergies />} />
          <Route path="bloodwork" element={<Bloodwork />} />
          <Route path="medications" element={<Medications />} />
          <Route path="other" element={<Other />} />
          <Route path="*" element={<NotFound />} />*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


