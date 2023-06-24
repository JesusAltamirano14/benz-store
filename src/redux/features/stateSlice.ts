
import { initialData } from "@/database/products";
import { SeedProduct, ValidFilters, ValidGenders } from "@/types/product";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
    products:SeedProduct[],
    filter:{
        type : ValidFilters
    }
}

const initialState : StateType= {
    products:initialData.products,
    filter:{
        type:'all'
    }
}


const stateSlice = createSlice({
    name:'stateSlice',
    initialState,
    reducers:{
        changeFilter: (state,action: PayloadAction<ValidFilters>) => {
            state.filter.type = action.payload
        }
    }
})

export default stateSlice.reducer;
export const {changeFilter } = stateSlice.actions;