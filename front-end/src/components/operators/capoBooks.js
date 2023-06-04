import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../css/mycss.css'

export default function Capobooks() {
    const params = useParams();
    const [addbook, setAddbook] = useState(false);
    const [newTitle, setNewTitle] = useState();
    const [newImage, setNewImage] = useState();
    const [newSummary, setNewSummary] = useState();
    const [newPages, setNewPages] = useState();
    const [newLanguage, setNewLanguge] = useState();
    const [newAvailability, setNewAvailability] = useState();
    const [schoolid, setSchoolid] = useState();
    const [categories, initCategories] = useState();
    const [select, setSelect] = useState();
    const [newIsbn, setNewIsbn] = useState();
    const [successAdd, setSuccessAdd] = useState(false);
    const [query, setQuery] = useState(false);
    const[newAuthorName,setNewAuthorName]=useState();
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
    useEffect(() => {
        async function getData() {
            const data = await fetchData(`http://localhost:9103/getoperator/${params.username}`)
            setSchoolid(data);
        }
        getData();
    }, [])
    
    async function handleClick2() {
        const i = encodeURIComponent(newImage);
        const data = await fetch(`http://localhost:9103/addBook/${newTitle}/${newSummary}/${newLanguage}/${newPages}/${newAvailability}/${schoolid[0].schoolID}/${i}/${select}/${newIsbn}/${newAuthorName}`, {
            method: 'Post',
            headers: { 'Content-Type': 'application/json' }
        }).catch((e) => { console.log(e.message) })
        if (data.status == 200) {
            setSuccessAdd(true);
        }
    }

    return (
        <div>
            {!addbook && !query && <div className="container" style={{ position: "relative", top: "150px" }}>
                <h3>what would you like to do:</h3>
                <button onClick={() => { setAddbook(true) }} className="button">add a book</button>
                <button onClick={() => { setQuery(true) }} className="button">view/update books</button>
            </div>}
            {addbook &&
                <div>
                    {schoolid?.length && categories.length > 0 ? (
                        <div className="container" style={{ position: 'relative', top: '100px' }}>
                            <input type='text' onChange={(e) => setNewTitle(e.target.value)} placeholder="title" className="input" />
                            <input type='text' onChange={(e) => setNewImage(e.target.value)} placeholder="image" className="input" />
                            <input type='text' onChange={(e) => setNewPages(e.target.value)} placeholder="pages" className="input" />
                            <input type='text' onChange={(e) => setNewIsbn(e.target.value)} placeholder="isbn" className="input" />
                            <input type='text' onChange={(e) => setNewAuthorName(e.target.value)} placeholder="author" className="input" />
                            <input type='text' onChange={(e) => setNewAvailability(e.target.value)} placeholder="availability" className="input" />
                            <input type='text' onChange={(e) => setNewLanguge(e.target.value)} placeholder="language" className="input" />
                            <select value={select} onChange={(e) => setSelect(e.target.value)} className="button">
                                <option value="null">none</option>
                                {categories?.map((category) => (
                                    <option key={category.category} value={category.category}>{category.category}</option>
                                ))}
                            </select>
                            <textarea rows='6' cols='50' onChange={(e) => setNewSummary(e.target.value)} placeholder="summary" style={{ background: '#a493af' }} />
                            <button onClick={handleClick2} className="button">submit</button>
                        </div>) : (
                        <h1>wait</h1>
                    )}
                </div>
            }
            {successAdd &&
                <div className='container'>
                    <div className="form" style={{ backgroundColor: "purple" }}>
                        <h1>success add</h1>
                        <button onClick={() => { setSuccessAdd(false) }} className='button'>ok</button>
                    </div>
                </div>
            }
            {query &&
                <Query />
            }
        </div>
    )
}

function Query() {
    const [title, setTitle] = useState();
    const [writer, setWriter] = useState();
    const [category, setCategory] = useState();
    const [stock, setStock] = useState();
    const [result, setResult] = useState(false);
    return (
        <div>
            {!result &&
                <div className="container" style={{ position: "relative", top: "150px" }}>
                    <input onChange={(e) => setTitle(e.target.value)} placeholder="title" className="input" />
                    <input onChange={(e) => setWriter(e.target.value)} placeholder="writer" className="input" />
                    <input onChange={(e) => setCategory(e.target.value)} placeholder="category" className="input" />
                    <input onChange={(e) => setStock(e.target.value)} placeholder="stock" className="input" />
                    <button onClick={() => setResult(true)} className="button">submit</button>
                </div>}
            {result && <Result title={title} writer={writer} category={category} stock={stock} />}
        </div>
    )
}

