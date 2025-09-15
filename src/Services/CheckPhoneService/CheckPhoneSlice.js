import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CheckPhoneApi } from "./CheckPhoneApi";









const initialState = {
    CheckPhoneData:[]
};

export const CheckPhoneThunk = createAsyncThunk(
  'checkPhone',
  async action => {
   
    try {
      const response = await CheckPhoneApi(action.payload);
   
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

const CheckPhoneSlice = createSlice({
  initialState,
  name: 'checkPhone',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(CheckPhoneThunk.fulfilled, (state, action) => {
      return {...state, CheckPhoneData: action.payload};
    });
  },
});

export const {} = CheckPhoneSlice.actions;
export default CheckPhoneSlice.reducer;