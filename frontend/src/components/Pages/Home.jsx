import React, { useEffect, useState } from "react";
import Card from "../Card/Card.jsx";
import s from "../Card/Card.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const userid = Number(localStorage.getItem("userid"));
  const navigate = useNavigate();

  const [nextEvents, setNextEvents] = useState([]);
  const [recent, setRecent] = useState([]);

  // Fetch upcoming calendar events
  const loadUpcoming = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/records/all?userid=${userid}`, {
        method: "PUT"
      });

      const data = await res.json();

      // sort by date, filter future events
      const now = new Date();
      const upcoming = data
        .filter((item) => new Date(item.date) >= now)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);

      setNextEvents(upcoming);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch recent activity from *all categories*
  const loadRecent = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/records?userid=${userid}`
      );
      const data = await res.json();

      const sorted = data
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

      setRecent(sorted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadUpcoming();
    loadRecent();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "20px",
        padding: "0 20px"
      }}
    >

      {/* 1️⃣ COMING UP NEXT */}
      <Card className={s.stack} title="Upcoming Calendar Events">
        {nextEvents.length === 0 ? (
          <div>No upcoming events</div>
        ) : (
          <ul>
            {nextEvents.map((e, i) => (
              <li key={i} style={{ marginBottom: "8px" }}>
                <strong>{e.name}</strong>
                <br />
                <span style={{ fontSize: "14px", color: "#555" }}>
                  {e.date} — Calendar Event
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* 2️⃣ RECENT ACTIVITY */}
      <Card className={s.stack} title="Recent Activity">
        {recent.length === 0 ? (
          <div>No recent activity found</div>
        ) : (
          <ul>
            {recent.map((r, i) => (
              <li key={i} style={{ marginBottom: "8px" }}>
                <strong>{r.name}</strong>
                <br />
                <span style={{ fontSize: "14px", color: "#555" }}>
                  {r.date} — {r.category.replace("_", " ")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* 3️⃣ QUICK ACTIONS */}
      <Card className={s.stack} title="Quick Actions">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "10px",
          }}
        >
          <button
            className={s.primaryAction}
            onClick={() => navigate("/app/addRecords")}
          >
            + Add Record
          </button>

          <button
            className={s.buttonLike}
            onClick={() => navigate("/app/records/calendar")}
          >
            View Calendar
          </button>

          <button
            className={s.buttonLike}
            onClick={() => navigate("/app/entrylog")}
          >
            Entry Log
          </button>

          <button
            className={s.buttonLike}
            onClick={() => navigate("/app/fullreport")}
          >
            Print Full Report
          </button>

        </div>
      </Card>
    </div>
  );
}
