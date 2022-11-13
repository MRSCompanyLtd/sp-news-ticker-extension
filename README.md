# sp-important-news

## Summary

Uses SPFx application customizer page placeholders to provide a Breaking News ticker at the top of a SharePoint site.

[picture of the solution in action, if possible]

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.15-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> Create SharePoint list on the target site called "Breaking News" and add a "Link" (single line of text) field. Use the default "Title" field for the content of the news item. The Link field allows you to add a click-through for the user.

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| newsTicker | [MRS Company Ltd](https://mrscompany.com) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | November 12, 2022 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

```bash
git clone { repo } # Clone repository
cd { repo } # Change to repo directory
npm install # Install dependencies
gulp serve # Start dev environment (remember to change url in /config/serve.json)
gulp build # Build solution
gulp bundle --ship # Bundle solution for prod
gulp package-solution --ship # Create sppkg file
```

Then upload /sharepoint/*.sppkg to your App Catalog.

## Features

Demonstrates the following concepts:  
- Pull list items from SP REST API.
- Use page placeholders in Application Customizer with SPFx.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
