import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import BossNavBar from "./bossNavBar";
import '../../css/mycss.css'
import BossAddSchool from "./bossAddSchool";
import BossAddOperator from './bossAddOperator'
import DeleteOperator from "./deleteOperator";

export default function TheBoss() {
    const [addSchool, setAddSchool] = useState();
    const [addOperator, setAddOperator] = useState();
    const [deleteoperator, setDeleteOperator] = useState();
    const [query311, setQuery311] = useState(false);
    const [query312, setQuery312] = useState(false);
    const [query313, setQuery313] = useState(false);
    const [query314, setQuery314] = useState(false);
    const [query315, setQuery315] = useState(false);
    const [query316, setQuery316] = useState(false);
    const [query317, setQuery317] = useState(false);
    const [successBackUp, setSuccessBackUp] = useState(false);
    const [successRestore, setSuccessRestore] = useState(false);
    const handleChangeValues = (newvalue1, newvalue2, newvalue3) => {
        setAddSchool(newvalue1);
        setAddOperator(newvalue2);
        setDeleteOperator(newvalue3);
    }
    async function handlClick1() {
        const data = await fetch(`http://localhost:9103/backup`).then((response) => response.json());
        console.log(data.message)
        if (data.message == 'Database backup created') {
            setSuccessBackUp(true);
        }
    }
    async function handlClick2() {
        const data = await fetch(`http://localhost:9103/backup`).then((response) => response.json());
        if (data.message == 'Database restored') {
            setSuccessRestore(true);
        }
    }
    return (
        <div>
            <BossNavBar changeValues={handleChangeValues} />
            {!addOperator && !addSchool && !deleteoperator && !query311 && !query312 && !query313 && !query314 && !query315 && !query316 && !query317 &&
                <div className="container" style={{ position: 'relative', top: '100px' }}>
                    <button onClick={() => setQuery311(true)} className="button">311</button>
                    <button onClick={() => setQuery312(true)} className="button">312</button>
                    <button onClick={() => setQuery313(true)} className="button">313</button>
                    <button onClick={() => setQuery314(true)} className="button">314</button>
                    <button onClick={() => setQuery315(true)} className="button">315</button>
                    <button className="button" onClick={() => setQuery316(true)}>316</button>
                    <button onClick={() => setQuery317(true)} className="button">317</button>
                    <button onClick={handlClick1} className="button">back up</button>
                    <button onClick={handlClick2} className="button">restore</button>
                    <button className="button" style={{ background: "#9b5a5a" }} onClick={() => window.location.href = 'http://localhost:3000'}>log out</button>
                </div>
            }
            {successBackUp &&
                <div className='container'>
                    <div className="form" style={{ backgroundColor: "purple" }}>
                        <h1>backed it up</h1>
                        <button onClick={() => setSuccessBackUp(false)} className='button'>ok</button>
                    </div>
                </div>
            }
            {successRestore &&
                <div className='container'>
                    <div className="form" style={{ backgroundColor: "purple" }}>
                        <h1>restored it</h1>
                        <button onClick={() => setSuccessRestore(false)} className='button'>ok</button>
                    </div>
                </div>
            }
            {deleteoperator && 
                <DeleteOperator/>
            }
            {addSchool &&
                <BossAddSchool />
            }
            {addOperator &&
                <BossAddOperator />
            }
            {query311 && !addOperator && !addSchool && !deleteoperator &&
                <Q311 />
            }
            {query312 && !addOperator && !addSchool && !deleteoperator &&
                <Q312 />
            }
            {query313 && !addOperator && !addSchool && !deleteoperator &&
                <Q313 />
            }
            {query314 && !addOperator && !addSchool && !deleteoperator &&
                <Q314 />
            }
            {query315 && !addOperator && !addSchool && !deleteoperator &&
                <Q315 />
            }
            {query316 && !addOperator && !addSchool && !deleteoperator &&
                <Q316 />
            }
            {query317 && !addOperator && !addSchool && !deleteoperator &&
                <Q317 />
            }
        </div>
    )
}
function Q311() {
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [r311, setR311] = useState(false);
    return (
        <div>
            {!r311 &&
                <div className="container" style={{ position: 'relative', top: '150px' }}>
                    <h1>query 3.1.1</h1>
                    <input type='text' className="input" onChange={(e) => setMonth(e.target.value)} placeholder="month:mm" />
                    <input type='text' className="input" onChange={(e) => setYear(e.target.value)} placeholder="year:yyyy" />
                    <button onClick={() => setR311(true)} className="button">submit</button>
                </div>}
            {r311 &&
                <Result311 month={month} year={year} />
            }
        </div>
    )
}

