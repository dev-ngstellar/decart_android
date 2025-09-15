import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetVouchersApi } from "./GetVoucherApi";
import { setIsLoading } from "../LoginService/LoginSlice";






const initialState = {
    GetVouchersData:[]
};

export const GetVouchersThunk = createAsyncThunk(
  'getVouchers',
  async (action,{dispatch}) => {
    dispatch(setIsLoading(true))
    try {
      const response = await GetVouchersApi(action.payload);
      dispatch(setIsLoading(false))
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false))
      console.log(error);
    }
  },
);

const GetVouchersSlice = createSlice({
  initialState,
  name: 'getVouchers',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetVouchersThunk.fulfilled, (state, action) => {
      return {...state, GetVouchersData: action.payload};
    });
  },
});

export const {} = GetVouchersSlice.actions;
export default GetVouchersSlice.reducer;