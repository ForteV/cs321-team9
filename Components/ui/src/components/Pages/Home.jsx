import React from "react";
import s from "../AppShell/AppShell.module.css";
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
          <button className="button primary">✚ Get started</button>
        </div>
      </section>

      <section className={s.cards}>
        <Card title="Check what's next" items={["Check Calendar","Immunizations","Scheduled Procedures"]}/>
        <Card title="Insurance Records" items={["Providers","Records"]}/>
        <Card title="Your Info" items={["Profile","Edit Info","Convert to PDF"]}/>
      </section>

      <section className={s.block}>
        <h3>Recent Records</h3>
      </section>
    </>
  );
}