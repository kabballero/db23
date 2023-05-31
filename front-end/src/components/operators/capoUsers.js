import React,{useState,useEffect} from 'react';
import '../../css/mycss.css'

export default function CapoUsers({schoolid}){
    const [deleteUser,setDeleteUser] = useState(false);
    const [deleteName,setDeleteName] = useState();
    const [newUsername,setNewUsername] = useState();
    const [newPassword,setNewPassword] = useState();
    const [newDate,setNewDate] = useState();
    const [newRole,SetNewRole] = useState();
    const [newFullname,setNewFullname] = useState();
    const [newNumber,setNewNumber] = useState();
    const [successDelete,setSuccessDelete]=useState(false);
    const[successAdd,setSuccessAdd]=useState(false);
    const [addUser,setAddUser]=useState(false);
    const [noUser,setNoUser]=useState(false);
    async function handleClick1(){
        const response=await fetch(`http://localhost:9103/deleteuser/${deleteName}`, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' }
            }).catch((e) => { console.log(e.message) })
        const data=await response.json();
        console.log(data.affectedRows)
        if(data.affectedRows==1){
            setSuccessDelete(true);
        }
        else if(data.affectedRows==0)  {
            setNoUser(true);
        }
    }
    async function handleClick2(){
        const d=encodeURIComponent(newDate);
        const f=encodeURIComponent(newFullname);
        const data=await fetch(`http://localhost:9103/adduser/${newUsername}/${d}/${newPassword}/${f}/${newRole}/${schoolid}/${newNumber}`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' }
            }).catch((e) => { console.log(e.message) })
        if(data.status==200){
            setSuccessAdd(true);
        }
    } 
    return(
        <div className="container" style={{ position: "relative", top: "150px" }}>
            {!deleteUser && !addUser &&
            <div className="container">
            <button onClick={()=>setAddUser(true)} className='button'>add a user</button>
            <button onClick={()=>setDeleteUser(true)} className='button'>delete a user</button>
            </div>
            }
            {deleteUser &&
            <div className='container'>
                <h1>delete a user</h1>
                <input className='input' onChange={(e)=>setDeleteName(e.target.value)} placeholder='username'/>
                <button className='button' onClick={handleClick1} style={{backgroundColor:"#c03737"}}>delete</button>
            </div>
            }
            {successDelete &&
            <div className='form'>
                <h3>success delete</h3>
                <button className='button' onClick={()=>{setSuccessDelete(false);setDeleteUser(false)}}>ok</button>
            </div>
            }
            {noUser &&
            <div className='form'>
                <h3>no such a user</h3>
                <button className='button' onClick={()=>{setNoUser(false);setDeleteUser(false)}}>ok</button>
            </div>
            }
            {addUser &&
            <div className='container' style={{ position: "fixed", top: "130px" }}>
                <h1>add a user</h1>
                <input required onChange={(e)=>setNewUsername(e.target.value)} className='input' placeholder='username'/>
                <input required onChange={(e)=>setNewPassword(e.target.value)} className='input' placeholder='password'/>
                <input required onChange={(e)=>setNewFullname(e.target.value)} className='input' placeholder='full name'/>
                <input required onChange={(e)=>setNewDate(e.target.value)} className='input' placeholder='birthdate:yyyy/mm/dd'/>
                <input required onChange={(e)=>setNewNumber(e.target.value)} className='input' placeholder='phone'/>
                <select required value={newRole} onChange={(e)=>SetNewRole(e.target.value)} className='button' style={{borderRadius:'0px'}}>
                    <option>role</option>
                    <option value='t'>teacher</option>
                    <option value='s'>student</option>
                </select>
                <button onClick={handleClick2} className='button'>submit</button>
            </div>
            }
            {successAdd && 
            <div className='form'>
                <h3>success add</h3>
                <button className='button' onClick={()=>{setSuccessAdd(false);setAddUser(false)}}>ok</button>
            </div>
            }
        </div>
    )
}