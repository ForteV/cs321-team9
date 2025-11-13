import React from "react";
import s from "../AppShell/AppShell.module.css";
import { Outlet, Link } from "react-router-dom";
import Card from "../Card/Card.jsx";

export default function Home() {
  return (
    <>
      <section className={s.welcomeSection}>
        <div className={s.welcomeText}>
          <h2>Welcome, user!</h2>
          <p className={s.welcomeSub}>
            Nice to see you! Here are a few quick actions to get started.
          </p>
        </div>
        <div className={s.welcomeActions}>
          
          <Link to="/app/addRecords" className="button">✚ Add Record</Link>

        </div>
      </section>

      <section className={s.cards}>
        <Card stack className={s.taller} title="Check what's next" items={["Immunizations","Scheduled Procedures"]}/>
        <Card stack className={s.taller} title="Insurance Records" items={["Providers","Records"]}/>
        <Card stack className={s.taller} title="Your Info" items={["Profile","Edit Info"]}/>
      </section>
    </>
  );
}