---
title: Routers
description: Switching between and managing isolated router instance.
next: settings.md
nextTitle: Settings
---

Routers aren't a sidebar section — they live in the top bar, next to the logo.

## The switcher

The `Router being edited` dropdown lists every router; the current primary is marked `(primary)`. Picking a router here decides which one's data you see and edit in Servers, Pools, Roles and Routes.

This choice is purely local — it's saved in your browser and doesn't affect which router actually serves traffic. That's what "primary" is for, below.

## The Manage panel

The `Manage` button next to the switcher opens a panel listing every router. For each one:

- `Make primary` — makes this router the one serving live traffic. Not shown for the router that's already primary.
- A delete (`×`) button — disabled for the primary router, and confirmed before it runs.

### Adding a router

Enter a key in `New router` and click `Add`. The key is required and must be unique — creating a router with a key that already exists is rejected. New routers start empty: no servers, pools, roles or routes.

### Deleting a router

Deletion is rejected if the router is primary, or if it's the last router left — at least one has to remain. Reassign primary to another router first if needed.

## Applying changes

Routers behave a bit differently from the rest of the admin panel:

- Creating or deleting a router takes effect and is saved immediately — no need to click `Apply` in the top bar afterward.
- `Make primary`, on the other hand, only updates the configuration; it doesn't switch live traffic over. Click `Apply` in the top bar to make the new primary actually take over.

The `Apply` button in the top bar lights up (turns solid) whenever there are unapplied changes, `Make primary` included. Clicking it prompts:

> Apply these changes now?
> 1. They take effect immediately.
> 2. They're saved to persistent storage only if the server is running in local config mode — otherwise they're lost on restart.
> 3. Once applied, this cannot be undone.

Because create/delete already applied themselves, `Apply` may still light up right after one of those actions — that's harmless. Clicking it just re-applies the current configuration, which is already in effect.

## Next

[Settings](#settings) covers the account, appearance and gateway options in the settings panel.
