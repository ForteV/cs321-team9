import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/AppShell/AppShell.jsx';

import Home from './components/Pages/Home.jsx';
import Allergies from './components/Pages/Allergies.jsx';
import AddRecords from './components/Pages/AddRecords.jsx';
import Login from "./components/Pages/Login.jsx";
import RecordsPage from "./components/Pages/RecordsPage.jsx";
import EntryLog from "./components/Pages/EntryLog.jsx";
import SearchResults from "./components/Search/SearchResults.jsx";
import FullReport from "./components/Pages/FullReport.jsx";




const NotFound = () => <div style={{ padding: 24 }}>Not found</div>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default → login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />


        <Route path="*" element={<NotFound />} />

        {/* App shell (header + sidebar + main content) */}
        <Route path="/app" element={<AppShell />}>

          {/* Default inside /app */}
          <Route index element={<Home />} />

          {/* Add record page */}
          <Route path="addRecords" element={<AddRecords />} />

          {/* --- UNIVERSAL RECORDS PAGE --- */}
          {/* Example: /app/records/allergies */}
          <Route path="records/:category" element={<RecordsPage />} />

          <Route path="fullreport" element={<FullReport />} />

          {/* For now keep the old Allergies page */}
          <Route path="allergies" element={<Allergies />} />

          <Route path="entrylog" element={<EntryLog />} />

          <Route path="search" element={<SearchResults />} />

          <Route path="fullreport" element={<FullReport />} />


          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
