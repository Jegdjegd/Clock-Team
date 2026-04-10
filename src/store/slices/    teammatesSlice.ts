import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Teammate {
  id: string;
  name: string;
  role: string;
  location: string;
  city: string;
  timezone: string; // e.g. "America/New_York"
  imageUrl?: string;
  email?: string;
  delay?: string;
}

interface TeammatesState {
  list: Teammate[];
  activeId: string | null;
}

const saved = localStorage.getItem("chronos_teammates");

const initialState: TeammatesState = {
  list: saved ? JSON.parse(saved) : [
    {
      id: "1",
      name: "Alex Chen",
      role: "Lead Designer",
      location: "Tokyo, JP",
      city: "Tokyo",
      timezone: "Asia/Tokyo",
      delay: "0.8s",
    },
    {
      id: "2",
      name: "Sarah Miller",
      role: "Backend Dev",
      location: "Berlin, DE",
      city: "Berlin",
      timezone: "Europe/Berlin",
      delay: "0.4s",
    },
    {
      id: "3",
      name: "David Kim",
      role: "Product Manager",
      location: "New York, US",
      city: "New York",
      timezone: "America/New_York",
      delay: "0.2s",
    },
  ],
  activeId: null,
};

const teammatesSlice = createSlice({
  name: "teammates",
  initialState,
  reducers: {
    addTeammate: (state, action: PayloadAction<Teammate>) => {
      state.list.push(action.payload);
      localStorage.setItem("chronos_teammates", JSON.stringify(state.list));
    },
    removeTeammate: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(t => t.id !== action.payload);
      localStorage.setItem("chronos_teammates", JSON.stringify(state.list));
    },
    setActiveTeammate: (state, action: PayloadAction<string | null>) => {
      state.activeId = action.payload;
    },
  },
});

export const { addTeammate, removeTeammate, setActiveTeammate } = teammatesSlice.actions;
export default teammatesSlice.reducer;