import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GenerateOTPApi } from "./GenerateOTPApi";
import { setIsLoading } from "../LoginService/LoginSlice";








const initialState = {
    OTPData:[]
};

export const GenerateOTPThunk = createAsyncThunk(
  'generateOTP',
  async (action,{dispatch}) => {
    dispatch(setIsLoading(true));
    try {
      const response = await GenerateOTPApi(action.payload);
      dispatch(setIsLoading(false))
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false))
      console.log(error);
    }
  },
);

const GenerateOTPSlice = createSlice({
  initialState,
  name: 'generateOTP',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GenerateOTPThunk.fulfilled, (state, action) => {
      return {...state, OTPData: action.payload};
    });
  },
});

export const {} = GenerateOTPSlice.actions;
export default GenerateOTPSlice.reducer;