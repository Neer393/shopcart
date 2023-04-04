import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import '../styles/Card.css';

export default function Card(props){
    const alldata = props.allinfo;
    const navigate = useNavigate();
    function handleClick(){
        const params = {
            asin:alldata.asin
        }
        navigate({
            pathname:'/product',
            search:`?${createSearchParams(params)}`
        })
    }
    return(
        <div className='home-card' onClick={handleClick}>
            <img src={alldata.imageurl || alldata.image} alt = {alldata.title} className="card-img"></img>
            <div className="card-content">
                <h3>{alldata.title}</h3>
                <span><h2 style={{"display":"inline-block","marginTop":"0.7rem"}}>{alldata?.price?.raw}&nbsp;&nbsp;</h2>{alldata?.ogprice?.length>1 && <>M.R.P: <span style={{"textDecorationLine":"line-through"}}>{alldata?.ogprice[1]?.raw}</span></>}</span>
            </div>
        </div>
    )
}