import React, { useEffect, useState } from 'react';
import '../../css/mycss.css'
import { useParams } from 'react-router-dom';

export default function CapoReviews(schoolid) {
    const params = useParams();
    const [viewquery, setViewquery] = useState(false);
    const [query, setQuery] = useState(false);
    const [viewreviews, setViewreviews] = useState(false);
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [requests, setRequests] = useState();
    const [successApprove, setSuccessApprove] = useState(false);
    async function fetchData(url) {
        var json = await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
            const data = await fetchData(`http://localhost:9103/reviewReq`)
            //console.log(json)
            setRequests(data);
        }
        getData();
    }, [])
    function handleClick() {
        setQuery(false);
        setViewquery(true);
    }
    async function handleClick2(ratingID) {
        const data1 = await fetchData(`http://localhost:9103/getoperatorid/${params.username}`);
        const data2 = await fetch(`http://localhost:9103/approveRating/${data1[0].operatorid}/${ratingID}`, {
            method: 'Post',
            headers: { 'Content-Type': 'application/json' }
        }).catch((e) => { console.log(e.message) })
        if (data2.status == 200) {
            setSuccessApprove(true);
        }
    }
    return (
        <div>
            {!query && !viewreviews && !viewquery &&
                <div className='container' style={{ position: "relative", top: "160px" }}>
                    <button onClick={() => setQuery(true)} className='button'>3.2.3</button>
                    <button onClick={() => setViewreviews(true)} className='button'>review requests</button>
                </div>}
            {query &&
                <div className='container' style={{ position: "relative", top: "160px" }}>
                    <input className='input' onChange={(e) => setName(e.target.value)} type='text' placeholder='username' />
                    <input className='input' onChange={(e) => setCategory(e.target.value)} type='text' placeholder='category' />
                    <button className='button' onClick={handleClick}>submit</button>
                </div>
            }
            {viewquery && <Query name={name} category={category} />}
            {viewreviews &&
                <div>
                    {requests?.length > 0 ? (
                        <div className='container'>
                            {requests?.map((request) => (
                                <div className='container' style={{ borderStyle: "dotted", borderColor: "purple" }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <h3 style={{ textDecoration: 'underline', marginRight: '10px' }}>book title:</h3>
                                        <p>{request.title}</p>
                                    </div>
                                    <h3 style={{ textDecoration: 'underline' }}>review text:</h3>
                                    <p>{request.texts}</p>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <h3 style={{ textDecoration: 'underline', marginRight: '10px' }}>likert score:</h3>
                                        <p>{request.likert}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <h3 style={{ textDecoration: 'underline', marginRight: '10px' }}>the fella who did it:</h3>
                                        <p>{request.username}</p>
                                    </div>
                                    <button onClick={handleClick2.bind(null, request.ratingID)} className='button'>approve</button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h1>no requests</h1>
                    )}
                </div>
            }
            {successApprove &&
                <div className='container'>
                    <div className='form'>
                        <h1>success approve</h1>
                        <button onClick={() => { setSuccessApprove(false); window.location.reload() }} className='button'>ok</button>
                    </div>
                </div>
            }
        </div>
    )
}

function Query({ name, category }) {
    const [avg, setAvg] = useState();
    async function fetchData(url) {
        var json = await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
            const data = await fetchData(`http://localhost:9103/323/${name}/${category}`)
            console.log(data)
            setAvg(data);
        }
        getData();
    }, [])
    if (name == undefined) {
        return (
            <div className='container'>
                {avg?.length > 0 ? (
                    <div className='conatiner'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h3 style={{ marginRight: '10px', textDecoration: 'underline' }}>mo:</h3>
                            <p style={{ margin: 0 }}>{avg[1][0].arg}</p>
                        </div>
                    </div>
                ) : (
                    <h1>wait</h1>
                )}
            </div>
        )
    }
    else if (category == undefined) {
        return (
            <div className='container'>
                {avg?.length > 0 ? (
                    <div className='conatiner'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h3 style={{ marginRight: '10px', textDecoration: 'underline' }}>mo:</h3>
                            <p style={{ margin: 0 }}>{avg[1][0].arg}</p>
                        </div>
                    </div>
                ) : (
                    <h1>wait</h1>
                )}
            </div>
        )
    }
    else {
        return (
            <div className='container'>
                {avg?.length > 0 ? (
                    <div className='conatiner'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h3 style={{ marginRight: '10px', textDecoration: 'underline' }}>mo:</h3>
                            <p style={{ margin: 0 }}>{avg[1][0].arg}</p>
                        </div>
                    </div>
                ) : (
                    <h1>wait</h1>
                )}
            </div>
        )
    }
}