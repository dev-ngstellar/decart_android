import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CheckNewLoginApi } from "./NewLoginApi";






const initialState = {
  NewLoginData:[]
};

export const CheckNewLoginIdThunk = createAsyncThunk(
  'checkNewLoginId',
  async action => {
   
    try {

      //console.log('Payload sent to CheckNewLoginApi ::', action.payload);
      const response = await CheckNewLoginApi(action.payload);
  
      //console.log('Response from CheckNewLoginApi ::', response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

const CheckNewLoginIdSlice = createSlice({
  initialState,
  name: 'checkNewLoginId',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(CheckNewLoginIdThunk.fulfilled, (state, action) => {
      return {...state, NewLoginData: action.payload};
    });
  },
});

export const {} = CheckNewLoginIdSlice.actions;
export default CheckNewLoginIdSlice.reducer;