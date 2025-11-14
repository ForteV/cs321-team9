import React from "react";
import "./RecordsTable.css";

export default function RecordsTable({ rows }) {
    return (
        <div className="records-wrap">
            <table className="records-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Notes</th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map((r) => (
                        <tr key={r.id}>
                            <td>{r.name}</td>
                            <td>{r.date}</td>
                            <td>{r.notes || ""}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
