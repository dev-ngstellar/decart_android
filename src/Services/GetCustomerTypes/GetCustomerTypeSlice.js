import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetCustomerTypesApi } from "./GetCustomertypesApi";


const initialState = {
   CustomerTypes :[]
  };

  export const GetCustomertypeThunk = createAsyncThunk(
    'getCustomertype',
    async action => {
      try {
        const response = await GetCustomerTypesApi(action);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  );

  const GetCustomertypeSlice = createSlice({
    initialState,
    name: 'getCustomertype',
    reducers: {},
    extraReducers: builder => {
      builder.addCase(GetCustomertypeThunk.fulfilled, (state, action) => {
        return {...state, CustomerTypes: action.payload};
      });
    },
  });

  export const {} = GetCustomertypeSlice.actions;
  export default GetCustomertypeSlice.reducer;
