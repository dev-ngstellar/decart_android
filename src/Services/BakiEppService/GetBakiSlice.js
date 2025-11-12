import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GetBakiApi} from './GetBakiApi';
import { setIsLoading } from '../LoginService/LoginSlice';

const initialState = {
  GetBakiData: [],
};

export const GetBakiThunk = createAsyncThunk('getBaki', async (action,{dispatch}) => {
  dispatch(setIsLoading(true));
  try {
    const response = await GetBakiApi(action.payload);
    console.log('GetBaki API response:', response);
    console.log('GetBaki API data array:', response.data);
    dispatch(setIsLoading(false))
    return response.data;
  } catch (error) {
    dispatch(setIsLoading(false))
    console.log(error);
  }
});

const GetBakiSlice = createSlice({
  initialState,
  name: 'getBaki',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetBakiThunk.fulfilled, (state, action) => {
      return {...state, GetBakiData: action.payload};
    });
  },
});

export const {} = GetBakiSlice.actions;
export default GetBakiSlice.reducer;
