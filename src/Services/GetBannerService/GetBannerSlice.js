import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GetBannerApi} from './GetBannerApi';
import { setIsLoading } from '../LoginService/LoginSlice';

const initialState = {
  GetBannerData: [],
};

export const GetBannerThunk = createAsyncThunk('getBanner', async (action,{dispatch}) => {
  dispatch(setIsLoading(true))
  try {
    const response = await GetBannerApi(action.payload);
    dispatch(setIsLoading(false))
    // console.log('bannerdata',response.data)
    return response.data;
  } catch (error) {
    dispatch(setIsLoading(false))
    console.log(error);
  }
});

const GetBannerSlice = createSlice({
  initialState,
  name: 'getBanner',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetBannerThunk.fulfilled, (state, action) => {
      return {...state, GetBannerData: action.payload};
    });
  },
});

export const {} = GetBannerSlice.actions;
export default GetBannerSlice.reducer;
