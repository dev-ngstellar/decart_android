import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UpdateFamilyApi } from "./UpdateFamilyApi";


const initialState = {
 updateFamilyData:[]
};

export const UpdateFamilyThunk = createAsyncThunk(
  'updateFamily',
  async action => {
    const {resetForm, payload} = action;
    try {
      const response = await UpdateFamilyApi(payload);
      if(response)
        resetForm()
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

const UpdateFamilySlice = createSlice({
  initialState,
  name: 'updateFamily',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(UpdateFamilyThunk.fulfilled, (state, action) => {
      return {...state, updateFamilyData: action.payload};
    });
  },
});

export const {} = UpdateFamilySlice.actions;
export default UpdateFamilySlice.reducer;