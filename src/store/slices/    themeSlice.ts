import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  isDayMode: boolean;
  activeTimezone: string | null;
  lightMode: boolean;
}

const initialState: ThemeState = {
  isDayMode: true,
  activeTimezone: null,
  lightMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeFromTimezone: (state, action: PayloadAction<string>) => {
      state.activeTimezone = action.payload;
      const hour = new Date(
        new Date().toLocaleString("en-US", { timeZone: action.payload })
      ).getHours();
      state.isDayMode = hour >= 6 && hour < 20;
    },
    resetTheme: (state) => {
      state.isDayMode = true;
      state.activeTimezone = null;
    },
    toggleLightMode: (state) => {
      state.lightMode = !state.lightMode;
    },
  },
});

export const { setThemeFromTimezone, resetTheme, toggleLightMode } = themeSlice.actions;
export default themeSlice.reducer;