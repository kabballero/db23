import React, {useState,useEffect} from "react";
import { useParams } from 'react-router-dom';
import Review from './review'
import '../../css/mycss.css' ; 

export default function Books({nameIN,category,title}) {
    const params=useParams();
    const username=params.userName;
    var [review, setReview] = useState(false);
    var [seeReview, setSeeReview] = useState(false);
    const [successRequest,setSuccessRequest]=useState(false);
    const [successReserve,setSuccessReserve]=useState(false);
    const [noReserve,setNoReserve]=useState(false);
    var [reviewBookID, setReviewBookID] = useState();
    var [books, initBooks] = useState([])
    var [user, initUser] = useState([])
    async function fetchData(url){
        var json =await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
        const n=encodeURIComponent(nameIN);
        const t=encodeURIComponent(title);
        const data =await fetchData(`http://localhost:9103/331/${n}/${category}/${t}`)
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
        const data1=await fetch(`http://localhost:9103/borrowRequest/${username}/${bookID}`,{
            method: 'Post',
            headers: { 'Content-Type': 'application/json'} }).catch((e) => {console.log(e.message)})
        if(data1.status===200){
            setSuccessRequest(true);
        }

    }
    async function handleClick2(bookID){
        //console.log(bookID)
        const data=await fetchData(`http://localhost:9103/checkreservationUser/${username}/${bookID}`);
        console.log(data)
        if(data?.length==0){
        const data2=await fetch(`http://localhost:9103/makereservationUser/${username}/${bookID}`,{
            method: 'Post',
            headers: { 'Content-Type': 'application/json'} }).catch((e) => {console.log(e.message)})
            if(data2.status===200){
                setSuccessReserve(true);
            }}
        else{
            setNoReserve(true);
        }

    }
 
    return(
        <div>
            {books?.length >0 && user.length>0 ? (
                <div className="container">
                {user && !seeReview && books[0]?.map((book) => (
                    <div key={book.bookID} className="container" style={{borderStyle: "dotted",borderColor: "purple"}}>
                    <h1>{book.title}</h1> 
                    <img src={book.image} alt=""/>
                    <h3 style={{textDecoration: "underline"}}>summary</h3>
                    <p>{book.summary}</p>
                    <h3>language: {book.languages}</h3>
                    <h3>pages: {book.pages}</h3>
                    <h3>{book.availability} available</h3>
                    <div style={{display:'flex',flexDirection:'row',gap:'10px'}}>
                    <button disabled={user[0].studentborrowedbooks===2 || user[0].teacherborrowedbooks===1} 
                    onClick={handleClick.bind(null,book.bookID)} 
                    style={user[0].studentborrowedbooks===2 || user[0].teacherborrowedbooks===1 ? {cursor: "not-allowed"}:{}} 
                    className="button">borrow request</button>
                    <button disabled={user[0].Sreservenum===2 || user[0].Treservenum===1} 
                    onClick={handleClick2.bind(null,book.bookID)} 
                    style={user[0].Sreservenum===2 || user[0].Treservenum===1 ? {cursor: "not-allowed"}:{}} 
                    className="button">reserve</button>
                    <button className="button" onClick={()=>{setReview(true); setReviewBookID(book.bookID)}}>review it</button>
                    <button className="button" onClick={()=>{setSeeReview(true);setReviewBookID(book.bookID)}}>see review</button>
                    </div>
                    </div>                      
                    ))}
                    {review && <Review bookID={reviewBookID} changeStatus={handleChangeStatus}/>} 
                    {successReserve && <div className="form" style={{backgroundColor: "purple"}}>
                        <h1>made reservation</h1>
                        <button className="button" onClick={()=>setSuccessReserve(false)}>ok</button>
                        </div>}
                        {noReserve && <div className="form" style={{backgroundColor: "purple"}}>
                        <h1>you have borrowed it</h1>
                        <button className="button" onClick={()=>setNoReserve(false)}>ok</button>
                        </div>}
                    {successRequest && <div className="form" style={{backgroundColor: "purple"}}>
                        <h1>made borrow request</h1>
                        <button className="button" onClick={()=>setSuccessRequest(false)}>ok</button>
                        </div>}
                    {seeReview && <SeeReview bookID={reviewBookID}/>}
                </div>
            ):(
            <h1>no books</h1>
            )}
        </div>
    )
}

function SeeReview(bookID){
    const [reviews,setReviews]=useState();
    async function fetchData(url){
        var json =await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
        const data =await fetchData(`http://localhost:9103/seereviews/${bookID.bookID}`)
        setReviews(data);
        }
        getData();
    }, [])
    return(
        <div>
            {reviews?.length>0 ? (
                <div className="container">
                    {reviews?.map((review)=>(
                        <div className="container" key={review.ratingID} style={{borderStyle: "dotted",borderColor: "purple"}}>
                            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                <h3 style={{textDecoration:'underline',marginRight:'10px'}}>the fella who did it:</h3>
                                <p>{review.username}</p>
                            </div>
                            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                <h3 style={{textDecoration:'underline',marginRight:'10px'}}>likert:</h3>
                                <p>{review.likert}</p>
                            </div>
                            <h3 style={{textDecoration:'underline'}}>text:</h3>
                            <p>{review.texts}</p>
                        </div>
                    ))}

                </div>
            ):(
                <h1>no reviews</h1>
            )}
        </div>
    )
}