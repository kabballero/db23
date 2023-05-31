import React, { useState } from 'react';
import '../../css/mycss.css';

export default function BossAddSchool(){
    const [name,setName]=useState();
    const [phone,setPhone]=useState();
    const [mail,setMail]=useState();
    const [success,setSuccess]=useState(false);
    async function handleClick(){
        const data=await fetch(`http://localhost:9103/addSchool/${name}/${phone}/${mail}`, {
                method: 'Post',
                headers: { 'Content-Type': 'application/json' }
            }).catch((e) => { console.log(e.message) })
        if(data.status==200){
            setSuccess(true);
        }
    }
    return(
        <div>
        <div className='container' style={{position:'relative',top:'130px'}}>
            <h1>add a school</h1>
            <input type='text' className='input' placeholder='school name' onChange={(e)=>setName(e.target.value)}/>
            <input type='text' className='input' placeholder='phone' onChange={(e)=>setPhone(e.target.value)}/>
            <input type='text' className='input' placeholder='email' onChange={(e)=>setMail(e.target.value)}/>
            <button onClick={handleClick} className='button'>submit</button>
        </div>
        {success &&
        <div className='container'>
                    <div className="form" style={{ backgroundColor: "purple" }}>
                        <h1>success add</h1>
                        <button onClick={() => { setSuccess(false) }} className='button'>ok</button>
                    </div>
                </div>}
        </div>
    )
}