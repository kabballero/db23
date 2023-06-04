import React, { useState,useEffect } from "react";
import {useParams } from 'react-router-dom';
import '../../css/mycss.css'

export default function Profile() {
    const params = useParams();
    const username = params.userName;
    const [newpassword, setNewpassword] = useState(undefined)
    const [success, setSuccess] = useState(false)
    const [success2, setSuccess2] = useState(false)
    const[data,setData]=useState();
    const[newFullName,setNewFullName]=useState(undefined);
    const[newUserName,setNewUserName]=useState(undefined);
    const[newStreetName,setNewStreetName]=useState(undefined);
    const[newStreetNumber,setNewStreetNumber]=useState(undefined);
    const[newZipcode,setNewZipcode]=useState(undefined);
    const[newPhone,setNewPhone]=useState(undefined);
    async function fetchData(url){
        var json =await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
        const data =await fetchData(`http://localhost:9103/usersdata/${username}`)
        setData(data);
        }
        getData();
    }, [username])
    if(data?.[0].studentID!==null){
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
    )}
    else if (data?.[0].teacherID!==null){
        async function handleChange2(){
            const data=await fetch(`http://localhost:9103/changeTeacher/${username}/${newFullName}/${newStreetNumber}/${newZipcode}/${newPhone}/${newStreetName}/${newUserName}/${newpassword}`,{
            method: 'Post',
            headers: { 'Content-Type': 'application/json'} }).catch((e) => {console.log(e.message)})
        if(data.status==200){
            setSuccess2(true)
        }
        } 
        return(
            <div className="container">
                <h2>teacher</h2>
                <input type="text" onChange={(e)=>setNewUserName(e.target.value)} placeholder="change username" className="input" />
                <input type="text" onChange={(e)=>setNewFullName(e.target.value)} placeholder="change full name" className="input" />
                <input type="text" onChange={(e)=>setNewpassword(e.target.value)} placeholder="change password" className="input" />
                <input type="text" onChange={(e)=>setNewStreetName(e.target.value)} placeholder="change street name" className="input" />
                <input type="text" onChange={(e)=>setNewStreetNumber(e.target.value)} placeholder="change street number" className="input" />
                <input type="text" onChange={(e)=>setNewZipcode(e.target.value)} placeholder="change zipcode" className="input" />
                <input type="text" onChange={(e)=>setNewPhone(e.target.value)} placeholder="change phone" className="input" />
                <button className="button" onClick={handleChange2}>done</button>
            <br></br>
            <button className="button" style={{background:"#9b5a5a"}} onClick={()=>window.location.href='http://localhost:3000'}>log out</button>
            {success2 && <div className="form" style={{backgroundColor: "purple"}}>
            <h1>teacher changed</h1>
            <button className="button" onClick={()=>{setSuccess2(false);window.location.href=`http://localhost:3000/users/${newUserName}`}}>ok</button>
            </div>}
            </div>
        )
    }
}