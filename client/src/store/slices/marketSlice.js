import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  urunler: [],
};

const marketSlice = createSlice({
  name: "restoran",
  initialState,
  reducers: {
    setUrunler: {
      reducer: (state, action) => {
        return { ...state, urunler: action.payload };
      },
    },
  },
});
console.log(marketSlice);
export const { setUrunler } = marketSlice.actions;

export default marketSlice.reducer;
