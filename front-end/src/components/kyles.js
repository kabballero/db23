import React, {useState} from "react";
import { Link } from 'react-router-dom';
import '../css/mycss.css' 

export default function Kyles() {
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
                <Link href="#features" className="title" style={{ color: "purple" }}>borrowed</Link>
                <Link href="#pricing" className="title" style={{ color: "purple" }}>profile</Link>
            </div>
            <div className="container">
                <form onSubmit={handleSubmit} className="form2">
                    <p className="title">book search</p>
                    <p>select a category</p>
                    <select value={select} onChange={(e) => setSelect(e.target.value)} className="button">
                        <option value="null">none</option>
                        <option value="a">categoty1</option>
                        <option value="b">categoty2</option>
                        <option value="c">categoty3</option>
                        <option value="d">categoty4</option>
                    </select>
                    <br></br>
                    <br></br>
                    <input type="text" className="input" onChange={(e) => setName(e.target.value)} placeholder='author name' />
                    <input type="text" className="input" onChange={(e) => setTitle(e.target.value)} placeholder='title name' />
                    <br></br>
                    <button type="submit" className="button">search</button>
                </form>
            </div>
        </div>
    )
}