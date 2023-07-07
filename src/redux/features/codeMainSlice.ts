import { CodeType } from "@/components/profile/NavbarProfile";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateProps{
    code: CodeType
}

const initialState : StateProps = {
    code:'profile'
}


const codeMainSlice = createSlice({
    name:'button-profile',
    initialState,
    reducers:{

        changeCodeMainButton : (state,action:PayloadAction<CodeType>) => {
            state.code = action.payload
        }
    }
})


export default codeMainSlice.reducer;
export const {changeCodeMainButton} = codeMainSlice.actions;