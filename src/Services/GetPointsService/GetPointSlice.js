import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GetPointsApi, GetPointsHistoryApi} from './GetPointApi';
import { setIsLoading } from '../LoginService/LoginSlice';

const initialState = {
  PointsData: [],
  PointsHistoryData:[],
};

export const GetPointsThunk = createAsyncThunk('getPoints', async (action,{dispatch}) => {
  dispatch(setIsLoading(true))
  try {
    const response = await GetPointsApi(action.payload);
    dispatch(setIsLoading(false))
    return response.data;
  } catch (error) {
    dispatch(setIsLoading(false))
    console.log(error);
  }
});
export const GetPointHistoryThunk = createAsyncThunk('getPointHistory', async action => {
  try {
    const response = await GetPointsHistoryApi(action.payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const GetPointsSlice = createSlice({
  initialState,
  name: 'getPoints',
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(GetPointsThunk.fulfilled, (state, action) => {
      return {...state, PointsData: action.payload};
    })
    .addCase(GetPointHistoryThunk.fulfilled, (state, action) => {
      return {...state, PointsHistoryData: action.payload};
    });
  },
});

export const {} = GetPointsSlice.actions;
export default GetPointsSlice.reducer;
