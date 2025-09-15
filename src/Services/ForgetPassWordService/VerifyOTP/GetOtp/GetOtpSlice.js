import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetOTPApi } from "./GetOtpApi";






const initialState = {
    GetOTPData:[]
  };

  export const GetOTPThunk = createAsyncThunk(
    'getOTP',
    async action => {
      try {
        const response = await GetOTPApi(action.payload);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  );

  const GetOTPSlice = createSlice({
    initialState,
    name: 'getOTP',
    reducers: {},
    extraReducers: builder => {
      builder.addCase(GetOTPThunk.fulfilled, (state, action) => {
        return {...state, GetOTPData: action.payload};
      });
    },
  });

  export const {} = GetOTPSlice.actions;
  export default GetOTPSlice.reducer;
