import s from "./Table.module.css";

export default function Table(){
  return (
    <div className={s.wrap}>
      <table className={s.table}>
        <thead>
          <tr>
            <th>Type</th><th>Date</th><th>Provider</th><th>Notes</th><th>Attachments</th><th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span className={`${s.badge} ${s.danger}`}>Allergy</span></td>
            <td>2025-05-01</td><td>Dr. Wang</td><td>Peanuts; carries EpiPen.</td>
            <td className={s.muted}>2 files</td><td className={s.actions}>⋯</td>
          </tr>
          <tr>
            <td><span className={`${s.badge} ${s.info}`}>Bloodwork</span></td>
            <td>2025-04-12</td><td>GMU Clinic</td><td>CBC normal.</td>
            <td className={s.muted}>1 files</td><td className={s.actions}>⋯</td>
          </tr>
          <tr>
            <td><span className={`${s.badge} ${s.success}`}>Medication</span></td>
            <td>2025-03-20</td><td>Dr. Smith</td>
            <td>Lisinopril 10mg daily.</td><td>–</td><td className={s.actions}>⋯</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}