import React, {useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import '../css/mycss.css' ; 

export default function Books() {
    var [books, initBooks] = useState([])
    async function fetchData(url){
        var json =await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
        const data =await fetchData('http://localhost:9103/books')
        //console.log(json)
        initBooks(data);
        }
        getData();
    }, [])
 
    return(
        <div>
            <div className="container2">
                <h1 className="title">SCHOOLIB</h1>
                <Link href="#home" className="title" style={{ color: "purple" }}>search book</Link>
                <Link href="#features" className="title" style={{ color: "purple" }}>borrowed</Link>
                <Link href="#pricing" className="title" style={{ color: "purple" }}>profile</Link>
            </div>
            {books?.length >0 ? (
                <div className="container">
                {books?.map((book) => (
                    <div className="container" style={{borderStyle: "dotted",borderColor: "red"}}>
                    <h1>{book.title}</h1> 
                    <img src={book.image} alt=""/>
                    <h3 style={{textDecoration: "underline"}}>summary</h3>
                    <p>{book.summary}</p>
                    <h3>language: {book.languages}</h3>
                    <h3>pages: {book.pages}</h3>
                    <h3>{book.availability} available</h3>
                    <button className="button">I WANT IT</button>
                    </div>                         
                    ))}
                </div>
            ):(
            <h1>no books</h1>
            )}
        </div>
    )
}