import React,{useEffect,useState} from 'react';
import '../../css/mycss.css';
import { useParams } from 'react-router-dom';

export default function Reserve(){
    const params=useParams();
    const [reserves,setReserves]=useState();
    const [successDelete,setSuccessDelete]=useState(false);
    async function fetchData(url) {
        var json = await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
            const data = await fetchData(`http://localhost:9103/userReserves/${params.userName}`)
            setReserves(data);
        }
        getData();
    }, [])
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
                <div className='container'>
                    {reserves?.map((reserve)=>(
                        <div key={reserve.reservationID} className='container' style={{borderStyle:'dotted',borderColor:'purple'}}>
                            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                <h3 style={{textDecoration:'underline',marginRight:'10px'}}>book title:</h3>
                                <p>{reserve.title}</p>
                            </div>
                            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                <h3 style={{textDecoration:'underline',marginRight:'10px'}}>reservation date:</h3>
                                <p>{reserve.reservationDate}</p>
                            </div>
                            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                <h3 style={{textDecoration:'underline',marginRight:'10px'}}>due date:</h3>
                                <p>{reserve.duedate}</p>
                            </div>
                            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                <h3 style={{textDecoration:'underline',marginRight:'10px'}}>stock:</h3>
                                <p>{reserve.availability}</p>
                            </div>
                            <button className='button' onClick={handleClick2.bind(null,reserve.reservationID)} style={{backgroundColor: '#c03737'}}>delete</button>
                        </div>
                    ))}
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
                <h1>no reserves</h1>
            )}
        </div>
    )
}