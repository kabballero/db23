import React, {useState,useEffect} from "react";
import { useParams } from 'react-router-dom';
import Review from './review'
import '../../css/mycss.css' ; 

export default function Books({nameIN,category,title}) {
    const params=useParams();
    const username=params.userName;
    var [review, setReview] = useState(false);
    var [reviewBookID, setReviewBookID] = useState();
    var [books, initBooks] = useState([])
    var [user, initUser] = useState([])
    async function fetchData(url){
        var json =await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
        const data =await fetchData(`http://localhost:9103/331/${nameIN}/${category}/${title}`)
        //console.log(json)
        initBooks(data);
        }
        getData();
    }, [])
    useEffect(() => {
        async function getData() {
        const data =await fetchData(`http://localhost:9103/usersdata/${username}`)
        initUser(data);
        }
        getData();
    }, [username])
    function handleChangeStatus(){
        setReview(false);
    }
    async function handleClick(bookID){
        //console.log(bookID)
        await fetch(`http://localhost:9103/borrowRequest/${username}/${bookID}`,{
            method: 'Post',
            headers: { 'Content-Type': 'application/json'} }).catch((e) => {console.log(e.message)})

    }
 
    return(
        <div>
            {books?.length >0 && user.length>0 ? (
                <div className="container">
                {user && books[0]?.map((book) => (
                    <div key={book.bookID} className="container" style={{borderStyle: "dotted",borderColor: "purple"}}>
                    <h1>{book.title}</h1> 
                    <img src={book.image} alt=""/>
                    <h3 style={{textDecoration: "underline"}}>summary</h3>
                    <p>{book.summary}</p>
                    <h3>language: {book.languages}</h3>
                    <h3>pages: {book.pages}</h3>
                    <h3>{book.availability} available</h3>
                    <button disabled={user[0].studentborrowedbooks===2 || user[0].teacherborrowedbooks===1} 
                    onClick={handleClick.bind(null,book.bookID)} 
                    style={user[0].studentborrowedbooks===2 || user[0].teacherborrowedbooks===1 ? {cursor: "not-allowed"}:{}} 
                    className="button">I WANT IT</button>
                    <button className="button" onClick={()=>{setReview(true); setReviewBookID(book.bookID)}}>review it</button>
                    </div>                      
                    ))}
                    {review && <Review bookID={reviewBookID} changeStatus={handleChangeStatus}/>} 
                </div>
            ):(
            <h1>no books</h1>
            )}
        </div>
    )
}