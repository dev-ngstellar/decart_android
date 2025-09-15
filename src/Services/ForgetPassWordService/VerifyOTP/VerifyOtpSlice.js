import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { VerifyOTPApi } from "./VerifyOtpApi";





const initialState = {
    VerifyOTPData:[]
  };

  export const VerifyOTPThunk = createAsyncThunk(
    'verifyOTP',
    async action => {
      try {
        const response = await VerifyOTPApi(action.payload);
        
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  );

  const VerifyOTPSlice = createSlice({
    initialState,
    name: 'verifyOTP',
    reducers: {},
    extraReducers: builder => {
      builder.addCase(VerifyOTPThunk.fulfilled, (state, action) => {
        return {...state, VerifyOTPData: action.payload};
      });
    },
  });

  export const {} = VerifyOTPSlice.actions;
  export default VerifyOTPSlice.reducer;
