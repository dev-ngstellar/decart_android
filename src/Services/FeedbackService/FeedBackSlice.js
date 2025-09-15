import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "../LoginService/LoginSlice";
import { FeedBackTypeApi, GetFeedBackApi } from "./FeedBackApi";

const initialState = {
  FeedBackTypeData: [],
  GetFeedBackData: [],
};

export const getFeedBackThunk = createAsyncThunk(
  "getFeedBack",
  async (action, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await GetFeedBackApi(action.payload);
      console.log("feedback", response);
      dispatch(setIsLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  }
);
export const FeedBackThunk = createAsyncThunk("feedBack", async (action) => {
  try {
    const response = await FeedBackTypeApi(action);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const GetFeedBackSlice = createSlice({
  initialState,
  name: "getFeedBack",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedBackThunk.fulfilled, (state, action) => {
        return { ...state, GetFeedBackData: action.payload };
      })
      .addCase(FeedBackThunk.fulfilled, (state, action) => {
        return { ...state, FeedBackTypeData: action.payload };
      });
  },
});

export const {} = GetFeedBackSlice.actions;
export default GetFeedBackSlice.reducer;
