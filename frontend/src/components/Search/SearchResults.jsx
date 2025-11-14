// components/Search/SearchResults.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function SearchResults({ results = [], onClose }) {

  return (
    <div
      style={{
        position: "absolute",
        top: "40px",          // directly beneath the header bar
        right: "400px",       // lines up before Log Out button
        width: "360px",
        background: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
        zIndex: 9999,
        padding: "12px"
      }}
    >
      <button
        onClick={onClose}
        style={{
          float: "right",
          border: "none",
          background: "transparent",
          fontSize: "18px",
          cursor: "pointer"
        }}
      >
        ×
      </button>

      <h3 style={{ marginTop: 0, marginBottom: "10px" }}>Search Results</h3>

      {!results || results.length === 0 ? (
        <div style={{ color: "#777" }}>No matches found.</div>
      ) : (
        results.map((r, i) => (
          <div
            key={i}
            style={{
              padding: "6px 0",
              borderBottom: "1px solid #eee"
            }}
          >
            <Link
              to={`/app/records/${r.category}`}
              style={{ color: "#0077cc", textDecoration: "none" }}
            >
              <strong>{r.name}</strong>
            </Link>

            <div style={{ fontSize: "12px", color: "#555" }}>
              {r.date} — <em>{r.category}</em>
            </div>

            {r.notes && (
              <div style={{ fontSize: "12px", color: "#777" }}>
                {r.notes.length > 40
                  ? r.notes.slice(0, 40) + "…"
                  : r.notes}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
