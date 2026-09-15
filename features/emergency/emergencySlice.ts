import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Provider } from "@/lib/types";
import { MOCK_PROVIDERS } from "@/lib/mockData";

interface EmergencyState {
  sosActive: boolean;
  responders: Provider[];
  status: "idle" | "dispatching" | "ready" | "failed";
  dispatchedAt: string | null;
}

const initialState: EmergencyState = {
  sosActive: false,
  responders: [],
  status: "idle",
  dispatchedAt: null,
};

// Simulates POST /api/emergency/sos — the backend would run a strict
// proximity sort over ambulances + trauma-capable clinics via PostGIS
// and return the closest operational responders.
export const triggerSOS = createAsyncThunk("emergency/triggerSOS", async () => {
  await new Promise((r) => setTimeout(r, 900));
  const responders = MOCK_PROVIDERS.filter(
    (p) => p.category === "ambulance" || p.hasTraumaCenter
  ).sort((a, b) => a.distanceKm - b.distanceKm);
  return responders;
});

const emergencySlice = createSlice({
  name: "emergency",
  initialState,
  reducers: {
    cancelSOS(state) {
      state.sosActive = false;
      state.status = "idle";
      state.responders = [];
      state.dispatchedAt = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(triggerSOS.pending, (state) => {
        state.sosActive = true;
        state.status = "dispatching";
      })
      .addCase(triggerSOS.fulfilled, (state, action) => {
        state.status = "ready";
        state.responders = action.payload;
        state.dispatchedAt = new Date().toISOString();
      })
      .addCase(triggerSOS.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { cancelSOS } = emergencySlice.actions;
export default emergencySlice.reducer;
