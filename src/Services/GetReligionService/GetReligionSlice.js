import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetReligionApi } from "./GetReligionApi";



const initialState = {
   CustomerReligion :[]
  };

  export const GetReligionThunk = createAsyncThunk(
    'getReligion',
    async action => {
      try {
        const response = await GetReligionApi(action);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  );

  const GetReligionSlice = createSlice({
    initialState,
    name: 'getReligion',
    reducers: {},
    extraReducers: builder => {
      builder.addCase(GetReligionThunk.fulfilled, (state, action) => {
        return {...state, CustomerReligion: action.payload};
      });
    },
  });

  export const {} = GetReligionSlice.actions;
  export default GetReligionSlice.reducer;
