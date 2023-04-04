import React, { useState,useEffect } from "react";
import Axios from 'axios';
import '../styles/Product.css';
import Spinner from '../components/Spinner.js';
import { createSearchParams,useNavigate } from "react-router-dom";

export default function Product(){
    const queryParameters = new URLSearchParams(window.location.search);
    const navigate=useNavigate();
    const asin = queryParameters.get("asin");
    const [showSpinner,setShowSpinner] = useState(true);//Change this to true
    const [currIdx,setCurrIdx] = useState(0);
    const [showRatings,setShowRatings] = useState(false);
    const [data,setData] = useState({});
    let imgarr=[];
    let idx=0;
    let floorrating = Math.floor(data?.rating);
    let off = Math.round(((data?.buybox_winner?.rrp?.value - data?.buybox_winner?.price?.value)/(data?.buybox_winner?.rrp?.value))*100);

    function chooseVariant(variant_asin){
        const params = {
            asin:variant_asin
        }
        navigate({
            pathname:'/product',
            search:`?${createSearchParams(params)}`
        })
    }

    function DecideImgOrVideo(){
        console.log(currIdx);
        if(currIdx<=data?.images_count-1){
            console.log("Image url : ",imgarr[currIdx]);
            return (<img src={imgarr[currIdx]} alt="Image" className="custom-img"></img>);
        }
        else{
            console.log("Video url : ",imgarr[currIdx]);
            return (
            <video className="custom-img" controls autoPlay>
                <source src={imgarr[currIdx]} type="video/mp4"></source>
            </video>
          )
        }
    }

    useEffect(()=>{
        setShowSpinner(true);
        try{
            Axios.get(`http://localhost:8000/api/product?asin=${asin}`).then((response)=>{
                console.log(response.data.product);
                setData(response.data.product);
                setShowSpinner(false);
            }).catch((error)=>{
                console.log(error);
                setShowSpinner(false);
            })
        }
        catch(error){
            console.log(error);
            setShowSpinner(false);
        }
    },[new URLSearchParams(window.location.search).get("asin")])
    return(
        <div>
            {showSpinner ? <Spinner/> : <div className="specific-product-holder">
                <p className="categories">{data?.categories_flat}</p>
                <div className="main-div">
                    <div className="allimg-holder">
                        {data?.images?.map((currimg)=>{
                            const myjsx = (<img key={idx} diffkey={idx} src={currimg.link} alt="" onClick={(e)=>{setCurrIdx(e.target.getAttribute("diffkey"))}} className="display-img"></img>)
                            idx++;
                            imgarr.push(currimg.link);
                            return myjsx;
                        })}
                        {data?.videos?.map((currvideo)=>{
                            const myjsx = (<img key={idx} diffkey={idx} src={currvideo.thumbnail} alt="" onClick={(e)=>{setCurrIdx(e.target.getAttribute("diffkey"))}} className="display-img"></img>)
                            idx++;
                            imgarr.push(currvideo.link);
                            return myjsx;
                        })}
                    </div>
                    <div className="iframe-holder">
                        <DecideImgOrVideo />
                    </div>
                    <div className="product-details-holder">
                        <h2>{(data?.title_excluding_variant_name)||(data?.title)}</h2>
                        <i className={`a-icon a-icon-star ${floorrating===data?.rating ? `a-star-${floorrating}` : `a-star-${floorrating}-${floorrating+1}`}`} ></i>
                        <i className="a-icon a-icon-popover" onClick={()=>{setShowRatings(true)}}></i>
                        {showRatings && <div className="ratings-div">
                            <span><i className={`a-icon a-icon-star ${floorrating===data.rating ? `a-star-${floorrating}` : `a-star-${floorrating}-${floorrating+1}`}`} ></i>&nbsp;<h3>{data.rating} out of 5</h3></span>
                            <p>{data?.ratings_total} global ratings</p>
                            <div className="individual-rating">
                                5 Star&nbsp;<div style={{"width":"100px","height":"10px","background":`linear-gradient(to right,black ${data?.rating_breakdown?.five_star?.percentage}%,white 50%)`}}></div>&nbsp;{data?.rating_breakdown?.five_star?.percentage}%
                            </div>
                            <div className="individual-rating">
                                4 Star&nbsp;<div style={{"width":"100px","height":"10px","background":`linear-gradient(to right,black ${data?.rating_breakdown?.four_star?.percentage}%,white 50%)`}}></div>&nbsp;{data?.rating_breakdown?.four_star?.percentage}%
                            </div>
                            <div className="individual-rating">
                                3 Star&nbsp;<div style={{"width":"100px","height":"10px","background":`linear-gradient(to right,black ${data?.rating_breakdown?.three_star?.percentage}%,white 50%)`}}></div>&nbsp;{data?.rating_breakdown?.three_star?.percentage}%
                            </div>
                            <div className="individual-rating">
                                2 Star&nbsp;<div style={{"width":"100px","height":"10px","background":`linear-gradient(to right,black ${data?.rating_breakdown?.two_star?.percentage}%,white 50%)`}}></div>&nbsp;{data?.rating_breakdown?.two_star?.percentage}%
                            </div>
                            <div className="individual-rating">
                                1 Star&nbsp;<div style={{"width":"100px","height":"10px","background":`linear-gradient(to right,black ${data?.rating_breakdown?.one_star?.percentage}%,white 50%)`}}></div>&nbsp;{data?.rating_breakdown?.one_star?.percentage}%
                            </div>
                        </div>}
                        <h4 style={{"color":"red","lineHeight":"200%"}}>{data?.buybox_winner?.deal?.with_deal?.raw}</h4>
                        <span style={{"display":"flex"}}><h2 style={{"color":"red"}}>-{off}%</h2><sup style={{"marginLeft":"0.5rem"}}><h2>{data?.buybox_winner?.price?.symbol}</h2></sup><h2>{data?.buybox_winner?.price?.value}</h2></span>
                        <p>M.R.P.:&nbsp;<strike>{data?.buybox_winner?.rrp?.raw}</strike></p>
                        <p style={{"lineHeight":"150%"}}>Inclusive of all taxes</p>
                        <hr></hr>
                        {data?.buying_options && <><div className="buying-options">
                                    {data?.buying_options?.map((currbuyingoption)=>
                                        (<div key={currbuyingoption?.title} className="buying-options-dabba"><img src={currbuyingoption?.image} alt="" style={{"marginBottom":"0.3rem","width":"45px","height":"45px"}}></img><span>{currbuyingoption?.title}</span></div>)
                                    )}
                                </div>
                            <hr style={{"marginTop":"0.5rem","marginBottom":"0.5rem"}}></hr>
                        </>
                        }
                        <div className="variants-holder">
                            {data?.variants?.map((currvariant)=>
                                (<button key={currvariant.asin} newasin={currvariant.asin} className={`variant-btn ${currvariant.asin===asin ? 'active-btn' : ''}`} onClick={(e)=>{chooseVariant(e.target.getAttribute("newasin"))}}>{currvariant?.title}</button>)
                            )}
                        </div>
                        <div className="purchase-item">
                            <button style={{"padding":"8px 20px","borderRadius":"20px","borderStyle":"none","backgroundColor":"yellow","fontSize":"1.03rem","marginRight":"0.5rem","marginBottom":"0.5rem"}}>Add to Cart</button>
                            <button style={{"padding":"8px 20px","borderRadius":"20px","borderStyle":"none","backgroundColor":"orange","fontSize":"1.03rem","marginRight":"0.5rem","marginBottom":"0.5rem"}}>Buy Now</button>
                            <button style={{"padding":"8px 20px","borderRadius":"20px","borderStyle":"none","backgroundColor":"pink","fontSize":"1.03rem","marginRight":"0.5rem","marginBottom":"0.5rem"}}>Add to Wishlist</button>
                        </div>
                        <div className="properties-holder">
                            <table>
                                <tbody>
                                    {data?.attributes?.map((currattribute)=>
                                        (<tr key={currattribute?.name} style={{"lineHeight":"110%"}}>
                                            <td style={{"maxWidth":"150px"}}>{currattribute?.name}</td>
                                            <td>{currattribute?.value}</td>
                                        </tr>)
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="about-item">
                            <h2>About this item</h2>
                            <ul className="ul-list">
                                {data?.feature_bullets?.map((currfeature)=>
                                    (<li key={currfeature} >{currfeature}</li>)
                                )}
                            </ul>
                        </div>
                        <hr style={{"margin":"0.5rem 0"}}></hr>
                        {data?.whats_in_the_box && <div className="box-details">
                            <h2>What is in the box?</h2>
                            <ul>
                                {data?.whats_in_the_box?.map((curritem)=>
                                    (<li key={data?.whats_in_the_box.indexOf(curritem)}>{curritem}</li>)
                                )}
                            </ul>
                            <hr style={{"margin":"0.5rem 0"}}></hr>
                        </div>}
                    </div>
                </div>
                
                <div className="technical-details">
                    <div className="innerdiv">
                        <h3 style={{"marginBottom":"0.3rem"}}>Technical Details</h3>
                        <table>
                            <tbody>
                                {data?.specifications?.map((currspecs)=>{
                                    if(data.specifications.indexOf(currspecs)<(data.specifications.length/2)){
                                        return (<tr key={`${currspecs?.name} ${Math.random()}`} >
                                        <td style={{"backgroundColor":"whitesmoke","borderTop":"1.5px solid lightgrey","marginRight":"0","fontWeight":"600","maxWidth":"150px"}}>{currspecs?.name}</td>
                                        <td style={{"borderTop":"1.5px solid lightgrey"}} colSpan="2">{currspecs?.value}</td>
                                    </tr>)
                                    }
                                    else    return <></>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="innerdiv">
                        <h3 style={{"marginBottom":"0.3rem"}}>Additional Details</h3>
                        <table>
                            <tbody>
                                {data?.specifications?.map((currspecs)=>{
                                    if(data.specifications.indexOf(currspecs)>=(data.specifications.length/2)){
                                        return (<tr key={`${currspecs?.name} ${Math.random()}`} >
                                            <td style={{"backgroundColor":"whitesmoke","borderTop":"1.5px solid lightgrey","marginRight":"0","fontWeight":"600","maxWidth":"150px"}}>{currspecs?.name}</td>
                                            <td style={{"borderTop":"1.5px solid lightgrey"}} colSpan="2">{currspecs?.value}</td>
                                        </tr>)
                                    }
                                    else    return <></>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>}
        </div>
    )
}