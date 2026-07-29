---
title: Settings
description: Account, appearance, and gateway configuration.
next: cheat-sheet.md
nextTitle: Cheat Sheet
---

Settings opens as a side panel from the gear icon in the top bar. Unlike Servers/Pools/Roles/Routes/Routers, it isn't scoped to a router — it covers Account, Appearance, and Admin access/Gateway.

## Account

Enter Current password and New password (8 characters minimum) and click `Change password`. A new password under 8 characters is blocked client-side before it's even sent. The current password is checked against the account's actual password — a mismatch comes back as an error toast. On success both fields clear.

This is the one action on this page that applies and saves immediately, with no need to click `Apply` in the top bar. Use the new password on your next login.

## Appearance

- **Theme** — Dark or Light.
- **Language** — English, Deutsch, Polski, or Українська.

Both live in your browser's local storage and take effect instantly. Neither touches the router configuration on the server. Switching language redraws the open interface, including the settings panel itself, on the spot.

## Admin access

- **Admin panel path** — where the admin panel itself is served from (e.g. `/admin`). Takes effect after a server restart.

## Gateway

- **TLS certificate path**
- **TLS key path**
- **Session length (seconds)** — minimum 60; a blank or non-numeric value falls back to 3600.

## Save settings

`Save settings` sends the admin panel path, TLS paths, and session length together in one request. It applies and saves immediately — no follow-up click on `Apply` in the top bar needed.

Changing the admin panel path also moves the panel's own internal routes over to the new path as part of the same save.

## A note on the top-bar Apply button

Even though both actions on this page apply immediately, the `Apply` button in the top bar can still light up afterward as if something's pending. It isn't — everything here is already applied and saved. Clicking `Apply` anyway is harmless; it just re-applies the configuration that's already in effect.

## Next

That's every panel in the admin interface. The [Cheat Sheet](#cheat-sheet) has the commands and config blocks you'll reach for most from here.
