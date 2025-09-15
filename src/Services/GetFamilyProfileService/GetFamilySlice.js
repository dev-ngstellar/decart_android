import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DeleteFamilyProfileApi, GetFamilyProfileApi } from "./GetFamilyApi";
import { setIsLoading } from "../LoginService/LoginSlice";




const initialState = {
    GetFamilyProfileData:[],
    DeleteFamilyData:[]
};

export const GetFamilyProfileThunk = createAsyncThunk(
  'getFamilyProfile',
  async (action,{dispatch}) => {
    dispatch(setIsLoading(true))
    try {
      const response = await GetFamilyProfileApi(action.payload);
      dispatch(setIsLoading(false))
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false))
      console.log(error);
    }
  },
);
export const DeleteFamilyProfileThunk = createAsyncThunk(
  'deleteFamilyProfile',
  async (action,{dispatch}) => {
    dispatch(setIsLoading(true))
    try {
      const response = await DeleteFamilyProfileApi(action.payload);
      dispatch(setIsLoading(false))
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false))
      console.log(error);
    }
  },
);

const GetFamilyProfileSlice = createSlice({
  initialState,
  name: 'getFamilyProfile',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(GetFamilyProfileThunk.fulfilled, (state, action) => {
      return {...state, GetFamilyProfileData: action.payload};
    }),
    builder.addCase(DeleteFamilyProfileThunk.fulfilled, (state, action) => {
      return {...state, DeleteFamilyData: action.payload};
    })

  },
});

export const {} = GetFamilyProfileSlice.actions;
export default GetFamilyProfileSlice.reducer;