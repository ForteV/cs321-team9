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
          
          <Link to="/addRecords" className="button">✚ Get started</Link>

        </div>
      </section>

      <section className={s.cards}>
        <Card className={s.taller} title="Check what's next" items={["Check Calendar","Immunizations","Scheduled Procedures"]}/>
        <Card className={s.taller} title="Insurance Records" items={["Providers","Records"]}/>
        <Card className={s.taller} title="Your Info" items={["Profile","Edit Info"]}/>
      </section>

      
    </>
  );
}