const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app=express();
app.use(express.json());
app.use(cors());

app.get('/api/products',(req,res)=>{
    const parameterspassed = req.query;
    console.log(parameterspassed);
    const searchItem = parameterspassed.searchitem;
    console.log(searchItem);
    const params = {
        api_key: process.env.REACT_APP_API_KEY,
        type: "search",
        amazon_domain: "amazon.in",
        search_term: searchItem
    }
    console.log(params);
    axios.get('https://api.rainforestapi.com/request', { params })
    .then(response => {
        return res.json(response.data);
    }).catch(error => {
        console.log(error);
    });
});

app.get('/api/product',(req,res)=>{
    const currparameterspassed = req.query;
    console.log(currparameterspassed);
    const reqasin = currparameterspassed.asin;
    const params = {
        api_key: process.env.REACT_APP_API_KEY,
        type: "product",
        amazon_domain: "amazon.in",
        asin: reqasin,
        currency: "inr"
    }
    console.log(params);
    axios.get('https://api.rainforestapi.com/request', { params })
    .then(response => {
        return res.json(response.data);
    }).catch(error => {
        console.log(error);
    });
});

app.listen(8000,()=>{
    console.log(`Server is listening on port ${PORT}`);
});
