import React, {useState,useEffect} from "react";
import { useParams } from 'react-router-dom';
import Navbar from './navbar'
import '../../css/mycss.css' ; 

export default function Borrowed() {
    const params=useParams();
    const username=params.userName;
    var [borrowed, initBorrowed] = useState([])
    async function fetchData(url){
        var json =await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
        const data =await fetchData(`http://localhost:9103/borrowed/${username}`)
        initBorrowed(data);
        }
        getData();
    }, [username])
    return (
        <div>
            {borrowed?.length >0 ? (
                borrowed?.map((book)=>(
                    <div key={book.bookID} className="container" style={{borderStyle: "dotted",borderColor: "purple"}}>
                    <h1>{book.title}</h1>
                    <div style={{ display: "flex", alignItems: "center" }}>
                    <h3 style={{ textDecoration: "underline", marginRight: "10px" }}>borrowed date:</h3>
                    <p>{book.borrowDate}</p>
                    </div>
                    </div>
                )
                )

            ):(
                <h1>no books borrowed</h1>
            )}
        </div>
    )
}