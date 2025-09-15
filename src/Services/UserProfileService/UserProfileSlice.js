import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCampaignsApi, UserProfileApi } from "./UserProfileApi";
import { setIsLoading } from "../LoginService/LoginSlice";


const initialState = {
  userProfileData: [],
};

export const GetUserProfileThunk = createAsyncThunk(
  'getUserProfile',
  async (action, { dispatch }) => {
    dispatch(setIsLoading(true))
    try {
      const response = await UserProfileApi(action.payload);
      dispatch(setIsLoading(false))
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false))
      console.log(error);
    }
  },
);


const GetUserProfileSlice = createSlice({
  initialState,
  name: 'getUserProfile',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetUserProfileThunk.fulfilled, (state, action) => {
      return { ...state, userProfileData: action.payload };
    });
  },
});

export const { } = GetUserProfileSlice.actions;
export default GetUserProfileSlice.reducer;
