import Card from "../Card/Card.jsx";
import s from "../Card/Card.module.css";
import ar from "./AddRecords.module.css";
import { useRef, useState, useLayoutEffect } from "react";

/*Makes sure that the Optionals Notes grow only downwards*/
function useAutoGrow(ref){
    useLayoutEffect(() => {
        const ta = ref.current; if (!ta) return;
        
        const grow = () => { ta.style.height = "auto"; 
                             ta.style.height = ta.scrollHeight + "px"; 
                            };
        grow();

        ta.addEventListener("input", grow);
        
        return () => ta.removeEventListener("input", grow);
    }, 
    [ref]
    );
}


export default function AddRecords(){
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const [status, setStatus] = useState("");
    const [saving, setSaving] = useState(false);

    const onDateChange = (e) => {
        const d = e.target.value.replace(/\D/g, "").slice(0,8);
        let out = d;
        
        if (d.length > 2) 
            out = d.slice(0,2) + "/" + d.slice(2);
        
        if (d.length > 4) 
            out = out.slice(0,5) + "/" + out.slice(5);
        
        setDate(out);
    };

    const notesRef = useRef(null);
    useAutoGrow(notesRef);

    const validMDY = (s) => /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(s);
    const toISO = (s) => { 
        const [mm,dd,yyyy] = s.split("/"); 
        return `${yyyy}-${mm}-${dd}`; 
    };

    const onCancel = () => {  
        setCategory("");
        setDate("");
        
        if (notesRef.current) 
            notesRef.current.value = "";
        
        setStatus("");
    };


    const onSave = async () => {                                    
        setStatus("");
        
        if (!category) {
            setStatus("Choose a category."); 
            return; 
        }

        if (!validMDY(date)) {
            setStatus("Use MM/DD/YYYY.");
            return; 
        }
    
        const notes = notesRef.current?.value || "";
        setSaving(true);
    
        try {
            const res = await fetch("/api/records", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category, date: toISO(date), notes })
            });
            
            if (!res.ok) 
                throw new Error(await res.text());

            const rec = await res.json();
            
            setStatus(`Saved ✔ #${rec.id} • ${rec.category} • ${rec.date}`);

            if (notesRef.current) 
                notesRef.current.value = "";
        } 
            
        catch (e) {
            setStatus(`Could not save yet (backend?): ${e.message || e}`);
        } 
            
        finally {
            setSaving(false);
        }
    };

    return (
        <div className={ar.formGrid} style={{ "--date-col": "464px" }}>
        {/* This is the left column */}
            <div className={ar.leftCol}>
                <Card 
                    className={`${s.stack} ${s.dateCard}`} title="Date">
                        <input
                            className={`${s.fixedInput} ${s.dateField}`}
                            placeholder="MM / DD / YYYY"
                            inputMode="numeric"
                            maxLength={10}
                            value={date}
                            onChange={onDateChange}
                            pattern="(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/\\d{4}"
                            title="Use MM/DD/YYYY"
                        />
                </Card>

        <div className={ar.categoryBox}>
            <label htmlFor="category" className={ar.categoryLabel}>Category</label>
                <select
                    id="category"
                    className={ar.categorySelect}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >

                    <option value="">Select category…</option>
                    <option value="general">General</option>
                    <option value="allergies">Allergies</option>
                    <option value="immunizations">Immunizations</option>
                    <option value="procedures">Procedures</option>
                    <option value="insurance">Insurance</option>
                </select>
        </div>

        <div className={ar.actionsRow}>
            <button type="button" className={`${ar.btn} ${ar.btnSecondary}`} onClick={onCancel}>Cancel</button>
            <button type="button" className={`${ar.btn} ${ar.btnPrimary}`} onClick={onSave} disabled={saving}>
                {saving ? "Saving..." : "Save"}
            </button>
        </div>

        {status && (
          <div style={{ 
                marginTop: 8, 
                color: status.startsWith("Saved") ? "green" : "crimson" }
                }>
            {status}
          </div>
        )}
      
      </div>

      

      {/* This is the right column */}
        <Card className={s.stack} title="Optional Notes" style={{ "--card-min-h": "620px" }}>
            <textarea
                ref={notesRef}
                className={s.expandableTextarea}
                rows={1}
                placeholder="Type here..."
                onBlur={(e) => { if (!e.currentTarget.value) e.currentTarget.style.height = ""; }}
                title="What's some additional info?"
            />
        </Card>

    </div>
  );
}
