import React from "react";
import '../styles/Spinner.css';

export default function Spinner(){
    return (
        <div className="temp">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}