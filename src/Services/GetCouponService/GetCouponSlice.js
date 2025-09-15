import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { GetCouponApi } from "./GetCouponApi";
import { setIsLoading } from "../LoginService/LoginSlice";






const initialState = {
    GetCouponData:[]
};

export const GetCouponThunk = createAsyncThunk(
  'getCoupon',
  async (action,{dispatch}) => {
    dispatch(setIsLoading(true))
    try {
      const response = await GetCouponApi(action.payload);
      console.log("Coupon Response from GetCouponSlice : "+JSON.stringify(response));
      dispatch(setIsLoading(false))
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false))
      console.log(error);
    }
  },
);

const GetCouponSlice = createSlice({
  initialState,
  name: 'getCoupon',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetCouponThunk.fulfilled, (state, action) => {
      return {...state, GetCouponData: action.payload};
    });
  },
});

export const {} = GetCouponSlice.actions;
export default GetCouponSlice.reducer;