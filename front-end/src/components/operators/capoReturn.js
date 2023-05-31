import React, { useState,useEffect } from 'react';
import '../../css/mycss.css'

export default function CapoReturn(){
    const [name,setName]=useState();
    const [seebooks,setSeebooks]=useState(false);
    return(
        <div>
        {!seebooks &&
        <div className='container' style={{position:'relative',top:'150px'}}>
            <h1>return a book</h1>
            <input className='input' placeholder='username' onChange={(e)=>setName(e.target.value)}/>
            <button onClick={()=>setSeebooks(true)} className='button'>submit</button>
        </div>}
        {seebooks &&
        <Return name={name}/>
        }
        </div>
    )
}

function Return({name}){
    const [success,setSuccess]=useState(false);
    var [borrowed, initBorrowed] = useState([])
    async function fetchData(url){
        var json =await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
        const data =await fetchData(`http://localhost:9103/borrowed2/${name}`)
        initBorrowed(data);
        }
        getData();
    }, [name])
    async function handleClick(bid){
        const data = await fetch(`http://localhost:9103/return/${bid}`, {
                method: 'Post',
                headers: { 'Content-Type': 'application/json' }
            }).catch((e) => { console.log(e.message) })
            if(data.status==200){
                setSuccess(true);
            }      
    }
    return (
        <div>
            {borrowed?.length >0 ? (
                <div>
                {borrowed?.map((book)=>(
                    <div key={book.bookID} className="container" style={{borderStyle: "dotted",borderColor: "purple"}}>
                    <h1>{book.title}</h1>
                    <div style={{ display: "flex", alignItems: "center" }}>
                    <h3 style={{ textDecoration: "underline", marginRight: "10px" }}>borrowed date:</h3>
                    <p>{book.borrowDate}</p>
                    </div>
                    <button onClick={handleClick.bind(null,book.borrowingID)} className='button'>return</button>
                    </div>
                )
                )}
                {success &&
                <div className='container'>
                <div className="form" style={{backgroundColor: "purple"}}>
                    <h1>return success</h1>
                    <button onClick={()=>{setSuccess(false);window.location.reload()}} className='button'>ok</button>
                </div>
                </div>
                }
                </div>
            ):(
                <h1>no books borrowed</h1>
            )}
        </div>
    )
}