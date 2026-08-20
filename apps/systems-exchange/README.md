# WenceStudio Systems Exchange Catalog

This is a dependency-free static catalog interface for the WenceStudio Systems Exchange.

## Data source

The canonical source is:

`../../16-systems-exchange/SYSTEMS-REGISTRY.yml`

The browser does not embed system records. The deployment workflow transforms the registry into `data/systems.json` at build time.

## Run locally

Generate the catalog data, then serve the application directory with a local static server:

```bash
node scripts/build-systems-exchange.mjs apps/systems-exchange/data/systems.json
cd apps/systems-exchange
python -m http.server 8080
```

Open `http://localhost:8080` in a modern browser.

## GitHub Pages

The repository contains `.github/workflows/deploy-systems-exchange.yml`. Once GitHub Pages is configured to use GitHub Actions, each qualifying push to `main` generates the catalog data and deploys this interface.

## Controls shown in the interface

- Search by system, outcome, or operating domain
- Filter by operating domain, risk tier, and listing state
- Review system record details in an accessible dialog
- View visible risk, data classification, trigger, and human-approval controls
- Switch between light and dark themes
