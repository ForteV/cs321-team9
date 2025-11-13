import React from 'react'
import "./CreateAccount.css";
import { useState } from "react";

export default function CreateAccount(props) {
    const [displayname, setDisplayname] = useState("");
    const [username, setUsername]       = useState("");
    const [password, setPassword]       = useState("");
    const [dob, setDob]                 = useState(""); //MM/DD/YYYY
    const [submitting, setSubmitting]   = useState(false);
    const [msg, setMsg]                 = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    
    //Clears fields
    const clearEverything = () => {
        setDisplayname("");
        setUsername("");
        setPassword("");
        setDob("");
        setMsg("");
    };

    //taken from add records
    const onDobChange = (str) => {
        const size = str.target.value.replace(/\D/g, "").slice(0, 8);
        let out = size;
        
        if (size.length > 2) 
            out = size.slice(0, 2) + "/" + size.slice(2);
        
        if (size.length > 4) 
            out = out.slice(0, 5) + "/" + out.slice(5);
        
        setDob(out);
    };
    
    //Validate that user inputs realistic date
    const validDOBFormat = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    const validBirth = (check) => validDOBFormat.test(check);

    function isActualDate(input){
        if (!validBirth(input)) 
            return false;

        const [mm, dd, yyyy] = input.split('/').map(Number);
        const forDate = new Date(yyyy, mm - 1, dd);
        return forDate.getFullYear() === yyyy && forDate.getMonth() === mm - 1 && forDate.getDate() === dd;
    }
    
    //Converts to ISO format
    const toISOFormat = (reStructure) => {
        const [mm, dd, yyyy] = reStructure.split("/");
        return `${yyyy}-${mm}-${dd}`;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setMsg("");

        //Force user to input fields
        if (!displayname.trim() || !username.trim() || !password || !dob) {
            setMsg("Please fill in all fields.");
            return;
        }

        //Validates DOB format
        if (!isActualDate(dob)) {
            setMsg("Date of Birth must be MM/DD/YYYY.");
            return;
        }
        
        if (password.length < 6) {
            setMsg("Password must be at least 6 characters.");
            return;
        }

        // This is for database when ready
        setSubmitting(true);
        try {
            const body = {
                displayname: displayname.trim(),
                username: username.trim(),
                //backend should hash this server-side
                password,
                //Sends Friendly string to database            
                dob: toISOFormat(dob),
            };

            const r = await fetch("/api/accounts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!r.ok) throw new Error(await r.text());

            setShowSuccess(true);
            setMsg("Account created ✔");
        
        } 
            
        catch (err) {
            setMsg(`Could not create account: ${err.message || err}`);
            //forte delete this when implemented database
            if (import.meta.env.DEV) {
                const fake = {
                    id: Date.now(),
                    displayname: displayname.trim(),
                    username: username.trim(),
                    dob: toISOFormat(dob),
                    created_at: new Date().toISOString(),
                };

                // persist to localStorage so you can see it later if needed
                const KEY = "accounts_dev";
                const existing = JSON.parse(localStorage.getItem(KEY) || "[]");
                localStorage.setItem(KEY, JSON.stringify([fake, ...existing]));

                // override message to success so UX feels normal
                setMsg("Account created ✔ (GUYS THIS IS A TEST)");
                setShowSuccess(true);
        
            }
            //until here
        } 
        
        finally {
            setSubmitting(false);
        }
    };

    const closeOnSuccess = () => {
        setShowSuccess(false);
        clearEverything();
        
        if (props.setTrigger) 
            props.setTrigger(false);
    }   

    return (props.trigger) ? (
        <>
            <div className="createAccountPage">
                {/* forte delete noValidate when you wanna test real database*/}
                <form className="popup-inner" onSubmit={onSubmit} noValidate>
                    <h4>Create Account</h4>
                    <button 
                        type="button"
                        onClick={() => props.setTrigger(false)}
                        className="close button"
                        >
                            Close
                        </button>
                        
                        <input 
                            name="displayname" 
                            placeholder="Name" 
                            type="text"
                            value={displayname}
                            onChange={(e) => setDisplayname(e.target.value)} 
                            required 
                            />

                        <input 
                            name="username" 
                            placeholder="Username" 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                        />

                        <input 
                            name="password" 
                            placeholder="Password" 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <input 
                            name="dob" 
                            placeholder="Date of Birth" 
                            type="text"
                            inputMode="numeric"
                            maxLength={10}
                            value={dob}
                            onChange={onDobChange}
                            pattern="(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/\d{4}"
                            title="Use MM/DD/YYYY"
                            required 
                        />

                        { props.children }

                        {msg && (
                            <div
                                style={{
                                    marginTop: 8,
                                    color: msg.includes("✔") ? "green" : "crimson",
                                }}
                            >
                                {msg}
                            </div>
                            )
                        }

                    <button type="submit" className="button tertiary" disabled={submitting}>
                        {submitting ? "submitting..." : "Submit"}
                    </button>

                    

                </form>
            </div>
            {showSuccess && (
                    <div
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.45)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 1000,

                        }}
                    >
                        <div className="popup-inner" style={{ maxWidth: 420, textAlign: "center" }}>
                            <h4>Account created</h4>
                            <p>You can now continue, this is a test will be good once database.</p>
                            <button type="button" className="button" onClick={closeOnSuccess}>
                                Close
                            </button>
                        </div>   
                    </div>
                )}

        </>
        ) : null;
}