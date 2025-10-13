// components/AppShell/AppShell.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import s from "./AppShell.module.css";

export default function AppShell() {
  return (
    <div className={s.app}>
      {/* make header a direct child of .app */}
      <header className={s.pagebar}>
        <h1 className={s.logo}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            MediBase
          </Link>
        </h1>
        <input className={s.search} placeholder="Search records…" />
      </header>

      <aside className={s.sidebar}>
        <div className={s.sideTitle}>Quick Links</div>
        <nav className={s.nav}>
          <Link to="/allergies">Allergies</Link>
          <Link to="/bloodwork">Bloodwork</Link>
          <Link to="/medications">Medications</Link>
          <Link to="/other">Other</Link>
        </nav>
      </aside>

      <main className={s.main}>
        <Outlet />
      </main>
    </div>
  );
}