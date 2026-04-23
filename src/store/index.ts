import { configureStore } from "@reduxjs/toolkit";
import teammatesReducer from "./slices/    teammatesSlice";
import themeReducer from "./slices/    themeSlice";

export const store = configureStore({
  reducer: {
    teammates: teammatesReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;