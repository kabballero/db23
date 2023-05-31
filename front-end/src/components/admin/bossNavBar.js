import React from "react";
import { Link } from "react-router-dom";
import '../../css/mycss.css'

export default function BossNavBar({changeValues}) {
    const values1= () => {
        changeValues(true,false,false)
    }
    const values2= () => {
        changeValues(false,true,false)
    }
    const values3= () => {
        changeValues(false,false,true)
    }
    return (
        <div className="container2">
            <h1 className="title">SCHOOLIB</h1>
            <Link onClick={values1} className="title" style={{ color: "#021f6d" }}>add school</Link>
            <Link onClick={values2} className="title" style={{ color: "#021f6d" }}>add operator</Link>
            <Link onClick={values3} className="title" style={{ color: "#021f6d" }}>delete an operator</Link>
        </div>

    )
}