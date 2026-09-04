import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {DeviceLogApi, DeviceVersionApi} from './DeviceApi';

const initialState = {
  DeviceLogData: [],
  VersionLogData: [],
};

export const DeviceLogThunk = createAsyncThunk('deviceLog', async action => {
  try {
    const response = await DeviceLogApi(action.payload);

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const VersionLogThunk = createAsyncThunk('versionLog', async action => {
  try {
    const response = await DeviceVersionApi(action.payload);
    return response?.data || response;
  } catch (error) {
    console.log("VersionLogThunk error:", error);
    throw error;
  }
});

const DeviceLogSlice = createSlice({
  initialState,
  name: 'deviceLog',
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(DeviceLogThunk.fulfilled, (state, action) => {
        return {...state, DeviceLogData: action.payload};
      })
      .addCase(VersionLogThunk.fulfilled, (state, action) => {
        return {...state, VersionLogData: action.payload};
      });
  },
});

export const {} = DeviceLogSlice.actions;
export default DeviceLogSlice.reducer;
