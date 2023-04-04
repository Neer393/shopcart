import React,{useState,useEffect} from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping,faUser,faHeart,faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {Spin as Hamburger} from 'hamburger-react'
import Axios from 'axios';
import {useDispatch,useSelector} from 'react-redux';
import { productActions } from "../store/products";
import '../styles/Navbar.css';

export default function Navbar(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isloggedin = useSelector(state=>state.auth.isLoggedIn);
    const cartsize = useSelector(state=>state.cart.cartSize);
    const user = useSelector(state=>state.auth.username);
    const [isOpen, setOpen] = useState(false);
    const [isClicked,setIsClicked] = useState(false);
    const [width,setWidth] = useState(window.innerWidth);
    const [searchText,setSearchText] = useState("");
    let show=(width<=620 ? true : false);

    function handleSubmit(){
        setIsClicked((prev)=>!prev);
    }

    const filldata = async ()=>{
        dispatch(productActions.setUnsetSpinner(true));
        try{
            Axios.get(`http://localhost:8000/api/products?searchitem=${searchText}`).then((response)=>{
                console.log(response.data.search_results);
                dispatch(productActions.getProducts(response.data.search_results));
                dispatch(productActions.setUnsetSpinner(false));
            }).catch((error)=>{
                dispatch(productActions.setUnsetSpinner(false));
                console.log(error);
            })
        }
        catch(error){
            console.log(error);
            dispatch(productActions.setUnsetSpinner(false));
        }
    }

    useEffect(()=>{
        window.addEventListener('resize',()=>{
            setWidth(window.innerWidth);
            show=(width<=620 ? true : false);
        });
        return ()=>{
            window.removeEventListener('resize',()=>{
                setWidth(window.innerWidth);
                show=(width<=620 ? true : false);
            })
            if(!show){
                setOpen(false);
            }
        }
    },[width]);

    useEffect(()=>{
        if(searchText!==""){
            filldata();
            const params={
                searchproduct:searchText
            }
            navigate({
                pathname:'/products',
                search: `?${createSearchParams(params)}`
            });
        }
    },[isClicked]);
    
    return(
        <>
            <div className="nav-bar">
                <div className="logo-div">
                    <h2 style={{"color":"black","fontFamily":"Bebas Neue","cursor":"pointer","fontSize":"3rem"}}>SHOP</h2><h2 style={{"color":"#ff6600","fontFamily":"Bebas Neue","cursor":"pointer","fontSize":"3rem"}}>CART</h2>
                </div>
                <div className="search-box">
                    <input type="text" placeholder="Search for products..." value={searchText} className="txt-box" onChange={(e)=>{setSearchText(e.target.value)}} required></input>
                    <button onClick={handleSubmit} className="search-btn"><FontAwesomeIcon size="lg" icon={faMagnifyingGlass} /></button>
                    {!show && <div className="dabba">
                        <div className="user-class">
                            <FontAwesomeIcon icon={faUser} size="lg" style={{color: "#000000"}} />
                            Account
                        </div>
                        <div className="wishlist-class">
                            <FontAwesomeIcon icon={faHeart} size="lg" style={{color: "#ff0000",}} />
                            WishList
                        </div>
                        <div className="cart-class">
                            <FontAwesomeIcon icon={faCartShopping} size="lg" style={{color: "#000000",}} />
                            Cart
                        </div>
                    </div>}
                    {show && <Hamburger color="black" toggled={isOpen} className="hamburger-logo" size="25" rounded toggle={setOpen} />}
                    
                </div>
                
            </div>
            {isOpen && 
                <div className="dabba2">
                    <div className="user-class">
                        <FontAwesomeIcon icon={faUser} size="lg" style={{color: "#000000"}} />
                        Account
                    </div>
                    <div className="wishlist-class">
                        <FontAwesomeIcon icon={faHeart} size="lg" style={{color: "#ff0000",}} />
                        WishList
                    </div>
                    <div className="cart-class">
                        <FontAwesomeIcon icon={faCartShopping} size="lg" style={{color: "#000000",}} />
                        Cart
                    </div>
                </div>
            }
        </>    
    )
}