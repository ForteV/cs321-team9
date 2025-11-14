import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import s from "./AppShell.module.css";
import SearchResults from "../Search/SearchResults.jsx";

export default function AppShell() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [fname, setFname] = useState(""); // FIRST NAME from DB

  /* ------------------ FETCH USER FIRST NAME ------------------ */
  useEffect(() => {
    const uid = localStorage.getItem("userid");
    if (!uid) return;

    fetch(`http://localhost:8080/api/user/info?userid=${uid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.fname) {
          setFname(data.fname);
        }
      })
      .catch((err) => console.error("Name load error:", err));
  }, []);

  /* ------------------ SEARCH HANDLER ------------------ */
  async function doSearch(q) {
    setQuery(q);

    if (!q.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/search?q=${encodeURIComponent(q)}&userid=${localStorage.getItem(
          "userid"
        )}`
      );

      const json = await res.json();
      setResults(Array.isArray(json) ? json : []);
      setShowResults(true);
    } catch (err) {
      console.error(err);
      setResults([]);
    }
  }

  return (
    <div className={s.app}>
      {/* Header */}
      <header className={s.pagebar}>
        <title>MediBase</title>

        <h1 className={s.logo}>
          <Link to="/app" style={{ textDecoration: "none", color: "inherit" }}>
            Medi<font color="#0000">Base</font>
          </Link>
        </h1>

        {/* SEARCH BAR */}
        <input
          className={s.search}
          placeholder="Search records…"
          value={query}
          onChange={(e) => doSearch(e.target.value)}
        />

        {/* WELCOME MESSAGE USING FIRST NAME */}
        <div className={s.welcomeMessage}>
          {fname ? `Welcome, ${fname}!` : "Welcome!"}
        </div>

        {/* LOG OUT BUTTON */}
        <button
          className={s.logOut}
          onClick={() => {
            localStorage.removeItem("userid");
            window.location.href = "/login";
          }}
        >
          Log Out
        </button>

        <div className={s.topLine}></div>
      </header>

      {/* SEARCH RESULTS DROPDOWN */}
      {showResults && (
        <SearchResults
          results={results}
          onClose={() => setShowResults(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={s.sidebar}>
        <div className={s.sideTitle}>Quick Links</div>
        <nav className={s.nav}>
          <Link to="/app/records/allergies">Allergies</Link>
          <Link to="/app/records/bloodwork">Bloodwork</Link>
          <Link to="/app/records/vaccines">Immunizations</Link>
          <Link to="/app/records/insurance">Insurance Records</Link>
          <Link to="/app/records/insuranceproviders">Insurance Providers</Link>
          <Link to="/app/records/procedures">Scheduled Procedures</Link>
          <Link to="/app/records/medications">Medications</Link>
          <Link to="/app/records/calendar">Calendar</Link>
          <Link to="/app/records/injuries">Injuries</Link>
          <Link to="/app/records/family_history">Family History</Link>
          <Link to="/app/entrylog">Entry Log</Link>
        </nav>
      </aside>

      {/* MAIN PAGE CONTENT */}
      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  );
}
