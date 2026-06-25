# Event Management Platform

Browse events, book tickets through a multi-step flow, manage your bookings, and create new events. Built around modern React patterns — server-state caching, a data-mode router, Redux for a complex form, and React 19 hooks.

The user is simulated (`userId: "user1"`, no real auth). The backend is a local [json-server](https://github.com/typicode/json-server) reading from `db.json`.

## Tech stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS** (v4)
- **React Router v7** in **data mode** (`createBrowserRouter` — loaders, actions, `defer`, `errorElement`)
- **TanStack Query v5** — server state (events, bookings, user), caching, mutations
- **Redux Toolkit** — the create-event wizard form state
- **json-server** — REST backend

## State-management strategy

| State                                 | Tool                      |
| ------------------------------------- | ------------------------- |
| Server state (events, bookings, user) | TanStack Query            |
| Complex form (event-creation wizard)  | Redux Toolkit             |
| Global UI (theme, simulated auth)     | React Context             |
| Local UI (filters, booking steps)     | `useState` / `useReducer` |

## Prerequisites

- **Node.js 20+** (developed on Node 24)
- **Yarn** (the project uses `yarn.lock`)

## Setup & running

```bash
yarn
```

The app needs **two processes** running together, in two terminals:

**1. Backend (json-server)** on port 3001 — serves `db.json` at `http://localhost:3001`:

```bash
yarn server
```

**2. Frontend (Vite dev server):**

```bash
yarn dev
```

Open the URL Vite prints (default `http://localhost:5173`).

> If json-server isn't running, data-backed pages show error states.
>
> **Note:** judge the dark-mode flash and `defer` streaming in a production build (`yarn build && yarn preview`), not `yarn dev` — the dev server injects CSS via JS, which adds a flash unrelated to the app.

### Other scripts

```bash
yarn build     # type-check (tsc) + build for production
yarn preview   # preview the production build
yarn lint      # ESLint
```

## Routes & features

- **`/` — Events listing.** Card grid; non-blocking title search (`useDeferredValue`); filter by category / date / price; sort by date or price; like/favorite with optimistic updates (server-backed). Events load via a route loader into the TanStack Query cache.
- **`/events/:id` — Event details.** Loader fetches the event before render; **reviews are streamed** with `defer` + `Await` + `Suspense` (a deliberate delay simulates a slow source). "Book Now" navigates to the booking flow.
- **`/book/:eventId` — Booking flow.** 3 steps via `useReducer`: select tickets (live total) → attendee info (validated with React 19 **form actions**) → confirmation (`useOptimistic` for instant feedback). Submitted via a TanStack Query mutation with rollback.
- **`/my-bookings` — My Bookings.** TanStack Query with tuned `staleTime`/`gcTime`; Upcoming / Past / **Cancelled** filter (Cancelled is a **conditional query**); cancel with an optimistic update + rollback.
- **`/create-event` — Create Event.** Redux Toolkit multi-step wizard: basic info → date/location/dynamic ticket types → preview & publish. Draft persists to `localStorage`; publish goes through a React Router route action + a `createAsyncThunk`.
- **`/profile` — Profile.** Reads the current user from the root route's loader via `useRouteLoaderData`.
- **Theme** — light/dark toggle in the header, persisted to `localStorage`.
- **404 + per-route `errorElement`** for unmatched URLs and load/render errors.

## Required APIs — where each lives

| API / concept                                                      | File(s)                                                                                         |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `createBrowserRouter`, `errorElement`, 404                         | `router.tsx`                                                                                    |
| Loaders + `ensureQueryData` (loader ↔ Query coexistence)           | `queries/loaders.ts`                                                                            |
| Route `action` (form submission)                                   | `store/create-event.action.ts` + `router.tsx`                                                   |
| `defer` + `Await` + `Suspense`                                     | `pages/EventDetailPage.tsx`, `api/reviews.ts` (delay)                                           |
| `useRouteLoaderData`                                               | `pages/ProfilePage.tsx` (root loader in `queries/loaders.ts`)                                   |
| `useNavigation` (loading during navigation)                        | `components/Layout.tsx`                                                                         |
| TanStack `useQuery`, caching, `staleTime`/`gcTime`                 | `queries/queries.ts` (factories), `queries/use*Query.ts`                                        |
| `useMutation` + optimistic update + rollback                       | `queries/useFavoritesMutation.ts`, `useCancelBookingMutation.ts`, `useCreateBookingMutation.ts` |
| Conditional query (`enabled`)                                      | `queries/useBookingsQuery.ts` (Cancelled tab)                                                   |
| `invalidateQueries`                                                | the mutation hooks + `store/create-event.action.ts`                                             |
| `useDeferredValue` (search)                                        | `pages/EventsPage.tsx`                                                                          |
| `useOptimistic` (confirmation)                                     | `components/BookingFlow.tsx`                                                                    |
| Form actions / `useActionState` + `useId`                          | `components/AttendeeDetailStep.tsx`                                                             |
| `useReducer` (booking steps, filters)                              | `hooks/useBookingReducer.ts`, `hooks/useFiltersReducer.ts`                                      |
| Redux Toolkit: `configureStore`, `createSlice`, `createAsyncThunk` | `store/index.ts`, `store/create-event.slice.ts`                                                 |
| Draft → `localStorage` (subscribe + `preloadedState`)              | `store/index.ts`                                                                                |
| Context (theme, simulated auth)                                    | `context/`                                                                                      |

## Architecture notes

- **Loader + TanStack Query coexistence.** A route loader calls `queryClient.ensureQueryData(query)` to prime the cache before render; the component reads the same key with `useQuery`. One query factory per resource (`queries/queries.ts`) keeps the loader and component on the same key. The loader/`useNavigation` own first-load state; `useQuery` owns refetch/errors after.
- **Two kinds of "optimistic."** Favorites and booking cancellation use **cache-level** optimism (TanStack `onMutate`/`onError`/`onSettled`). The booking confirmation uses React's **UI-level** `useOptimistic` inside a transition.
- **Redux scope.** Redux Toolkit holds _only_ the create-event wizard (form state + dynamic tickets + publish thunk). Everything server-backed stays in TanStack Query.
- **json-server quirk.** v1 coerces numeric-looking query values to numbers, so filtering a string id (`?eventId=1`) misses. Reviews are therefore filtered client-side in `api/reviews.ts`.
- **Folder layout** — `api/`, `components/`, `context/`, `hooks/`, `lib/`, `pages/`, `queries/`, `reducers/`, `store/`, `types/`, `utils/`.

## API endpoints (json-server)

- `GET /events`, `GET /events/:id`, `POST /events`
- `GET /bookings?userId=user1` (optionally `&status=`), `POST /bookings`, `PATCH /bookings/:id` (cancellation sets `status` to `"cancelled"`)
- `GET /users/:id`, `PATCH /users/:id` (favorites)
- `GET /reviews` (filtered by `eventId` client-side)
