import React from "react";
import { Link } from 'react-router-dom';
import '../css/mycss.css' 

export default function Home() {
    return(
        <div className="home">
            <h1 className="header"> SCHOOLIB</h1>
            <div className="container">
            <Link to="/login/admins">
            <button className="button">admin</button>
            </Link>
            <Link to="/login/operator">
            <button className="button">operator</button>
            </Link>        
            <Link to="/login/users">
            <button className="button">user</button>
            </Link>
            </div>
        </div>
    )
}