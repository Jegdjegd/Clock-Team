import { configureStore } from "@reduxjs/toolkit";
import teammatesReducer from "./slices/    teammatesSlice.ts";
import themeReducer from "./slices/    themeSlice.ts";

export const store = configureStore({
  reducer: {
    teammates: teammatesReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;