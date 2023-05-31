import React,{useState,useEffect} from 'react';
import '../../css/mycss.css'
import { useParams } from 'react-router-dom';

export default function CapoReserve({schoolid}){
    const params=useParams();
    const [reserves,setReserves]=useState();
    const [successBorrow,setSuccessBorrow]=useState(false);
    const [deny,setDeny]=useState(false);
    const [successDelete,setSuccessDelete]=useState(false);
    async function fetchData(url) {
        var json = await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
        const data =await fetchData(`http://localhost:9103/reserves/${schoolid}`)
        //console.log(json)
        setReserves(data);
        }
        getData();
    }, [])
    async function handleClick1(username,bookID,reservationID){
        const current = new Date();
        const date2 = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        const d=encodeURIComponent(date2);
        //const d=encodeURIComponent(date);
        const data = await fetchData(`http://localhost:9103/usersdata/${username}`);
        const data2 = await fetchData(`http://localhost:9103/getoperatorid/${params.username}`);
        if(data[0].teacherborrowedbooks!==1 && data[0].studentborrowedbooks!==2 && data[0].owns==0){ 
            const data3 = await fetch(`http://localhost:9103/makeborrow3/${username}/${bookID}/${d}/${data2[0].operatorid}/${reservationID}`, {
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
    }
    async function handleClick2(reservationID){
        const data = await fetch(`http://localhost:9103/deletereserve/${reservationID}`, {
                method: 'Post',
                headers: { 'Content-Type': 'application/json' }
            }).catch((e) => { console.log(e.message) })
            if(data.status==200){
                setSuccessDelete(true);
            }      
    }
    return(
        <div>
            {reserves?.length>0 ? (
                <div>
                    {reserves?.map((reserve)=>
                    <div className='container' style={{ borderStyle: "dotted", borderColor: "purple" }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h3 style={{ marginRight: '10px',textDecoration: 'underline'}}>username:</h3>
                                <p style={{ margin: 0 }}>{reserve.username}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h3 style={{ marginRight: '10px',textDecoration: 'underline'}}>book title:</h3>
                                <p style={{ margin: 0 }}>{reserve.title}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h3 style={{ marginRight: '10px',textDecoration: 'underline'}}>date request:</h3>
                                <p style={{ margin: 0 }}>{reserve.reservationDate}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h3 style={{ marginRight: '10px',textDecoration: 'underline'}}>due date:</h3>
                                <p style={{ margin: 0 }}>{reserve.duedate}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h3 style={{ marginRight: '10px',textDecoration: 'underline'}}>stock:</h3>
                                <p style={{ margin: 0 }}>{reserve.availability}</p>
                            </div>
                            <button disabled={reserve.availability==0} onClick={handleClick1.bind(null,reserve.username,reserve.bookID,reserve.reservationID)}
                            style={reserve.availability==0 ? {cursor: "not-allowed"}:{}} className='button'>borrow</button>
                            <button onClick={handleClick2.bind(null,reserve.reservationID)} className='button' style={{backgroundColor: '#c03737'}}>delete</button>
                    </div>
                    )}
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
                    {successDelete && 
                    <div className='container'>
                    <div className="form" style={{backgroundColor: "purple"}}>
                        <h1>deleted</h1>
                        <button onClick={()=>{setSuccessDelete(false);window.location.reload()}} className='button'>ok</button>
                    </div>
                    </div>
                    }     
                </div>
            ):(
                <h1>no reserve</h1>
            )}
        </div>
    )
}