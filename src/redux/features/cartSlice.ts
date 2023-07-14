import { productCart } from "@/types/cart";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface productsCartState{
    products:productCart[],
    animateCart:boolean
}

const initialState:productsCartState = {
    products:[],
    animateCart:false,
}


const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{

        addProductCart : (state,action:PayloadAction<productCart>) => {
            const existProduct = state.products.some((p)=>(p._id===action.payload._id));
            const existProductEqualSize = state.products.some((p)=>(p._id===action.payload._id && p.size ===action.payload.size));
            if(!existProduct){
                state.products = [...state.products,action.payload];
            }else{
                if(existProductEqualSize){
                    state.products = state.products.map((p)=>{
                        if(p._id === action.payload._id && p.size===action.payload.size){
                            return({
                                ...p,
                                quantity: p.quantity + action.payload.quantity
                            })
                        }
                        return p;
                    })
                }else{
                    state.products = [...state.products,action.payload]
                }
            }
        },
        deleteProductCart: (state,action:PayloadAction<productCart>) => {
            state.products = state.products.filter((p)=>!(p._id === action.payload._id && p.size===action.payload.size));
        },
        addOneQuantity: (state,action:PayloadAction<productCart>) => {
            state.products = state.products.map((p)=>{
                if(p._id === action.payload._id && p.size === action.payload.size){
                    return{
                        ...p,
                        quantity:p.quantity+1,
                    }
                }
                return p;
            })
        },
        removeOneQuantity: (state,action:PayloadAction<productCart>) => {
            state.products = state.products.map((p)=>{
                if(p._id === action.payload._id && p.size === action.payload.size){
                    return{
                        ...p,
                        quantity:p.quantity-1,
                    }
                }
                return p;
            })
        },
        emptyCart:(state) => {
            state.products = [];
        },
        activeAnimateCart: (state) => {
            state.animateCart=true;
        },
        disableAnimateCart: (state)=> {
            state.animateCart=false;
        }
    }
})

export default cartSlice.reducer;
export const {addProductCart,deleteProductCart,addOneQuantity,removeOneQuantity, emptyCart, activeAnimateCart,disableAnimateCart} = cartSlice.actions;