import React, { useEffect, useState } from "react";
import {useParams } from 'react-router-dom';
import '../../css/mycss.css'

export default function Review({bookID,changeStatus}) {
    console.log(bookID)
    const params = useParams();
    const username = params.userName;
    const [text, setText] = useState()
    const [selectedOption, setSelectedOption] = useState()
    const [title, setTitle] = useState()
    function handleOptionChange(e){
        setSelectedOption(e.target.value)
    }
    async function handleSubmit(e) {
        e.preventDefault();
         //console.log({bookID});
         await fetch(`http://localhost:9103/reviewRequest/${username}/${bookID}/${selectedOption}/${text}`,{
            method: 'Post',
            headers: { 'Content-Type': 'application/json'} }).catch((e) => {console.log(e.message)}) 
        changeStatus();

    }
    return (
        <form onSubmit={handleSubmit} className="form">
            <label>
                <h3>write your review:</h3>
                <br></br>
                <textarea rows="6" cols="50" value={text} onChange={(e) => setText(e.target.value)} placeholder="write your review here" />
            </label>
            <br></br>
            <div>
                <h3>What do you think about this book?</h3>
                <div>
                    <input
                        type="radio"
                        id="1"
                        name="likert"
                        value="1"
                        checked={selectedOption === '1'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="1">excellent</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="2"
                        name="likert"
                        value="2"
                        checked={selectedOption === '2'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="2">very good</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="3"
                        name="likert"
                        value="3"
                        checked={selectedOption === '3'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="3">good</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="4"
                        name="likert"
                        value="4"
                        checked={selectedOption === '4'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="4">bad</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="5"
                        name="likert"
                        value="5"
                        checked={selectedOption === '5'}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="5">very bad</label>
                </div>
                <p>Selected option: {selectedOption}</p>
            </div>
            <button type='submit' className="button">submit</button>
            <button type='button' className="button" style={{background: 'red'}} onClick={changeStatus}>cancel</button>
        </form>
    )
}