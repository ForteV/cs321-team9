import React from "react";
import s from "../AppShell/AppShell.module.css";
import Card from "../Card/Card.jsx";
import "./Pages.css";

export default function Allergies() {
    return (
        <div className={s.allergiesPage}>
            <section className={s.title}>
                <title>Allergies</title>
                <h1>Allergies</h1>
            </section>

            <section className={s.recentEditsTitle}>
                <h2>Most Recent Edits</h2>
            </section>
            <section className={s.cards}>
                <Card items={["Immunization 1", "Date"]}/>
                <Card items={["Immunization 2", "Date"]}/>
                <Card items={["Immunization 3", "Date"]}/>
            </section>
        </div>
    );
}