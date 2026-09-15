import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Provider, ProviderCategory } from "@/lib/types";
import { MOCK_PROVIDERS } from "@/lib/mockData";

interface ProvidersState {
  items: Provider[];
  status: "idle" | "loading" | "succeeded" | "failed";
  activeCategory: ProviderCategory | "all";
  searchQuery: string;
  selectedProviderId: string | null;
}

const initialState: ProvidersState = {
  items: [],
  status: "idle",
  activeCategory: "all",
  searchQuery: "",
  selectedProviderId: null,
};

// Simulates GET /api/providers?lat=..&lng=..&category=..&q=..
// A real backend would run the PostGIS proximity query server-side.
export const fetchNearbyProviders = createAsyncThunk(
  "providers/fetchNearby",
  async (_args: { lat?: number; lng?: number } | undefined) => {
    await new Promise((r) => setTimeout(r, 550));
    return [...MOCK_PROVIDERS].sort((a, b) => a.distanceKm - b.distanceKm);
  }
);

const providersSlice = createSlice({
  name: "providers",
  initialState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<ProviderCategory | "all">) {
      state.activeCategory = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSelectedProvider(state, action: PayloadAction<string | null>) {
      state.selectedProviderId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearbyProviders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNearbyProviders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchNearbyProviders.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setActiveCategory, setSearchQuery, setSelectedProvider } = providersSlice.actions;
export default providersSlice.reducer;
