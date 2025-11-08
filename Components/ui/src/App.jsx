//Website logic, as in what should be shown

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/AppShell/AppShell.jsx';
import Home from './components/Pages/Home.jsx';
import Allergies from './components/Pages/Allergies.jsx';
import AddRecords from './components/Pages/AddRecords.jsx';
import Login from "./components/Pages/Login.jsx";

//TO BE IMPLEMENTED
//import Bloodwork from './pages/Bloodwork.jsx';
//import Medications from './pages/Medications.jsx';

const NotFound = () => <div style={{ padding: 24 }}>Not found</div>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        
        {/* AppShell = persistent layout */}
        <Route path="/app" element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="allergies" element={<Allergies />} />
          <Route path="addRecords" element={<AddRecords />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


