import React from "react";
import { Link } from 'react-router-dom';
import '../css/mycss.css' 

export default function Home() {
    return(
        <div className="home">
            <h1 className="header"> SCHOOLIB</h1>
            <div className="container">
            <Link to="/login/admins">
            <button className="button">the boss</button>
            </Link>
            <br></br>
            <Link to="/login/operator">
            <button className="button">caporegime</button>
            </Link>
            <br></br>
            <Link to="/login/teachers">
            <button className="button">sonderkommando</button>
            </Link>
            <br></br>
            <Link to="/login/students">
            <button className="button">kyles</button>
            </Link>
            </div>
        </div>
    )
}