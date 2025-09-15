import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SalesHistoryApi } from "./SalesHistoryApi";
import { setIsLoading } from "../LoginService/LoginSlice";






const initialState = {
  SalesHistoryData:[]
};

export const GetSalesHistoryThunk = createAsyncThunk(
  'getSalesHistory',
  async (action,{dispatch}) => {
   dispatch(setIsLoading(true))
    try {
      const response = await SalesHistoryApi(action.payload);
      dispatch(setIsLoading(false))
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false))
      console.log(error);
    }
  },
);

const GetSalesHistorySlice = createSlice({
  initialState,
  name: 'getSalesHistory',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetSalesHistoryThunk.fulfilled, (state, action) => {
      return {...state, SalesHistoryData: action.payload};
    });
  },
});

export const {} = GetSalesHistorySlice.actions;
export default GetSalesHistorySlice.reducer;