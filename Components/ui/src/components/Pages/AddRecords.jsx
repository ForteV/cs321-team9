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
    }, [ref]);
}


export default function AddRecords(){
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    /*Makes sure person only inputs Date*/
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

    return (
        <div className={ar.formGrid} style={{ "--date-col": "464px" }}>
        {/* This is the left column */}
            <div className={ar.leftCol}>
                <Card 
                    className={`${s.stack} ${s.dateCard}`} 
                    title="Date">
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
            <button type="button" className={`${ar.btn} ${ar.btnSecondary}`}>Cancel</button>
            <button type="button" className={`${ar.btn} ${ar.btnPrimary}`}>Save</button>
        </div>
      
      </div>

      

      {/* This is the right column */}
        <Card className={s.stack} title="Optional Notes" style={{ "--card-min-h": "620px" }}>
            <textarea
                ref={notesRef}
                className={s.expandableTextarea}
                rows={1}
                placeholder="Type here..."
                onBlur={(e) => { if (!e.currentTarget.value) e.currentTarget.style.height = ""; }}
                title="What some additional info?"
            />
        </Card>

    </div>
  );
}
