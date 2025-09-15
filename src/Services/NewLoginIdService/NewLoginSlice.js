import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CheckNewLoginApi } from "./NewLoginApi";






const initialState = {
  NewLoginData:[]
};

export const CheckNewLoginIdThunk = createAsyncThunk(
  'checkNewLoginId',
  async action => {
   
    try {
      const response = await CheckNewLoginApi(action.payload);
   
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