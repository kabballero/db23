import React, {  useState } from 'react';
import '../../css/mycss.css'

export default function DeleteOperator() {
    const [name, setName] = useState();
    const [success, setSuccess] = useState(false);
    async function handlClick() {
        const data = await fetch(`http://localhost:9103/deleteoperator/${name}`, {
            method: 'Post',
            headers: { 'Content-Type': 'application/json' }
        }).catch((e) => { console.log(e.message) })
        if (data.status == 200) {
            setSuccess(true);
        }
    }
    return (
        <div>
            <div className='container' style={{ position: 'relative', top: '150px' }}>
                <h1>delete an operator</h1>
                <input className='input' type='text' placeholder='username' onChange={(e) => setName(e.target.value)} />
                <button onClick={handlClick} className='button'>submit</button>
            </div>
            {success &&
                <div className='container'>
                    <div className="form" style={{ backgroundColor: "purple" }}>
                        <h1>success delete</h1>
                        <button onClick={() => { setSuccess(false) }} className='button'>ok</button>
                    </div>
                </div>}
        </div>
    )
}