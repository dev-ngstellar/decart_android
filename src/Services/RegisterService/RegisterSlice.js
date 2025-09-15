import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RegisterApi } from "./RegisterApi";



const initialState = {
    RegisteredData:[]
  };

  export const RegisterThunk = createAsyncThunk(
    'register',
    async action => {
      const {resetFormRegistration, payload} = action;
      try {
        const response = await RegisterApi(payload);
       if(response){
        resetFormRegistration()
        return response.data
       }
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  );

  const RegisterSlice = createSlice({
    initialState,
    name: 'register',
    reducers: {},
    extraReducers: builder => {
      builder.addCase(RegisterThunk.fulfilled, (state, action) => {
        return {...state, RegisteredData: action.payload};
      });
    },
  });

  export const {} = RegisterSlice.actions;
  export default RegisterSlice.reducer;
