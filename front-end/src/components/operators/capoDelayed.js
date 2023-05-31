import React, { useState, useEffect } from 'react';
import '../../css/mycss.css'

export default function CapoDelayed({ schoolid }) {
    const [submit, setSubmit] = useState(false);
    const [name, setName] = useState();
    const [days, setDays] = useState();
    return (
        <div>
            {!submit && <div className='container' style={{ position: "relative", top: '100px' }}>
                <h1>see the delayers_3.2.2</h1>
                <input className='input' onChange={(e) => setName(e.target.value)} placeholder='name' />
                <input className='input' onChange={(e) => setDays(e.target.value)} placeholder='days of delayed' />
                <button onClick={() => setSubmit(true)} className='button'>submit</button>
            </div>}
            {submit &&
                <div className='container'>
                    <Query name={name} days={days} />
                </div>
            }
        </div>
    )
}

function Query({ name, days }) {
    const [q, setQ] = useState();
    async function fetchData(url) {
        var json = await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        if (days == undefined) {
            var n = encodeURIComponent(name);
            async function getData() {
                const data = await fetchData(`http://localhost:9103/322_1/${n}`)
                console.log(data)
                setQ(data);
            }
            getData();
        }
        else if (name == undefined) {
            async function getData() {
                const data = await fetchData(`http://localhost:9103/322_2/${days}`)
                //console.log(json)
                setQ(data);
            }
            getData();
        }
        else {
            async function getData() {
                var n = encodeURIComponent(name);
                const data = await fetchData(`http://localhost:9103/322_3/${n}/${days}`)
                console.log(data)
                setQ(data);
            }
            getData();
        }
    }, [])
    if (name == undefined) {
        return (
            <div>
                {q?.length > 0 ? (
                    <div className='container'>
                        {q[0]?.map((qie) => (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h3 style={{ marginRight: '10px', textDecoration: 'underline' }}>name:</h3>
                                <p style={{ margin: 0 }}>{qie.fullname}</p>
                            </div>
                        ))}
                    </div>) : (
                    <h1>wait</h1>
                )}
            </div>
        )
    }
    else if (days == undefined) {
        return (
            <div>
                {q?.length > 0 ? (
                    <div className='container'>
                        {q[0]?.map((qie) => (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h3 style={{ marginRight: '10px', textDecoration: 'underline' }}>days of delay:</h3>
                                <p style={{ margin: 0 }}>{qie.days}</p>

                            </div>
                        ))}
                    </div>) : (
                    <h1>wait</h1>
                )}
            </div>
        )
    }
    else {
        return (
            <div>
                {q?.length > 0 ? (
                    <div className='container'>
                        {q[0]?.map((qie) => (
                            <div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h3 style={{ marginRight: '10px', textDecoration: 'underline' }}>days of delay:</h3>
                                <p style={{ margin: 0 }}>{qie.days}</p>
                            </div>
                        </div>))}
                        {q[2]?.map((qie2) => (
                            <div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h3 style={{ marginRight: '10px', textDecoration: 'underline' }}>username:</h3>
                            <p style={{ margin: 0 }}>{qie2.fullname}</p>
                        </div>
                        </div>))}
                    </div>) : (
                    <h1>wait</h1>
                )}
            </div>
        )
    }

}