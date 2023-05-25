import React from 'react'
import {Link} from 'react-router-dom'
import '../css/mycss.css'

export default function Navbar({changeValues}) {
    const handleChangeValues1 = () => {
        changeValues(false,false,false,false,false);
      };
      const handleChangeValues2 = () => {
        changeValues(false,true,false,false,false);
      };
      const handleChangeValues3 = () => {
        changeValues(false,false,true,false,false);
      };   
      const handleChangeValues5 = () => {
        changeValues(false,false,false,false,true);
      };  
    return(
        <div className="container2">
                <h1 className="title">SCHOOLIB</h1>
                <Link onClick={handleChangeValues1} className="title" style={{ color: "purple" }}>search book</Link>
                <Link onClick={handleChangeValues2} className="title" style={{ color: "purple" }}>borrowed</Link>           
                <Link onClick={handleChangeValues3} className="title" style={{ color: "purple" }}>profile</Link>
                <Link onClick={handleChangeValues5} className="title" style={{ color: "purple" }}>reservations</Link>
            </div>
    )
}

