import React from 'react'
import "./CreateAccount.css";

export default function CreateAccount(props) {
    return (props.trigger) ? (
        <div className="createAccountPage">
            <form className="popup-inner">
                <h4>Create Account</h4>
                <button onClick={() => props.setTrigger(false)}className="close button">Close</button>
                    <input name="displayname" placeholder="Name" type="text" required />
                    <input name="username" placeholder="Username" type="text" required />
                    <input name="password" placeholder="Password" type="password" required />
                    <input name="dob" placeholder="Date of Birth" type="text" required />
                    { props.children }
                <button onClick={() => props.setTrigger(false)}className="button tertiary">Submit</button>
            </form>
        </div>
    ) : null;
}