# LOCKD source review

Reviewed on 5 November 2026 for the portfolio, using the original LOCKD build checkout and commit `315c15d9bd99765293a11e57a47c85207bda38e3` from `dirtydawkins/lockd2`. No LOCKD application, database, provider configuration or production records were changed.

## Confirmed architecture

- HTML/CSS/JavaScript frontend and Node.js API handlers on Vercel.
- Supabase Auth, PostgreSQL migrations, row-level policies and object storage.
- Python FastAPI service on Render, with Pydantic validation and Uvicorn.
- MapLibre client assets and PostGIS SQL query definitions.
- Booking RPCs use transaction/advisory locks and customer-scoped idempotency keys. These are code observations; source existence alone does not establish concurrency behavior in production.

Actual schema includes `lockd_listings`, `lockd_listing_availability`, `lockd_bookings`, `lockd_booking_events`, conversation/message tables and document/verification tables. Migration `20261028_0004_lockd_owner_publishing.sql` defines listing publication and ownership checks. Migration `20261031_0008_lockd_reservations.sql` contains quote/availability and reservation functions. Messaging policies restrict conversation access to participants. The source contains 26 migration files; applied production state was not re-audited.

## API inventory observed in source

The Vercel entry points include `/api/listings`, `/api/owner-listings`, `/api/listing-images`, `/api/availability`, `/api/bookings`, `/api/messages`, `/api/documents`, `/api/trust` and `/api/nearby`. Their handlers delegate authorization and data operations to the existing backend modules and SQL functions.

The FastAPI application defines public health/readiness routes, protected `/v1/risk/assess` and `/v1/rentals/eligibility`, protected integration checks for Daraja and Paystack, and provider/job/document routes. Service calls require a bearer credential; public webhook handlers have separate validation. Secrets and environment values were not retrieved or copied.

## Checks performed in this review

- `node scripts/check-marketplace.cjs`: 15 read-only checks passed. This covers source syntax, public asset references, deployment exclusions and structural policy checks; it does not run record-dependent integration scenarios.
- Existing Python environment: `python -m unittest -v test_app`: 8 local tests passed. They cover authorization, validation, request-size bounds, abuse limits, logging and advisory responses using local TestClient requests.
- Live Render `/health`: HTTP 200 with `status: ok`, `rules_version: rules-1` and `trained_model: false`.
- Live `/api/bookings?capabilities=1`: HTTP 200 with `requestsEnabled: false` and `paymentsEnabled: false` at review time.

## Provider and rollout evidence

`PAYMENT_CONNECTION_RELEASE.md` records successful Daraja sandbox credential authorization on 2 November. That record distinguishes connection authorization from payment collection, callbacks, settlement, refunds and booking confirmation. It records Paystack configuration as a separate step. The current source contains both connection adapters.

The public portfolio describes the implemented stack and architecture without claiming that every integration is operational. It does not publish internal rollout labels, private account details or test records. No paid rental, payout, government verification, trained fraud model or authenticated live inference was exercised during this review.
