/* External Imports */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';

/* Internal Imports */
import App from "./App.js";

/* Render */
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById("root"));