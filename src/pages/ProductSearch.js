import React from "react";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import '../styles/ProductSearch.css';

import { useSelector } from "react-redux";

export default function ProductSearch(){
    const fetcheddata = useSelector(state=>state.products.productsdata);
    const show = useSelector(state=>state.products.showspinner);
    console.log(show);
    console.log("fetcheddata : ",fetcheddata);
    return(
        <>
            {show ? <Spinner/> : <div className="products-holder">
                {fetcheddata.map(currproduct=>(
                    <Card key={currproduct.position} allinfo={currproduct} />
                ))}
            </div>}
        </>
    )
}