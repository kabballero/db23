import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import Navbar from './navbar'
import Books from './books'
import Borrowed from './borrowed'
import Profile from './profile'
import Review from './review'
import '../css/mycss.css'

export default function Kyles() {
    const [select, setSelect] = useState()
    const [name, setName] = useState()
    const [title, setTitle] = useState()
    const [submited, setSubmited] = useState(false)
    const [seeborrowed, setSeeborrowed] = useState(false)
    const [seeprofile, setSeeprofile] = useState(false)
    const [makeReview, setMakeReview] = useState(false)
    const [seereservations, setSeereservations] = useState(false)
    const params = useParams();
    const username = params.userName;
    var [categories, initCategories] = useState([])
    async function fetchData(url) {
        var json = await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
            const data = await fetchData('http://localhost:9103/categories')
            console.log(data.length)
            initCategories(data);
        }
        getData();
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log({ select })
        console.log({ name })
        console.log({ title })
        //window.location.href=`http://localhost:3000/books/${username}/${select}/${name}/${title}`
        setSubmited(true);
    }
    const handleChangeValues = (newvalue1, newvalue2, newvalue3, newvalue4, newvalue5) => {
        setSubmited(newvalue1);
        setSeeborrowed(newvalue2);
        setSeeprofile(newvalue3);
        setSeereservations(newvalue5);
    }
    return (
        <div>
            <Navbar changeValues={handleChangeValues} />
            {categories?.length > 0 ? (
                <div className="container">
                    {!submited && !seeborrowed && !seeprofile && !seereservations && <form onSubmit={handleSubmit} className="form2">
                        <p className="title">book search</p>
                        <p>select a category</p>
                        <select value={select} onChange={(e) => setSelect(e.target.value)} className="button">
                            <option value="null">none</option>
                            {categories?.map((category) => (
                                <option key={category.category} value={category.category}>{category.category}</option>
                            ))}
                        </select>
                        <br></br>
                        <br></br>
                        <input type="text" className="input" onChange={(e) => setName(e.target.value)} placeholder='author name' />
                        <input type="text" className="input" onChange={(e) => setTitle(e.target.value)} placeholder='title name' />
                        <br></br>
                        <button type="submit" className="button">search</button>
                    </form>}
                    {submited && !seeborrowed && !seeprofile && !seereservations && <Books nameIN={name} />}
                    {seeborrowed && !seeprofile && !submited && !seereservations && <Borrowed />}
                    {!seeborrowed && seeprofile && !submited && !seereservations && <Profile />}
                </div>) : (
                <h1>wait</h1>
            )}
        </div>
    )
}