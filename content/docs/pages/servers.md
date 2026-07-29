---
title: Servers
description: Backends your router can forward traffic to.
next: pools.md
nextTitle: Pools
---

The Servers section lists the backend servers a router can forward traffic to. It's scoped to whichever router is currently selected in the router switcher at the top of the page — see [Routers](#routers) to switch or manage routers.

## The table

Each row is one server:

- **Key** — the server's identifier. Read-only once created; to rename a server, delete it and add it again.
- **Address** — editable in place.
- **Port** — editable in place, 1–65535.
- **Pools** — the pools this server belongs to, shown as clickable chips.
- A delete (`×`) button.

## Adding a server

Fill in Key, Address and Port above the table and click `Add server`. All three fields are required. Unlike editing an existing server, adding one is sent to the server immediately.

## Editing address, port and pool membership

Address and Port fields are editable directly in the table, and pool membership toggles with a click on the pool chips (filled = member). None of this is sent until you click `Apply changes` at the bottom of the page — reloading the page or navigating away loses whatever hasn't been applied yet.

`Apply changes` batches every pending address/port edit and pool membership change into one set of requests. On success the table reloads and pending edits are cleared; if any request fails you'll see the error, and the table still reloads with whatever did make it through.

This is a different button from the `Apply` button in the top bar. `Apply changes` only commits your edits into the router's configuration. Making them take effect on live traffic — and persisting them to disk, if the server is running in local config mode — still requires `Apply` in the top bar. See [Routers](#routers) for details.

## Deleting a server

The `×` button deletes immediately after a confirmation prompt — no need to hit `Apply changes` first. As with any other write here, the deletion still needs `Apply` in the top bar to reach live traffic.

## Next

[Pools](#pools) covers grouping servers so routes can load-balance across them.
