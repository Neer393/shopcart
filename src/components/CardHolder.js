import React from "react";
import Card from "./Card";
import '../styles/CardHolder.css'

export default function CardHolder(props){
    const data = props.dataarr;
    const ishome = props.isHome;
    const classchoice = ((ishome===true) ? 'home-card-holder' : 'card-holder');
    return(
        <div className={classchoice}>
            {data.map(currproduct=>(
                <Card key={currproduct.position} title={currproduct.title} imageurl={currproduct.image} rating={currproduct.rating} totalratings={currproduct.ratings_total} ogprice={currproduct?.prices} price={currproduct.price} isHome={ishome}/>
            ))}
        </div>
    )
}