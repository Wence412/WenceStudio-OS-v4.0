# Phase 6 . Public-Safe Catalog Build

The catalog build now supports an explicit public mode:

```bash
node scripts/build-systems-exchange.mjs apps/systems-exchange/data/public-systems.json --public
node scripts/validate-public-systems-exchange.mjs apps/systems-exchange/data/public-systems.json
```

Public mode includes only registry records with `listing_status: APPROVED`. The output contains no specification paths, implementation paths, pilot records, owner details, or reviewer details. With the current registry, the safe public catalog contains zero records because no system has been approved for public listing.

This is a build safeguard. It does not deploy GitHub Pages or change repository visibility.
