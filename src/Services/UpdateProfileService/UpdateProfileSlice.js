import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UpdateProfileApi } from "./UpdateProfileApi";

const initialState = {
 updateProfileData:[]
};

export const UpdateProfileThunk = createAsyncThunk(
  'updateProfile',
  async action => {
    try {
      const response = await UpdateProfileApi(action.payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

const UpdateProfileSlice = createSlice({
  initialState,
  name: 'updateProfile',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(UpdateProfileThunk.fulfilled, (state, action) => {
      return {...state, updateProfileData: action.payload};
    });
  },
});

export const {} = UpdateProfileSlice.actions;
export default UpdateProfileSlice.reducer;