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
            <Link to="/login/operator">
            <button className="button">caporegime</button>
            </Link>        
            <Link to="/login/users">
            <button className="button">kyles</button>
            </Link>
            </div>
        </div>
    )
}