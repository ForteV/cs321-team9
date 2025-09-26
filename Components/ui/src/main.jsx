//This is the Startup file for the react application
//This file will put components inside the index.html to make it dynamic, this way is not static

import React from "react";
import ReactDOM from "react-dom/client"; 
import App from "./App.jsx";  //Connecting with app.jsx
import "./styles/tokens.css"; //Connecting with token.css
import "./styles/base.css"; //Connecting with base.css

//Gets the root element from index.html
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
);



// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
