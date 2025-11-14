import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CATEGORY_LIST = [
    "allergies",
    "bloodwork",
    "vaccines",
    "insurance",
    "insurance_providers",
    "procedures",
    "medications",
    "medical_history",
    "family_history",
    "calendar",
];

// Pretty display names
const TITLES = {
    allergies: "Allergies",
    bloodwork: "Bloodwork",
    vaccines: "Immunizations",
    insurance: "Insurance Records",
    insurance_providers: "Insurance Providers",
    procedures: "Procedures",
    medications: "Medications",
    medical_history: "Medical History",
    family_history: "Family History",
    calendar: "Calendar Events",
};

// Color labels for each tag
const CATEGORY_COLORS = {
    allergies: "#d9534f",             // red
    bloodwork: "#5bc0de",             // blue
    vaccines: "#0275d8",              // dark blue
    insurance: "#5cb85c",             // green
    insurance_providers: "#5cb85c",   // green
    procedures: "#f0ad4e",            // orange
    medications: "#9370DB",           // purple
    medical_history: "#8B4513",       // brown
    family_history: "#A0522D",        // sienna
    calendar: "#20c997",              // teal
};

export default function EntryLog() {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    const userid = Number(localStorage.getItem("userid"));

    useEffect(() => {
        async function loadAll() {
            setLoading(true);
            const merged = [];

            for (const category of CATEGORY_LIST) {
                try {
                    const res = await fetch(
                        `http://localhost:8080/api/records?category=${category}&userid=${userid}`
                    );

                    const json = await res.json();

                    if (Array.isArray(json)) {
                        json.forEach((row) => {
                            merged.push({
                                ...row,
                                category,
                            });
                        });
                    }

                } catch (err) {
                    console.error("Failed loading:", category, err);
                }
            }

            // Sort by date descending
            merged.sort((a, b) => new Date(b.date) - new Date(a.date));

            setEntries(merged);
            setLoading(false);
        }

        loadAll();
    }, []);


    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{ marginBottom: "12px" }}>Entry Log</h2>

            {loading ? (
                <div>Loading...</div>
            ) : entries.length === 0 ? (
                <div>No entries yet.</div>
            ) : (
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "10px",
                        background: "white",
                        borderRadius: "6px",
                        overflow: "hidden",
                    }}
                >
                    <thead>
                        <tr style={{ background: "#9DCAC1", textAlign: "left" }}>
                            <th style={{ padding: "10px" }}>Category</th>
                            <th style={{ padding: "10px" }}>Name</th>
                            <th style={{ padding: "10px" }}>Date</th>
                            <th style={{ padding: "10px" }}>Notes</th>
                        </tr>
                    </thead>

                    <tbody>
                        {entries.map((e) => (
                            <tr key={`${e.category}-${e.id}`} style={{ borderBottom: "1px solid #eee" }}>
                                {/* COLOR TAG */}
                                <td style={{ padding: "10px" }}>
                                    <span
                                        style={{
                                            background: CATEGORY_COLORS[e.category] || "#777",
                                            padding: "4px 10px",
                                            borderRadius: "12px",
                                            color: "white",
                                            fontSize: "0.85rem",
                                        }}
                                    >
                                        {TITLES[e.category] || e.category}
                                    </span>
                                </td>

                                {/* NAME with link */}
                                <td style={{ padding: "10px" }}>
                                    <Link
                                        to={`/app/records/${e.category}`}
                                        style={{ color: "#0077aa", textDecoration: "none" }}
                                    >
                                        {e.name}
                                    </Link>
                                </td>

                                {/* DATE */}
                                <td style={{ padding: "10px" }}>{e.date}</td>

                                {/* NOTES */}
                                <td style={{ padding: "10px" }}>
                                    {e.notes && e.notes.trim().length > 0
                                        ? e.notes
                                        : <span style={{ color: "#888" }}>None</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
