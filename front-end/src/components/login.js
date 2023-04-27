import React, {useState} from "react";
import { Link, useParams } from 'react-router-dom';
import css from '../css/mycss.css' 

export default function Login() {
    const param =useParams();
    const role=param.role
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log({userName})
        console.log({password})
        const data= await fetch('http://localhost:9103/login/'+role+'/'+userName+'/'+password)
        .then(response => response.json()).catch((e) => {console.log(e.message)})
        console.log(data[0].login)
        if(data[0].login=='success'){
            window.location.href=`http://localhost:3000/${role}`
        }
        else {
            alert("you shall not pass")
        }
    }
    return(
        <div className="container">
        <form onSubmit={handleSubmit} className="form">
            <p className="title">user name</p>
            <input type="text" required onChange={(e)=>setUserName(e.target.value)} className="input" placeholder='username'/>
            <p className="title">password</p>
            <input type="password" required onChange={(e)=>setPassword(e.target.value)} className="input" placeholder='password'/>
            <br></br>
            <button type="submit" className="button">Submit</button>
        </form>
        </div>
    )
}