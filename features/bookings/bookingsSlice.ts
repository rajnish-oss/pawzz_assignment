import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Booking } from "@/lib/types";
import { MOCK_BOOKINGS } from "@/lib/mockData";

interface BookingsState {
  items: Booking[];
  status: "idle" | "loading" | "succeeded" | "failed";
  isBooking: boolean;
  bookingModalProviderId: string | null;
}

const initialState: BookingsState = {
  items: [],
  status: "idle",
  isBooking: false,
  bookingModalProviderId: null,
};

export const fetchBookings = createAsyncThunk("bookings/fetchAll", async () => {
  await new Promise((r) => setTimeout(r, 400));
  return MOCK_BOOKINGS;
});

export interface CreateBookingArgs {
  providerId: string;
  providerName: string;
  petName: string;
  date: string;
  time: string;
  reason: string;
}

// Simulates POST /api/bookings — the backend owns availability rules,
// conflict checks, and confirmation. The client just submits the request.
export const createBooking = createAsyncThunk(
  "bookings/create",
  async (args: CreateBookingArgs) => {
    await new Promise((r) => setTimeout(r, 900));
    const booking: Booking = {
      id: `bk-${Date.now()}`,
      providerId: args.providerId,
      providerName: args.providerName,
      petName: args.petName,
      date: args.date,
      time: args.time,
      reason: args.reason,
      status: "pending",
    };
    return booking;
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    openBookingModal(state, action: PayloadAction<string>) {
      state.bookingModalProviderId = action.payload;
    },
    closeBookingModal(state) {
      state.bookingModalProviderId = null;
    },
    cancelBooking(state, action: PayloadAction<string>) {
      const booking = state.items.find((b) => b.id === action.payload);
      if (booking) booking.status = "cancelled";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(createBooking.pending, (state) => {
        state.isBooking = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isBooking = false;
        state.bookingModalProviderId = null;
        state.items.unshift(action.payload);
      })
      .addCase(createBooking.rejected, (state) => {
        state.isBooking = false;
      });
  },
});

export const { openBookingModal, closeBookingModal, cancelBooking } = bookingsSlice.actions;
export default bookingsSlice.reducer;
