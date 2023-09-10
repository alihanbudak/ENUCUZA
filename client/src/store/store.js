import { configureStore } from "@reduxjs/toolkit";
import marketSlice from "./slices/marketSlice";

const store = configureStore({
  reducer: {
    market: marketSlice,
  },
});

export default store;
