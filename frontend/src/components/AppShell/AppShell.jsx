// components/AppShell/AppShell.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import s from "./AppShell.module.css";

export default function AppShell() {
  return (
    <div className={s.app}>
      {/* make header a direct child of .app */}
      <header className={s.pagebar}>
        <title>MediBase</title>
        <h1 className={s.logo}>
          <Link to="/App" style={{ textDecoration: "none", color: "inherit" }}>
            Medi<font color="#0000">Base</font>
          </Link>
          
        </h1>
        <input className={s.search} placeholder="Search records…" />
        <button className = {s.logOut}>
          <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
            Log Out
          </Link>
        </button>
        <div className={s.topLine}></div>
      </header>

      <aside className={s.sidebar}>
        {/*Sidebar Title*/}
        <div className={s.sideTitle}>Quick Links</div>
        <nav className={s.nav}>
          <Link to="/app/allergies">Allergies</Link>
          <Link to="/app/bloodwork">Bloodwork</Link>
          <Link to="/app/immunizations">Immunizations</Link>
          <Link to="/app/insurancerecords">Insurance Records</Link>
          <Link to="/app/insuranceproviders">Insurance Providers</Link>
          <Link to="/app/procedures">Scheduled Procedures</Link>
          <Link to="/app/medications">Medications</Link>
          <Link to="/app/profile">Profile</Link>  
        </nav>
      </aside>

      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  );
}