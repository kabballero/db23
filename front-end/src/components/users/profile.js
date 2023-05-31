import React, { useState, useEffect } from "react";
import {useParams } from 'react-router-dom';
import '../../css/mycss.css'

export default function Profile() {
    const params = useParams();
    const username = params.userName;
    const [newpassword, setNewpassword] = useState()
    const [success, setSuccess] = useState(false)
    async function handleChange() {
        const data=await fetch(`http://localhost:9103/changePassword/${username}/${newpassword}`,{
            method: 'Post',
            headers: { 'Content-Type': 'application/json'} }).catch((e) => {console.log(e.message)})
        if(data.status==200){
            setSuccess(true)
        }
    }
    return (
        <div className="container">
        <div className="form" style={{borderRadius: "15px"}}>
            <input type="text" onChange={(e)=>setNewpassword(e.target.value)} placeholder="change password" className="input" />
            <button className="button" onClick={handleChange}>done</button>
            <br></br>
            <button className="button" style={{background:"#9b5a5a"}} onClick={()=>window.location.href='http://localhost:3000'}>log out</button>
        </div>
        {success && <div className="form" style={{backgroundColor: "purple"}}>
            <h1>password changed</h1>
            <button className="button" onClick={()=>setSuccess(false)}>ok</button>
            </div>}
        </div>
    )
}