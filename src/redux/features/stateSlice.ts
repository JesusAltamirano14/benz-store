
import {ValidFilters} from "@/types/product";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
    filter:{
        type : ValidFilters
    },
    search:string
}

const initialState : StateType= {
    filter:{
        type:'all'
    },
    search:''
}


const stateSlice = createSlice({
    name:'stateSlice',
    initialState,
    reducers:{
        changeFilter: (state,action: PayloadAction<ValidFilters>) => {
            state.filter.type = action.payload
        },
        changeSearch : (state,action:PayloadAction<string>) => {
            state.search = action.payload
        }
    }
})

export default stateSlice.reducer;
export const {changeFilter, changeSearch} = stateSlice.actions;