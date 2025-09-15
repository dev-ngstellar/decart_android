import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetRaceApi } from "./GetRaceApi";


const initialState = {
    CustomerRace :[]
  };

  export const GetRaceThunk = createAsyncThunk(
    'getRace',
    async action => {
      try {
        const response = await GetRaceApi(action);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  );

  const GetRaceSlice = createSlice({
    initialState,
    name: 'getRace',
    reducers: {},
    extraReducers: builder => {
      builder.addCase(GetRaceThunk.fulfilled, (state, action) => {
        return {...state, CustomerRace: action.payload};
      });
    },
  });

  export const {} = GetRaceSlice.actions;
  export default GetRaceSlice.reducer;