function Result({ title, writer, category, stock }) {
    const [updatebook, setUpdatebook] = useState(false);
    const[bookID,setBookID]=useState();
    title = encodeURIComponent(title);
    writer = encodeURIComponent(writer);
    const [q, setQ] = useState();
    async function fetchData(url) {
        var json = await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
            const data = await fetchData(`http://localhost:9103/321/${title}/${category}/${writer}/${stock}`)
            setQ(data);
        }
        getData();
    }, [])
    async function handleClick(bookID){
        setBookID(bookID);
        if(bookID!==undefined){
            console.log(bookID)
            setUpdatebook(true);}
    }
    return (
        <div>
        {!updatebook &&
        <div className="container">
            {q?.length > 0 ? (
                <div>
                    {q[0]?.map((qy) => (
                        <div className="container" style={{borderStyle:'dotted',borderColor:'purple'}}>
                            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <h3 style={{textDecoration:'underline',marginRight:'10px'}}>title:</h3>
                            <p>{qy.title}</p>
                            </div>
                            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <h3 style={{textDecoration:'underline',marginRight:'10px'}}>writer:</h3>
                            <p>{qy.an}</p>
                            </div>
                            <button onClick={handleClick.bind(null,qy.bookID)}className="button">update</button>
                        </div>
                    ))}
                </div>
            ) : (
                <h1>wait</h1>
            )}
        </div>}
        {updatebook && <Update bookID={bookID}/>}
        </div>
    )
}

function Update(bookID){
    console.log(bookID.bookID)
    const [books, setBooks] = useState([]);
    const [upgradedTitle, setUpgradedTitle] = useState();
    const [upgradedImage, setUpgradedImage] = useState();
    const [upgradedSummary, setUpgradedSummary] = useState();
    const [upgradedPages, setUpgradedPages] = useState();
    const [upgradedLanguage, setUpgradedLanguge] = useState();
    const [upgradedAvailability, setUpgradedAvailability] = useState();
    async function fetchData(url) {
        var json = await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
            const data = await fetchData(`http://localhost:9103/bookForUpdate/${bookID.bookID}`)
            setBooks(data);
        }
        getData();
    }, [])
    async function handleClick() {
        if (upgradedAvailability !== undefined) {
            await fetch(`http://localhost:9103/updateBookAvailability/${bookID.bookID}/${upgradedAvailability}`, {
                method: 'Post',
                headers: { 'Content-Type': 'application/json' }
            }).catch((e) => { console.log(e.message) })
        }
        if (upgradedImage !== undefined) {
            var i = encodeURIComponent(upgradedImage);
            await fetch(`http://localhost:9103/updateBookImage/${bookID.bookID}/${i}`, {
                method: 'Post',
                headers: { 'Content-Type': 'application/json' }
            }).catch((e) => { console.log(e.message) })
        }
        if (upgradedPages !== undefined) {
            await fetch(`http://localhost:9103/updateBookPages/${bookID.bookID}/${upgradedPages}`, {
                method: 'Post',
                headers: { 'Content-Type': 'application/json' }
            }).catch((e) => { console.log(e.message) })
        }
        if (upgradedTitle !== undefined) {
            await fetch(`http://localhost:9103/updateBookTitle/${bookID.bookID}/${upgradedTitle}`, {
                method: 'Post',
                headers: { 'Content-Type': 'application/json' }
            }).catch((e) => { console.log(e.message) })
        }
        if (upgradedLanguage !== undefined) {
            await fetch(`http://localhost:9103/updateBookLanguage/${bookID.bookID}/${upgradedLanguage}`, {
                method: 'Post',
                headers: { 'Content-Type': 'application/json' }
            }).catch((e) => { console.log(e.message) })
        }
        if (upgradedSummary !== undefined) {
            await fetch(`http://localhost:9103/updateBookSummary/${bookID.bookID}/${upgradedSummary}`, {
                method: 'Post',
                headers: { 'Content-Type': 'application/json' }
            }).catch((e) => { console.log(e.message) })
        }
    }
    return(
            <div>
                {books?.length > 0 ? (
                    <div>
                        {books?.map((book) => (
                            <div key={book.bookID} className="container" style={{ borderStyle: "dotted", borderColor: "purple" }}>
                                <h3 style={{ textDecoration: 'underline' }}>book title:</h3>
                                <input type='text' onChange={(e) => setUpgradedTitle(e.target.value)} placeholder={book.title} className="input" />
                                <h3 style={{ textDecoration: 'underline' }}>image:</h3>
                                <input type='text' onChange={(e) => setUpgradedImage(e.target.value)} placeholder={book.image} className="input" />
                                <h3 style={{ textDecoration: 'underline' }}>availability:</h3>
                                <input onChange={(e) => setUpgradedAvailability(e.target.value)} type='text' placeholder={book.availability} className="input" />
                                <h3 style={{ textDecoration: 'underline' }}>pages:</h3>
                                <input onChange={(e) => setUpgradedPages(e.target.value)} type='text' placeholder={book.pages} className="input" />
                                <h3 style={{ textDecoration: 'underline' }}>language:</h3>
                                <input onChange={(e) => setUpgradedLanguge(e.target.value)} type='text' placeholder={book.languages} className="input" />
                                <h3 style={{ textDecoration: 'underline' }}>summary:</h3>
                                <textarea rows='6' cols='50' onChange={(e) => setUpgradedSummary(e.target.value)} type='text' placeholder={book.summary} />
                                <button onClick={handleClick} className="button">submit</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h1>no books</h1>
                )}
            </div>
    )
}