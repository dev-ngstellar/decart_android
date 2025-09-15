import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ForgotPassApi } from "./ForgetPassApi";
import { setIsLoading } from "../LoginService/LoginSlice";




const initialState = {
    forgetPassData:[]
  };

  export const ForgetPassThunk = createAsyncThunk(
    'forgetPass',
    async (action,{dispatch}) => {
      const {resetForm, payload} = action;
      dispatch(setIsLoading(true))
      try {
        const response = await ForgotPassApi(payload);
        if(response){
          dispatch(setIsLoading(false))
          resetForm()
        }
        return response.data;
      } catch (error) {
        dispatch(setIsLoading(false))
        console.log(error);
      }
    },
  );

  const ForgetPassSlice = createSlice({
    initialState,
    name: 'forgetPass',
    reducers: {},
    extraReducers: builder => {
      builder.addCase(ForgetPassThunk.fulfilled, (state, action) => {
        return {...state, forgetPassData: action.payload};
      });
    },
  });

  export const {} = ForgetPassSlice.actions;
  export default ForgetPassSlice.reducer;
