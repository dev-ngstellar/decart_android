import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GetDiscountApi} from './GetDiscountApi';
import { setIsLoading } from '../LoginService/LoginSlice';

const initialState = {
  GetDiscountData: [],
};

export const GetDiscountThunk = createAsyncThunk(
  'getDiscount',
  async (action,{dispatch}) => {
    dispatch(setIsLoading(true))
    try {
      const response = await GetDiscountApi(action.payload);
      dispatch(setIsLoading(false))
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false))
      console.log(error);
    }
  },
);

const GetDiscountSlice = createSlice({
  initialState,
  name: 'getDiscount',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetDiscountThunk.fulfilled, (state, action) => {
      return {...state, GetDiscountData: action.payload};
    });
  },
});

export const {} = GetDiscountSlice.actions;
export default GetDiscountSlice.reducer;
