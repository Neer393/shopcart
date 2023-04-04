import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name:'products',
    initialState:{productsdata: [],showspinner:false},
    reducers:{
        getProducts(state,action){
            state.productsdata = action.payload;
        },
        setUnsetSpinner(state,actions){
            state.showspinner=actions.payload;
        }
    }
});
export const productActions = productsSlice.actions;
export default productsSlice;