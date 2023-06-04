import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../../css/mycss.css'

export default function CapoMkBorrow({schoolid}){
    const params=useParams();
    const [name,setName]=useState();
    const [book,setBook]=useState();
    const [noStock,setNoStock]=useState(false);
    const [success,setSuccess]=useState(false);
    const [banUser,setBanUser]=useState(false);
    async function fetchData(url) {
        var json = await fetch(url).then((response) => response.json());
        return json;
    }
    async function useHandleClick(username,book){
        const data0 = await fetchData(`http://localhost:9103/usersdata/${username}`)   
        const b=encodeURIComponent(book); 
        const data1 = await fetchData(`http://localhost:9103/infobook/${b}/${schoolid}`)        
        if(data0[0].studentborrowedbooks!==2 && data1[0].availability>0 && data0[0].teacherborrowedbooks!==1 && data0[0].owns==0){
            const current = new Date();
            const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
            const d=encodeURIComponent(date);
            const data2 = await fetchData(`http://localhost:9103/getoperatorid/${params.username}`);
            const data3= await fetch(`http://localhost:9103/makeborrow2/${name}/${data1[0].bookID}/${d}/${data2[0].operatorid}`, {
                method: 'Post',
                headers: { 'Content-Type': 'application/json' }
            }).catch((e) => { console.log(e.message) })
            if(data3.status==200){
                setSuccess(true);
            }
        }
        else if(data0[0].studentborrowedbooks==2 || data0[0].teacherborrowedbooks==1 || data0[0].owns==1){
            setBanUser(true);
        }
        else if(data1[0].availability==0){
            setNoStock(true);
        }
    }
    return(
        <div>
        <div className='container' style={{position: 'relative', top: '100px'}}>
            <h3>borrow a book</h3>
            <input type='text' onChange={(e)=>setName(e.target.value)} className='input' placeholder='username'/>
            <input type='text' onChange={(e)=>setBook(e.target.value)} className='input' placeholder='book'/>
            <button onClick={useHandleClick.bind(null,name,book)} className='button'>submit</button>
        </div>
        {banUser && 
        <div className='container'>
            <div className='form' style={{backgroundColor: 'purple'}}>
                <h1>this user cannot borrow</h1>
                <button className='button' onClick={()=>setBanUser(false)}>ok</button>
            </div>
        </div>
        }
        {noStock && 
        <div className='container'>
            <div className='form' style={{backgroundColor: 'purple'}}>
                <h1>this book is out o stock</h1>
                <button className='button' onClick={()=>setNoStock(false)}>ok</button>
            </div>
        </div>
        }
        {success && 
        <div className='container'>
            <div className='form' style={{backgroundColor: 'purple'}}>
                <h1>success</h1>
                <button className='button' onClick={()=>setSuccess(false)}>ok</button>
            </div>
        </div>
        }
        </div>
    )
}