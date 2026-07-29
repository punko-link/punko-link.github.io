---
title: Routes
description: The routing table — method, path, target, and access, row by row.
next: routers.md
nextTitle: Routers
---

The Routes table is the routing table: method, path, handling type, target pool, and access requirements. It's scoped to whichever router is selected in the switcher at the top of the page — see [Routers](#routers).

## The table

Each row is one route:

- **Method** — `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
- **Path** — e.g. `/api/users/:id`.
- **Type** — one of six handling types, with a tooltip on hover:
  - `Authorize` — the gateway's own auth-handling route.
  - `Static (cached)` — GET responses are cached in redis.
  - `Dynamic` — passed straight through to the target pool.
  - `Authorize (controller)` — same as `Authorize`, served by a built-in controller instead of a backend pool.
  - `Static (controller, cached)` — served by a built-in controller; GET responses cached in redis.
  - `Dynamic (controller)` — served directly by a built-in controller instead of a backend pool.
- **Target** — the pool this route forwards to (see [Pools](#pools)).
- **Roles allowed** — clickable chips for every role in the router; filled means allowed.
- **Require authentication** — a toggle.
- **IP blacklist** / **IP whitelist** — comma-separated addresses.
- `✓` (save) and `×` (delete) buttons.

IP blacklist/whitelist always load blank — the server doesn't yet return previously saved IP lists, so re-enter them on each visit if you need to change them.

## Editing a row

Unlike Pools and Roles, Routes edits stage per row until you click `✓`:

- Field changes (method, path, type, pool, roles, auth toggle, IP lists) live only in the browser until saved.
- On save: the path gets a leading `/` if missing; a target pool is required (empty target blocks the save with "Select a target pool."); an empty path is also blocked.
- If method and path are unchanged, the save updates the existing route. If either changed — meaning the route's key (`METHOD+path`) changed — the save creates the new route first, then deletes the old one. Renaming a route is create-then-delete under the hood.
- `×` deletes immediately after confirmation. For a row you just added that hasn't been saved yet, it's removed with no confirmation and no request.

## Adding a route

`New route` above the table adds a blank editable row (`GET`, type `Dynamic`, no pool or roles, auth off) that doesn't exist on the server until you save it with `✓`.

## Validation

Saving is rejected if:

- the target pool doesn't exist in the current router;
- any role in **Roles allowed** doesn't exist in the current router;
- the route's key (method+path) collides with an existing route.

Errors from any of these show up as a toast.

## Applying changes

Saving or deleting a row lands the change in the router's configuration immediately, but it doesn't reach live traffic until you click `Apply` in the top bar. See [Routers](#routers).

## Next

[Routers](#routers) covers switching between routers and managing them.
