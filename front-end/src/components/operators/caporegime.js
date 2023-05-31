import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import CapoNavBar from "./capoNavbar";
import Capobooks from "./capoBooks";
import CapoRequests from "./capoRequest";
import CapoMkBorrow from "./capoMakeborrow";
import CapoUsers from "./capoUsers";
import CapoReviews from "./capoReviews";
import CapoDelayed from "./capoDelayed";
import '../../css/mycss.css' 
import CapoReserve from "./capoReserve";
import CapoReturn from "./capoReturn";

export default function Caporegime() {
    const params=useParams();
    const [seebook,setSeebook]=useState(false);
    const [seeusers,setSeeusers]=useState(false);
    const [seerequests,setSeerequests]=useState(false);
    const [seemakeborrow,setSeemakeborrow]=useState(false);
    const [seereservations,setSeereservations]=useState(false);
    const [seereturn,setSeereturn]=useState(false);
    const [seeborrowed,setSeeborrowed]=useState(false);
    const [seereviews,setSeereviews]=useState(false);
    const [schoolid,setSchoolid]=useState([]);
    async function fetchData(url) {
        var json = await fetch(url).then((response) => response.json());
        return json;
    }
    useEffect(() => {
        async function getData() {
            const data = await fetchData(`http://localhost:9103/getoperator/${params.username}`)
            setSchoolid(data);
        }
        getData();
    }, [])
    function handleChangeValues(value1,value2,value3,value4,value5,value6,value7,value8){
        setSeebook(value1);
        setSeeusers(value2);
        setSeerequests(value3);
        setSeemakeborrow(value4);
        setSeereservations(value5);
        setSeeborrowed(value6);
        setSeereviews(value7);
        setSeereturn(value8);
    }
    return(
        <div>
            {schoolid?.length>0 ? (
        <div>
            <CapoNavBar changeValues={handleChangeValues}/>
            {!seebook && !seeborrowed && !seemakeborrow && !seereturn && !seerequests && !seereservations && !seereviews && !seeusers && 
             <div className="container" style={{position:'relative',top:'180px'}}>
             <h1 style={{color:"purple"}}>welcome</h1>
             <button className="button" style={{background:"#9b5a5a"}} onClick={()=>window.location.href='http://localhost:3000'}>log out</button>
             </div>
            }
            {seebook && !seeborrowed && !seemakeborrow && !seerequests && !seereservations && !seereviews && !seeusers && 
            <Capobooks/>
            }
            {!seebook && seeborrowed && !seemakeborrow && !seerequests && !seereservations && !seereviews && !seeusers &&
            <CapoDelayed/>
            }
            {!seebook && !seeborrowed && seemakeborrow && !seerequests && !seereservations && !seereviews && !seeusers &&
            <CapoMkBorrow schoolid={schoolid[0].schoolID}/>
            }
            {!seebook && !seeborrowed && !seemakeborrow && seerequests && !seereservations && !seereviews && !seeusers &&
            <CapoRequests schoolid={schoolid[0].schoolID}/>
            }
            {!seebook && !seeborrowed && !seemakeborrow && !seerequests && seereservations && !seereviews && !seeusers &&
            <CapoReserve schoolid={schoolid[0].schoolID}/>
            }
            {!seebook && !seeborrowed && !seemakeborrow && !seerequests && !seereservations && seereviews && !seeusers &&
            <CapoReviews schoolid={schoolid[0].schoolID}/>
            }
            {!seebook && !seeborrowed && !seemakeborrow && !seerequests && !seereservations && !seereviews && seeusers &&
            <CapoUsers schoolid={schoolid[0].schoolID}/>
            }
            {seereturn &&
            <CapoReturn/>
            }
        </div>):(
            <h1>wait</h1>
        )}
        </div>
    )
}