import React from "react";
import { Link } from "react-router-dom";
import '../../css/mycss.css'

export default function CapoNavBar({changeValues}) {
    const values1= () => {
        changeValues(true,false,false,false,false,false,false,false)
    }
    const values2= () => {
        changeValues(false,true,false,false,false,false,false,false)
    }
    const values3= () => {
        changeValues(false,false,true,false,false,false,false,false)
    }
    const values4= () => {
        changeValues(false,false,false,true,false,false,false,false)
    }
    const values5= () => {
        changeValues(false,false,false,false,true,false,false,false)
    }
    const values6= () => {
        changeValues(false,false,false,false,false,true,false,false)
    }
    const values7= () => {
        changeValues(false,false,false,false,false,false,true,false)
    }
    const values8= () => {
        changeValues(false,false,false,false,false,false,false,true)
    }
    return (
        <div className="container2">
            <h1 className="title">SCHOOLIB</h1>
            <Link onClick={values1} className="title" style={{ color: "#021f6d" }}>books</Link>
            <Link onClick={values2} className="title" style={{ color: "#021f6d" }}>users</Link>
            <Link onClick={values3} className="title" style={{ color: "#021f6d" }}>requests</Link>
            <Link onClick={values4} className="title" style={{ color: "#021f6d" }}>make borrow</Link>
            <Link onClick={values5} className="title" style={{ color: "#021f6d" }}>reservations</Link>
            <Link onClick={values6} className="title" style={{ color: "#021f6d" }}>delayed</Link>
            <Link onClick={values7} className="title" style={{ color: "#021f6d" }}>reviews</Link>
            <Link onClick={values8} className="title" style={{ color: "#021f6d" }}>return a book</Link>
        </div>

    )
}