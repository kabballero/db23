import React, { useState, useEffect } from 'react';
import '../../css/mycss.css';

export default function BossAddOperator() {
    const [schools, setSchools] = useState();
    const [success, setSuccess] = useState(false);
    const [noTeacher, setNoTeacher] = useState(false);
    const [name, setName] = useState();
    const [select, setSelect] = useState();
    async function fetchData(url) {
        var json = await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
            const data = await fetchData('http://localhost:9103/getschools')
            console.log(data.length)
            setSchools(data);
        }
        getData();
    }, [])
    async function handleClick(schoolID) {
        const data1 = await fetchData(`http://localhost:9103/usersdata/${name}`)
        if (data1[0].teacherID == null) {
            setNoTeacher(true);
        }
        else {
            const data = await fetch(`http://localhost:9103/addoperator/${data1[0].teacherID}/${schoolID}`, {
                method: 'Post',
                headers: { 'Content-Type': 'application/json' }
            }).catch((e) => { console.log(e.message) })
            if (data.status == 200) {
                setSuccess(true);
            }
        }
    }
    return (
        <div>
            {schools?.length > 0 ? (
                <div>
                    <div className='container' style={{ position: 'relative', top: '150px' }}>
                        <h1>add an operator</h1>
                        <input className='input' type='text' onChange={(e) => setName(e.target.value)} placeholder="teacher's uresname" />
                        <select onChange={(e) => setSelect(e.target.value)} className='button' value={select} >
                            <option>school</option>
                            {schools?.map((school) => (
                                <option value={school.schoolID}>{school.schoolNAME}</option>
                            ))}
                        </select>
                        <button onClick={handleClick.bind(null, select)} className='button'>submit</button>
                    </div>
                    {success &&
                        <div className='container'>
                            <div className="form" style={{ backgroundColor: "purple" }}>
                                <h1>success add</h1>
                                <button onClick={() => { setSuccess(false) }} className='button'>ok</button>
                            </div>
                        </div>}
                        {noTeacher &&
                        <div className='container'>
                            <div className="form" style={{ backgroundColor: "purple" }}>
                                <h1>this user is not a teacher</h1>
                                <button onClick={() => { setNoTeacher(false) }} className='button'>ok</button>
                            </div>
                        </div>}
                </div>
            ) : (
                <h1>wait</h1>
            )}
        </div>
    )
} 