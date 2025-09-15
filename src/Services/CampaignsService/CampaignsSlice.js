import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCampaignsApi, getSubCampaignsApi, updateCampaignsApi } from "./CampaignsApi";


const initialState = {
  campaignsData: [],
  updateCampaignsData: [],
  subCampaignsData: [],
};


export const getCampaignsThunk = createAsyncThunk(
  'getCampaigns',
  async (action) => {
    try {
      const response = await getCampaignsApi(action.payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const updateCampaignsThunk = createAsyncThunk(
  'updateCampaigns',
  async (action) => {
    try {
      const response = await updateCampaignsApi(action.payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getSubCampaignsThunk = createAsyncThunk(
  'getSubCampaigns',
  async (action) => {
    try {
      const response = await getSubCampaignsApi(action.payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

const CampaignsSlice = createSlice({
  initialState,
  name: 'campaingns',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCampaignsThunk.fulfilled, (state, action) => {
      return { ...state, campaignsData: action.payload };
    })
      .addCase(updateCampaignsThunk.fulfilled, (state, action) => {
        return { ...state, updateCampaignsData: action.payload };
      })
            .addCase(getSubCampaignsThunk.fulfilled, (state, action) => {
        return { ...state, subCampaignsData: action.payload };
      });
  },
});

export const { } = CampaignsSlice.actions;
export default CampaignsSlice.reducer;
