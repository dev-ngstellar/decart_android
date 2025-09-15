import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RedeemVoucherApi } from "./RedeemVoucherApi";

const initialState = {
    RedeemVoucherData:[]
};

export const RedeemVoucherThunk = createAsyncThunk(
  'redeemVoucher',
  async action => {
   
    try {
      const response = await RedeemVoucherApi(action.payload);
   
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

const RedeemVoucherSlice = createSlice({
  initialState,
  name: 'redeemVoucher',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(RedeemVoucherThunk.fulfilled, (state, action) => {
      return {...state, RedeemVoucherData: action.payload};
    });
  },
});

export const {} = RedeemVoucherSlice.actions;
export default RedeemVoucherSlice.reducer;