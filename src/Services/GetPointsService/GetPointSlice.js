import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GetPointsApi, GetPointsHistoryApi, GetArmsPointsHistoryApi} from './GetPointApi';
import { setIsLoading } from '../LoginService/LoginSlice';

const initialState = {
  PointsData: [],
  PointsHistoryData:[],
  ArmsPointsHistoryData: [],
  ArmsPointsHistoryError: null,
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

export const GetArmsPointsHistoryThunk = createAsyncThunk('getArmsPointsHistory', async (action, { rejectWithValue }) => {
  try {
    const response = await GetArmsPointsHistoryApi(action);
    if (response && response.success === false) {
      const msg = response.errorMessage || response.ResultMsg || response.DeviceMsg || 'Unable to load history.';
      return rejectWithValue(msg);
    }
    return response;
  } catch (error) {
    const msg = error?.response?.data?.errorMessage || error?.response?.data?.message || error?.response?.data?.DeviceMsg || error?.message || 'Unable to load history.';
    return rejectWithValue(msg);
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
    })
    .addCase(GetArmsPointsHistoryThunk.fulfilled, (state, action) => {
      const payload = action.payload;
      const data = Array.isArray(payload) ? payload : (Array.isArray(payload?.data) ? payload.data : []);
      return {...state, ArmsPointsHistoryData: data, ArmsPointsHistoryError: null};
    })
    .addCase(GetArmsPointsHistoryThunk.rejected, (state, action) => {
      return {...state, ArmsPointsHistoryData: [], ArmsPointsHistoryError: action.payload || 'Unable to load history.'};
    });
  },
});

export const {} = GetPointsSlice.actions;
export default GetPointsSlice.reducer;

