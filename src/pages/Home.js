import React,{useState,useEffect} from "react";
import '../styles/Home.css'
import Card from "../components/Card";
import CardHolder from "../components/CardHolder";
import mirrorlessdata from "../data/mirrorless_cameras";
import television_data from "../data/smart_television";
import smartphones_data from "../data/smartphones";
import laptops_data from "../data/traditional_laptops";

export default function Home(){

    const imagearr = ["trending1.jpg","trending2.jpg","trending3.jpg","trending4.jpg"];
    const [currIdx,setCurrIdx] = useState(0);
    const [currPage,setCurrPage] = useState(0);
    let dataarr = [];
    switch(currPage){
        case 0:
        dataarr = television_data;
        break;
        case 1:
        dataarr = smartphones_data;
        break;
        case 2:
        dataarr=laptops_data;
        break;
        case 3:
        dataarr=mirrorlessdata;
        break;
    }

    useEffect(()=>{
        setTimeout(()=>{
            setCurrIdx((prevCurrIdx)=>{
                if(prevCurrIdx == imagearr.length -1){
                    return 0;
                }
                else{
                    return prevCurrIdx+1;
                }
            })
        },5000);
    },[currIdx]);
    return(
        <div className="main-home-page">
            <div className="image-gallery">
                <img src={`/assets/${imagearr[currIdx]}`} className="gallery-img"></img>
            </div>
            <div className="btn-div">
                <button onClick={()=>{setCurrIdx(0)}} className={`switch-btn ${currIdx===0 ? 'active-class' : ' '}`}></button>
                <button onClick={()=>{setCurrIdx(1)}} className={`switch-btn ${currIdx===1 ? 'active-class' : ' '}`}></button>
                <button onClick={()=>{setCurrIdx(2)}} className={`switch-btn ${currIdx===2 ? 'active-class' : ' '}`}></button>
                <button onClick={()=>{setCurrIdx(3)}} className={`switch-btn ${currIdx===3 ? 'active-class' : ' '}`}></button>
            </div>
            <div className="collections">
                <button className={`category-btn ${currPage===0 ? 'active-class2' : 'bg'}`} onClick={()=>{setCurrPage(0)}}>Television</button>
                <button className={`category-btn ${currPage===1 ? 'active-class2' : 'bg'}`} onClick={()=>{setCurrPage(1)}}>Smartphones</button>
                <button className={`category-btn ${currPage===2 ? 'active-class2' : 'bg'}`} onClick={()=>{setCurrPage(2)}}>Laptops</button>
                <button className={`category-btn ${currPage===3 ? 'active-class2' : 'bg'}`} onClick={()=>{setCurrPage(3)}}>Cameras</button>
            </div>
            <div className="products-holder">
                {dataarr.map(currproduct=>(
                    <Card key={currproduct.position} allinfo={currproduct}/>
                ))}
            </div>
            {/* <CardHolder key="1" dataarr={television_data} isHome={true} />
            <CardHolder key="2" dataarr={smartphones_data} isHome={true} />
            <CardHolder key="3" dataarr={laptops_data} isHome={true} />
            <CardHolder key="4" dataarr={mirrorlessdata} isHome={true} /> */}
        </div>
    )
}