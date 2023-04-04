import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartSize:0,
        products:[]
    },
    reducers:{
        addItem(state,action){
            const newItem = action.payload;
            const id = parseInt(newItem.id);
            const check = state.products.find((product)=> product.id === id);
            if(check){
                check.quantity++;
                check.totalPrice +=check.price;
            }
            else{
                state.products.push({
                    id:newItem.id,
                    price:newItem.id,
                    quantity:1,
                    totalPrice:newItem.price,
                    name:newItem.name
                });
                state.cartSize++;
            }
        },
        removeItem(state,action){
            const id = action.payload;
            const check = state.products.find((product)=>product.id === id);
            if(check.quantity==1){
                state.products.filter((product)=> product.id !== id);
                state.cartSize--;
            }
            else{
                check.quantity--;
                check.totalPrice-=check.price;
            }
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;