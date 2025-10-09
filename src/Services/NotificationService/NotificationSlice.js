import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NotificationApi, UpdateNotification,GetNotificationCount } from "./NotificationApi";
import { setIsLoading } from "../LoginService/LoginSlice";

const initialState = {
  NotifiationData: [],
  UpdateNotifcationData: {},
  GetNotificationCountData:{},
};

export const GetNotifiationThunk = createAsyncThunk(
  "getNotifiation",
  async (action, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await NotificationApi(action.payload);
      console.log("Notification :: " + JSON.stringify(response));
      dispatch(setIsLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  }
);

export const UpdateNotificationThunk = createAsyncThunk(
  "updataeNotification",
  async (action, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await UpdateNotification(action.payload);
      // console.log("updteNotificationResponse " + JSON.stringify(response));
      dispatch(setIsLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  }
);


export const GetNotifiationCountThunk = createAsyncThunk(
  "getNotifiationcount",
  async (action, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await GetNotificationCount(action.payload);
      //console.log("getNotifiationcount " + JSON.stringify(response));
      dispatch(setIsLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  }
);



const GetNotifiationSlice = createSlice({
  initialState,
  name: "getNotifiation",
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GetNotifiationThunk.fulfilled case
      .addCase(GetNotifiationThunk.fulfilled, (state, action) => {
        return { ...state, NotifiationData: action.payload };
      })
      // UpdateNotificationThunk.fulfilled case
      .addCase(UpdateNotificationThunk.fulfilled, (state, action) => {
        return { ...state, UpdateNotifcationData: action.payload };
      })
       // GETNOTIFCATION COUNT
       .addCase(GetNotifiationCountThunk.fulfilled, (state, action) => {
        return { ...state, GetNotificationCountData: action.payload };
      })
  },
});

export const {} = GetNotifiationSlice.actions;
export default GetNotifiationSlice.reducer;
