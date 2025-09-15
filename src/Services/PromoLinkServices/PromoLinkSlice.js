import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PromoLinkApi } from "./PromoLinkAPi";
import { setIsLoading } from "../LoginService/LoginSlice";

const initialState = {
  GetPromoData: [],
};

export const GetPromoThunk = createAsyncThunk(
  "getPromo",
  async (action, { dispatch }) => {
    dispatch(setIsLoading(true));
    try {
      const response = await PromoLinkApi(action.payload);
      dispatch(setIsLoading(false));
      // console.log("promodata", response.data);
      return response.data;
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  }
);

const GetPromoSlice = createSlice({
  initialState,
  name: "getPromo",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetPromoThunk.fulfilled, (state, action) => {
      return { ...state, GetPromoData: action.payload };
    });
  },
});

export const {} = GetPromoSlice.actions;
export default GetPromoSlice.reducer;
