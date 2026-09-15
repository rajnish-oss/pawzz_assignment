# Pawzz — Pet & Street Animal Care (Frontend)

A frontend-only Next.js UI for a vet/emergency-care discovery platform. Built with
**Next.js (App Router) + TypeScript + Redux Toolkit + Tailwind CSS**.

This is **UI only**. There is no backend here — the backend is treated as the source of
truth for everything (PostGIS proximity search, the AI vision document parser, booking
availability, etc). All data in this repo is mocked in `lib/mockData.ts` and served through
Redux Toolkit `createAsyncThunk`s with a simulated network delay, so every screen behaves
like it's talking to a real API and is trivial to rewire to one later — just replace the
body of each thunk in `features/*/*.ts` with a real `fetch`/`axios` call.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

> Note: this project was authored in a sandboxed environment without registry access, so
> dependencies have not been installed or build-verified here. Run `npm install` followed by
> `npm run build` locally to catch anything version-specific in your environment.

## Pages

| Route | Feature |
|---|---|
| `/` | Discovery & location search — GPS auto-detect, search bar, category filters (Vets / 24-7 Clinics / Ambulances / NGOs), list + mock map view |
| `/emergency` | Emergency SOS flow — one-tap trigger, proximity-sorted ambulances & trauma centers, one-tap call + directions |
| `/documents` | AI medical document management — upload a photo, simulated AI parsing, extracted metrics flagged against reference ranges, vaccination + lab timeline |
| `/provider/[id]` | Provider detail — hours, species handled, reviews, and the booking panel |
| `/bookings` | The signed-in user's upcoming & past appointments |

## Architecture

- `app/` — Next.js App Router pages and the root layout/providers
- `components/` — presentational + connected UI components, grouped by feature area
- `features/*/*.ts` — one Redux Toolkit slice per domain (`location`, `providers`,
  `emergency`, `documents`, `bookings`), each with thunks that stand in for API calls
- `lib/` — the Redux store, typed hooks, shared domain types, mock fixtures, and small
  formatting utilities

## Design notes

The visual language leans on a warm paper background, a deep forest-green brand color,
amber for warmth/ratings, and a dedicated urgent-red reserved only for the SOS flow so it
stays meaningful. Headings use Fraunces (serif) for warmth; UI text uses Inter for
legibility. The "map" on the discovery page is an intentionally abstract, illustrative
placeholder (grid + pins positioned from mock lat/lng) rather than a real maps integration,
since there's no backend/API key wired up in this pass — swap in your maps provider of
choice behind `components/discovery/MapPanel.tsx`.

## Known follow-ups for a real backend integration

- Replace thunk bodies in `features/*/*.ts` with real API calls; the state shape and
  loading/success/error handling are already in place.
- Wire real browser Geolocation → reverse-geocoding through your backend in
  `features/location/locationSlice.ts` (the client already requests GPS coordinates; only
  the label lookup is mocked).
- Replace the AI-analysis simulation in `uploadAndAnalyzeDocument` with a real multipart
  upload once the vision pipeline endpoint exists.
