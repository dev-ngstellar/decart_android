import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetFamilyProfileApi } from "./GetFamilyApi";
import { CheckNRICApi } from "./CheckIcApi";









const initialState = {
    CheckICData:[]
};

export const CheckIcThunk = createAsyncThunk(
  'checkIc',
  async action => {
   
    try {
      const response = await CheckNRICApi(action.payload);
   
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

const CheckIcSlice = createSlice({
  initialState,
  name: 'checkIc',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(CheckIcThunk.fulfilled, (state, action) => {
      return {...state, CheckICData: action.payload};
    });
  },
});

export const {} = CheckIcSlice.actions;
export default CheckIcSlice.reducer;