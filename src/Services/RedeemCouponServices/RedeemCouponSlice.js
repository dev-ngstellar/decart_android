import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RedeemCouponApi } from "./RedeemCouponApi";

const initialState = {
 RedeemCouponData:[]
};

export const RedeemCouponThunk = createAsyncThunk(
  'redeemCoupon',
  async action => {
   
    try {
      const response = await RedeemCouponApi(action.payload);
   
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

const RedeemCouponSlice = createSlice({
  initialState,
  name: 'redeemCoupon',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(RedeemCouponThunk.fulfilled, (state, action) => {
      return {...state, RedeemCouponData: action.payload};
    });
  },
});

export const {} = RedeemCouponSlice.actions;
export default RedeemCouponSlice.reducer;