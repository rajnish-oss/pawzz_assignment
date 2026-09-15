import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "@/features/location/locationSlice";
import providersReducer from "@/features/providers/providersSlice";
import emergencyReducer from "@/features/emergency/emergencySlice";
import documentsReducer from "@/features/documents/documentsSlice";
import bookingsReducer from "@/features/bookings/bookingsSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      location: locationReducer,
      providers: providersReducer,
      emergency: emergencyReducer,
      documents: documentsReducer,
      bookings: bookingsReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
