import React, { useState, useEffect } from 'react';
import '../../css/mycss.css'
import { useParams } from 'react-router-dom';

export default function CapoRequests({ schoolid }) {
    const params=useParams();
    const [requests, setRequests] = useState([]);
    const [successBorrow,setSuccessBorrow]=useState(false);
    const [deny,setDeny]=useState(false);
    const [successReservation,setSuccessReservation]=useState(false);
    const [successDelete,setSuccessDelete]=useState(false);
    async function fetchData(url) {
        var json = await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
            const data = await fetchData(`http://localhost:9103/requests/${schoolid}`)
            setRequests(data);
        }
        getData();
    }, [])
    async function handleClick1(username,bookid,date,stock,borrowid){
        //console.log(username,title,date,stock,borrowid)
        const current = new Date();
        const date2 = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        const d=encodeURIComponent(date2);
        //const d=encodeURIComponent(date);
        const data = await fetchData(`http://localhost:9103/usersdata/${username}`);
        const data2 = await fetchData(`http://localhost:9103/getoperatorid/${params.username}`);
        if(stock>0 && data[0].teacherborrowedbooks!==1 && data[0].studentborrowedbooks!==2 && data[0].owns==0){ 
            const data3 = await fetch(`http://localhost:9103/makeborrow/${username}/${bookid}/${d}/${data2[0].operatorid}/${borrowid}`, {
                method: 'Post',
                headers: { 'Content-Type': 'application/json' }
            }).catch((e) => { console.log(e.message) })
            if(data3.status==200){
                setSuccessBorrow(true);
            }
        }
        else if(data[0].teacherborrowedbooks==1 || data[0].studentborrowedbooks==2 || data[0].owns>0){
            setDeny(true)
        }
        else if(stock==0 && data[0].teacherborrowedbooks!==1 && data[0].studentborrowedbooks!==2 && data[0].owns==0){ 
            const data4 = await fetch(`http://localhost:9103/makereservation/${username}/${bookid}/${d}/${borrowid}`, {
                method: 'Post',
                headers: { 'Content-Type': 'application/json' }
            }).catch((e) => { console.log(e.message) })
            if(data4.status==200){
                setSuccessReservation(true);
            }
        }
    }
    async function handleClick2(borrowid){
        const data = await fetch(`http://localhost:9103/deleterequest/${borrowid}`, {
                method: 'Post',
                headers: { 'Content-Type': 'application/json' }
            }).catch((e) => { console.log(e.message) })
            if(data.status==200){
                setSuccessDelete(true);
            }      
    } 
    return (
        <div>
            {requests?.length > 0 ? (
                <div>
                    {requests?.map((request) => (
                        <div className='container' style={{ borderStyle: "dotted", borderColor: "purple" }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h3 style={{ marginRight: '10px',textDecoration: 'underline'}}>username:</h3>
                                <p style={{ margin: 0 }}>{request.username}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h3 style={{ marginRight: '10px',textDecoration: 'underline'}}>book title:</h3>
                                <p style={{ margin: 0 }}>{request.title}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h3 style={{ marginRight: '10px',textDecoration: 'underline'}}>date request:</h3>
                                <p style={{ margin: 0 }}>{request.dateRequest}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h3 style={{ marginRight: '10px',textDecoration: 'underline'}}>stock:</h3>
                                <p style={{ margin: 0 }}>{request.availability}</p>
                            </div>
                            <button className='button' onClick={handleClick1.bind(null,request.username,request.bookID,request.dateRequest,request.availability,request.borrowID)} style={{ fontSize: '15px', height: '25px', alignSelf: 'center' }}>approve</button>
                            <button className='button' onClick={handleClick2.bind(null,request.borrowID)} style={{ fontSize: '15px', height: '25px', alignSelf: 'center', backgroundColor: '#c03737' }}>delete</button>
                        </div>
                    ))}
                    {successBorrow && 
                    <div className='container'>
                    <div className="form" style={{backgroundColor: "purple"}}>
                        <h1>borrow success</h1>
                        <button onClick={()=>{setSuccessBorrow(false);window.location.reload()}} className='button'>ok</button>
                    </div>
                    </div>
                    }
                    {deny && 
                    <div className='container'>
                    <div className="form" style={{backgroundColor: "purple"}}>
                        <h1>this user cannot borrow</h1>
                        <button onClick={()=>{setDeny(false)}} className='button'>ok</button>
                    </div>
                    </div>
                    }
                    {successReservation && 
                    <div className='container'>
                    <div className="form" style={{backgroundColor: "purple"}}>
                        <h1>reservation success</h1>
                        <button onClick={()=>{setSuccessReservation(false);window.location.reload()}} className='button'>ok</button>
                    </div>
                    </div>
                    }
                    {successDelete && 
                    <div className='container'>
                    <div className="form" style={{backgroundColor: "purple"}}>
                        <h1>deleted</h1>
                        <button onClick={()=>{setSuccessDelete(false);window.location.reload()}} className='button'>ok</button>
                    </div>
                    </div>
                    }                     
                </div>
            ) : (
                <h1>wait</h1>
            )}
        </div>
    )
}