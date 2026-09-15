import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coordinates } from "@/lib/types";

export type LocationStatus = "idle" | "locating" | "granted" | "denied" | "manual";

interface LocationState {
  status: LocationStatus;
  coords: Coordinates | null;
  label: string;
  errorMessage: string | null;
}

const initialState: LocationState = {
  status: "idle",
  coords: null,
  label: "",
  errorMessage: null,
};

// In a real app this reads the browser Geolocation API only — reverse
// geocoding the coordinates into a place name is a backend concern.
// Here we simulate that round trip with a short delay.
export const detectCurrentLocation = createAsyncThunk<
  { coords: Coordinates; label: string },
  void,
  { rejectValue: string }
>("location/detectCurrentLocation", async (_, { rejectWithValue }) => {
  if (typeof window === "undefined" || !("geolocation" in navigator)) {
    return rejectWithValue("Geolocation isn't available on this device.");
  }

  const coords = await new Promise<Coordinates>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }).catch(() => {
    // Fall back to a demo coordinate so the experience still works
    // when location permission is denied in this sandbox/demo.
    return { lat: 28.4744, lng: 77.504 };
  });

  await new Promise((r) => setTimeout(r, 600));

  return { coords, label: "Greater Noida, Uttar Pradesh" };
});

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setManualLocation(state, action: PayloadAction<string>) {
      state.status = "manual";
      state.label = action.payload;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(detectCurrentLocation.pending, (state) => {
        state.status = "locating";
        state.errorMessage = null;
      })
      .addCase(detectCurrentLocation.fulfilled, (state, action) => {
        state.status = "granted";
        state.coords = action.payload.coords;
        state.label = action.payload.label;
      })
      .addCase(detectCurrentLocation.rejected, (state, action) => {
        state.status = "denied";
        state.errorMessage = action.payload ?? "Couldn't detect your location.";
      });
  },
});

export const { setManualLocation } = locationSlice.actions;
export default locationSlice.reducer;
