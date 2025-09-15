import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UpdatePassApi } from "./UpdatePassApi";

const initialState = {
 updatePassData:[]
};

export const UpdatePassThunk = createAsyncThunk(
  'updatePass',
  async action => {
    const {payload,resetForm} = action
    try {
      const response = await UpdatePassApi(payload);
      resetForm()
      return response.data;
     
    } catch (error) {
      console.log(error);
    }
  },
);

const UpdatePassSlice = createSlice({
  initialState,
  name: 'updatePass',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(UpdatePassThunk.fulfilled, (state, action) => {
      return {...state, updatePassData: action.payload};
    });
  },
});

export const {} = UpdatePassSlice.actions;
export default UpdatePassSlice.reducer;