function Result311({ month, year }) {
    const [result, setResult] = useState();
    async function fetchData(url) {
        var json = await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
            const data = await fetchData(`http://localhost:9103/311/${month}/${year}`)
            console.log(data.length)
            setResult(data);
        }
        getData();
    }, [])
    return (
        <div className="container">
            {result?.length > 0 ? (
                <div>
                    {result[0]?.map((res) =>
                        <div className="container" style={{ borderStyle: 'dotted', borderColor: 'purple' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <h3 style={{ textDecoration: 'underline', marginRight: '10px' }}>borrow date:</h3>
                                <p>{res.borrorMonth}/{res.borrorYear}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <h3 style={{ textDecoration: 'underline', marginRight: '10px' }}>school name:</h3>
                                <p>{res.schoolNAME}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <h3 style={{ textDecoration: 'underline', marginRight: '10px' }}>borrows number:</h3>
                                <p>{res.borrowNum}</p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <h1>nothing</h1>
            )}
        </div>
    )
}

function Q312() {
    const [select, setSelect] = useState();
    const [r312A, setR312A] = useState(false);
    const [r312B, setR312B] = useState(false);
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
    return (
        <div>
            {!r312A && !r312B && categories?.length > 0 &&
                <div className="container" style={{ position: 'relative', top: '150px' }}>
                    <h1>query 3.1.2</h1>
                    <select value={select} onChange={(e) => setSelect(e.target.value)} className="button">
                        <option>select</option>
                        {categories?.map((category) => (
                            <option value={category.category}>{category.category}</option>
                        ))}
                    </select>
                    <button onClick={() => setR312A(true)} className="button">authors</button>
                    <button onClick={() => setR312B(true)} className="button">teachers</button>
                </div>}
            {r312A &&
                <Result312A category={select} />
            }
            {r312B &&
                <Result312B category={select} />
            }
        </div>
    )
}

function Result312A({ category }) {
    const [result, setResult] = useState();
    async function fetchData(url) {
        var json = await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
            const data = await fetchData(`http://localhost:9103/312A/${category}`)
            console.log(data.length)
            setResult(data);
        }
        getData();
    }, [])
    return (
        <div className="container">
            {result?.length > 0 ? (
                <div>
                    {result[0]?.map((res) =>
                        <div className="container" style={{ borderStyle: 'dotted', borderColor: 'purple' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <h3 style={{ textDecoration: 'underline', marginRight: '10px' }}>Author Name:</h3>
                                <p>{res.authorName}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <h3 style={{ textDecoration: 'underline', marginRight: '10px' }}>category:</h3>
                                <p>{res.category}</p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <h1>nothing</h1>
            )}
        </div>
    )
}

function Result312B({ category }) {
    const [result, setResult] = useState();
    async function fetchData(url) {
        var json = await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
            const data = await fetchData(`http://localhost:9103/312B/${category}`)
            console.log(data.length)
            setResult(data);
        }
        getData();
    }, [])
    return (
        <div className="container">
            {result?.length > 0 ? (
                <div>
                    {result[0]?.map((res) =>
                        <div className="container" style={{ borderStyle: 'dotted', borderColor: 'purple' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <h3 style={{ textDecoration: 'underline', marginRight: '10px' }}>Teacher Name:</h3>
                                <p>{res.username}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <h3 style={{ textDecoration: 'underline', marginRight: '10px' }}>category:</h3>
                                <p>{res.category}</p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <h1>nothing</h1>
            )}
        </div>
    )
}

function Q316() {
    const [result, setResult] = useState();
    async function fetchData(url) {
        var json = await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
            const data = await fetchData(`http://localhost:9103/316`)
            console.log(data.length)
            setResult(data);
        }
        getData();
    }, [])
    return (
        <div className="container">
            {result?.length > 0 ? (
                <div className="container">
                    <h1>query 3.1.6</h1>
                    {result?.map((res) =>
                        <div className="container" style={{ borderStyle: 'dotted', borderColor: 'purple' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <h3 style={{ textDecoration: 'underline', marginRight: '10px' }}>category 1:</h3>
                                <p>{res.ca}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <h3 style={{ textDecoration: 'underline', marginRight: '10px' }}>category 2:</h3>
                                <p>{res.cb}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <h3 style={{ textDecoration: 'underline', marginRight: '10px' }}>number of books:</h3>
                                <p>{res.count}</p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <h1>nothing</h1>
            )}
        </div>
    )
}

function Q313() {
    const [result, setResult] = useState();
    async function fetchData(url) {
        var json = await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
            const data = await fetchData(`http://localhost:9103/313`)
            console.log(data.length)
            setResult(data);
        }
        getData();
    }, [])
    return (
        <div className="container">
            {result?.length > 0 ? (
                <div className="container">
                    <h1>query 3.1.3</h1>
                    {result?.map((res) =>
                        <div className="container" style={{ borderStyle: 'dotted', borderColor: 'purple' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <h3 style={{ textDecoration: 'underline', marginRight: '10px' }}>teachers username:</h3>
                                <p>{res.named}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <h3 style={{ textDecoration: 'underline', marginRight: '10px' }}>birthdate:</h3>
                                <p>{res.birthdate}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <h3 style={{ textDecoration: 'underline', marginRight: '10px' }}>number of borrows:</h3>
                                <p>{res.numBorrows}</p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <h1>nothing</h1>
            )}
        </div>
    )
}

function Q314() {
    const [result, setResult] = useState();
    async function fetchData(url) {
        var json = await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
            const data = await fetchData(`http://localhost:9103/314`)
            console.log(data.length)
            setResult(data);
        }
        getData();
    }, [])
    return (
        <div className="container">
            {result?.length > 0 ? (
                <div className="container">
                    <h1>the authors who have not borrowed a book</h1>
                    {result?.map((res) =>
                        <div className="container">
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <h3 style={{ textDecoration: 'underline', marginRight: '10px' }}>author's name:</h3>
                                <p>{res.authorName}</p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <h1>nothing</h1>
            )}
        </div>
    )
}

function Q315() {
    const [result, setResult] = useState();
    async function fetchData(url) {
        var json = await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
            const data = await fetchData(`http://localhost:9103/315`)
            console.log(data.length)
            setResult(data);
        }
        getData();
    }, [])
    return (
        <div className="container">
            {result?.length > 0 ? (
                <div className="container">
                    <h1>query 3.1.5</h1>
                    {result?.map((res) =>
                        <div className="container" style={{ borderStyle: 'dotted', borderColor: 'purple' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <h3 style={{ textDecoration: 'underline', marginRight: '10px' }}>name:</h3>
                                <p>{res.fullname}</p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <h1>nothing</h1>
            )}
        </div>
    )
}

function Q317() {
    const [result, setResult] = useState();
    async function fetchData(url) {
        var json = await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
            const data = await fetchData(`http://localhost:9103/317`)
            console.log(data.length)
            setResult(data);
        }
        getData();
    }, [])
    return (
        <div className="container">
            {result?.length > 0 ? (
                <div className="container">
                    <h1>query 3.1.7</h1>
                    {result?.map((res) =>
                        <div className="container">
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <h3 style={{ textDecoration: 'underline', marginRight: '10px' }}>name:</h3>
                                <p>{res.authorName}</p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <h1>nothing</h1>
            )}
        </div>
    )
}