import React, { useEffect, useState } from "react";
import "./FullReport.css";

export default function FullReport() {
  const userid = Number(localStorage.getItem("userid"));
  const [recordsByCategory, setRecordsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  // Categories to fetch in order
  const categories = [
    "allergies",
    "vaccines",
    "procedures",
    "insurance",
    "injuries",
    "medical_history",
    "family_history",
    "calendar"
  ];

  const prettyNames = {
    allergies: "Allergies",
    vaccines: "Immunizations",
    procedures: "Procedures",
    insurance: "Insurance Records",
    injuries: "Injuries",
    medical_history: "Medical History",
    family_history: "Family History",
    calendar: "Calendar Events"
  };

  useEffect(() => {
    const load = async () => {
      let grouped = {};

      for (const category of categories) {
        const res = await fetch(
          `http://localhost:8080/api/records?category=${category}&userid=${userid}`
        );

        const data = await res.json();

        // Sort entries by date ASC (oldest → newest)
        const sorted = data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        grouped[category] = sorted;
      }

      setRecordsByCategory(grouped);
      setLoading(false);
    };

    load();
  }, []);

  const printPage = () => window.print();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="fullReportContainer">

      <h1 className="fullReportTitle">Full Printable Report</h1>
      <p className="fullReportSubtitle">
        All entries organized by category and date.
      </p>

      <button className="printButton" onClick={printPage}>🖨 Print</button>

      {Object.keys(recordsByCategory).map((category) => {
        const items = recordsByCategory[category];

        return (
          <div key={category} className="categoryBlock">
            <h2 className="categoryTitle">{prettyNames[category]}</h2>

            {items.length === 0 ? (
              <div style={{ color: "#777" }}>No records found.</div>
            ) : (
              items.map((rec) => (
                <div key={rec.id} className="entryItem">
                  <div className="entryName">{rec.name}</div>
                  <div className="entryDate">{rec.date}</div>
                  {rec.notes && (
                    <div className="entryNotes">{rec.notes}</div>
                  )}
                </div>
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}
