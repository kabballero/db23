import React from "react";
import { Link } from 'react-router-dom';
import css from '../css/mycss.css' 

export default function Home() {
    return(
        <div className="home">
            <h1 className="header"> SCHOOLIB</h1>
            <div className="container">
            <Link to="/login/theBoss">
            <button className="button">the boss</button>
            </Link>
            <br></br>
            <Link to="/login/caporegime">
            <button className="button">caporegime</button>
            </Link>
            <br></br>
            <Link to="/login/sonderkommando">
            <button className="button">sonderkommando</button>
            </Link>
            <br></br>
            <Link to="/login/kyles">
            <button className="button">kyles</button>
            </Link>
            </div>
        </div>
    )
}