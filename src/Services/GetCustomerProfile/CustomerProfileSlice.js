import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CustomerProfileApi } from "./CustomerProfileApi";

const initialState = {
    ProfileData:[]
  };

  export const GetCustomerProfileThunk = createAsyncThunk(
    'getCustomerProfile',
    async action => {
      try {
        console.log('payload in thunk',action.payload);
        const response = await CustomerProfileApi(action.payload);
        console.log('testing users:',action.payload);
        console.log('testing users:',response.data)
        return response.data;
      } catch (error) {
        console.log(error)
      }
    },
  );

  const GetCustomerProfileSlice = createSlice({
    initialState,
    name: 'getCustomerProfile',
    reducers: {},
    extraReducers: builder => {
      builder.addCase(GetCustomerProfileThunk.fulfilled, (state, action) => {
        return {...state, ProfileData: action.payload};
      });
    },
  });

  export const {} = GetCustomerProfileSlice.actions;
  export default GetCustomerProfileSlice.reducer;
