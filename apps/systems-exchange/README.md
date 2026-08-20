# WenceStudio Systems Exchange Catalog

This is a dependency-free static catalog interface for the WenceStudio Systems Exchange.

## Run locally

Open `index.html` in a modern browser. No build process or package installation is required.

## Data source

The current interface mirrors the initial records in:

`../../16-systems-exchange/SYSTEMS-REGISTRY.yml`

For production use, replace the duplicated browser data in `app.js` with a build step that validates and transforms the registry YAML into a versioned JSON payload.

## Controls shown in the interface

- Search by system, outcome, or operating domain
- Filter by operating domain, risk tier, and listing state
- Review system record details in an accessible dialog
- View visible risk, data classification, trigger, and human-approval controls
- Switch between light and dark themes
