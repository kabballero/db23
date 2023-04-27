import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../css/mycss.css'

export default function TheBoss() {
    const [select, setSelect] = useState()
    const [name, setName] = useState()
    const [title, setTitle] = useState()
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log({ select })
        console.log({ name })
        console.log({ title })
    }
    return (
        <div>
            <div className="container2">
                <h1 className="title">SCHOOLIB</h1>
                <Link href="#home" className="title" style={{ color: "purple" }}>search book</Link>
                <Link href="#features" className="title" style={{ color: "purple" }}>requests</Link>
                <Link href="#pricing" className="title" style={{ color: "purple" }}>profile</Link>
            </div>
            <div className="container">
                <form onSubmit={handleSubmit} className="form2">
                    <p className="title">book search</p>
                    <p>select a category</p>
                    <select value={select} onChange={(e) => setSelect(e.target.value)} className="button">
                        <option value="null">none</option>
                        <option value="a">Grapefruit</option>
                        <option value="b">Lime</option>
                        <option value="c">Coconut</option>
                        <option value="d">Mango</option>
                    </select>
                    <br></br>
                    <br></br>
                    <input type="text" className="input" onChange={(e) => setName(e.target.value)} placeholder='author name' />
                    <input type="text" className="input" onChange={(e) => setTitle(e.target.value)} placeholder='title name' />
                    <br></br>
                    <button type="submit" className="button">Submit</button>
                </form>
            </div>
        </div>
    )
}