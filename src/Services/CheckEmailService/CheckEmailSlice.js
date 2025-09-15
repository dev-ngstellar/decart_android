import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CheckEmailApi } from "./CheckEmailApi";








const initialState = {
    CheckEmailData:[]
};

export const CheckEmailThunk = createAsyncThunk(
  'checkEmail',
  async action => {
   
    try {
      const response = await CheckEmailApi(action.payload);
   
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

const CheckEmailSlice = createSlice({
  initialState,
  name: 'checkEmail',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(CheckEmailThunk.fulfilled, (state, action) => {
      return {...state, CheckEmailData: action.payload};
    });
  },
});

export const {} = CheckEmailSlice.actions;
export default CheckEmailSlice.reducer;