# Employee Management Application

An Angular 17 application for managing employee records, built with NgRx state management and PrimeNG UI components.

## Features

- View all employees in a paginated table
- Search employee by ID
- Add new employee with form validation
- Edit existing employee (pre-populated form)
- Delete employee with confirmation dialog
- Display employee country from country list
- Loading states for all async operations
- Error handling with user-friendly messages
- Empty state handling
- Responsive UI (desktop, tablet, mobile)

## Technology Stack

| Technology | Version |
|---|---|
| Angular | 17.3.x |
| TypeScript | ~5.4.2 |
| NgRx Store | 17.x |
| NgRx Effects | 17.x |
| NgRx Entity | 17.x |
| PrimeNG | 17.x |
| PrimeFlex | latest |
| PrimeIcons | latest |
| RxJS | ~7.8.0 |
| Jasmine / Karma | ~5.1.0 / ~6.4.0 |

## Installation

```bash
npm install
```

## Run Application

```bash
npm start
```

The app runs at `http://localhost:4200`.

## Run Tests

```bash
npm test
```

## Build Application

```bash
npm run build
```

Output is placed in `dist/employee-management/`.

## API Endpoints

| Operation | Method | URL |
|---|---|---|
| Get all employees | GET | `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee` |
| Get employee by ID | GET | `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/:id` |
| Create employee | POST | `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee` |
| Update employee | PUT | `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/:id` |
| Delete employee | DELETE | `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/:id` |
| Get all countries | GET | `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country` |

## Project Structure

```
src/app/
├── core/
│   └── services/
│       ├── employee.service.ts       # Employee API calls
│       └── country.service.ts        # Country API calls
├── models/
│   ├── employee.model.ts             # Employee interface
│   └── country.model.ts              # Country interface
├── store/
│   ├── employee/
│   │   ├── employee.actions.ts
│   │   ├── employee.reducer.ts       # NgRx Entity adapter
│   │   ├── employee.effects.ts
│   │   └── employee.selectors.ts
│   └── country/
│       ├── country.actions.ts
│       ├── country.reducer.ts
│       ├── country.effects.ts
│       └── country.selectors.ts
├── features/
│   └── employees/
│       ├── employees-page/           # Smart component (store + dispatch)
│       ├── employee-list/            # Dumb component (@Input/@Output)
│       └── employee-form/            # Dumb component (@Input/@Output)
├── app.component.ts
├── app.config.ts                     # NgRx + HttpClient + Animations providers
└── app.routes.ts
```

## NgRx Architecture

**Store slices:**
- `employees` — NgRx Entity state for employee list, plus search state
- `countries` — Plain array of country records

**Effects** handle all HTTP calls and dispatch success/failure actions.

**State updates** happen entirely through the reducer — no direct mutations, no browser reload.

## Smart / Dumb Component Architecture

**Smart Component** (`EmployeesPageComponent`):
- Injects NgRx `Store` and `Actions`
- Selects data from the store with selectors
- Dispatches actions on user events
- Passes data down and listens to child events

**Dumb Components** (`EmployeeListComponent`, `EmployeeFormComponent`):
- Receive data via `@Input()`
- Emit events via `@Output()`
- No direct store access

## Form Validation

| Field | Rules |
|---|---|
| Name | Required, max 100 chars |
| Email | Required, valid email, max 150 chars |
| Mobile | Required, valid number pattern, max 15 chars |
| Country | Required (dropdown) |
| State | Required, max 100 chars |
| District | Required, max 100 chars |

Validation messages display below each field after the user touches it.

## Assumptions

- The employee API returns `emailId` as the primary email field (some records also have `email`)
- Country is matched using `countryId` when available; falls back to the `country` string field
- The mock API does not enforce strict field constraints, so validation is handled entirely client-side
- SSR (Server-Side Rendering) has been disabled — the application runs as a standard SPA

## Known Limitations

- The mock API returns a shared dataset; new records created by other users are also visible
- The `country` field on some existing records contains a country name string rather than an ID, so country lookup may show the raw string for legacy records without `countryId`
- Mobile number regex allows international formats (e.g., `+91...`) but does not do country-specific validation
