---
title: Roles
description: Access policies routes can require.
next: routes.md
nextTitle: Routes
---

Roles are the access policies routes can require. This section is scoped to whichever router is selected in the switcher at the top of the page — see [Routers](#routers).

## The list

Like Pools, each role is a collapsible card showing its name and how many routes it has access to. The delete (`×`) button in the header removes the role after confirmation.

## Creating a role

Enter a name above the list and click `Add`.

## Routes with access

Inside an expanded role card:

- **Routes with access** — routes this role can already reach, as chips with a remove (`×`). Clicking it revokes access immediately.
- A dropdown of routes the role doesn't have access to yet, plus `Add`, to grant access immediately.

Granting or revoking access here edits the same **Roles allowed** field you can edit directly on a route in [Routes](#routes) — it's the same role ↔ route relationship, just viewed from the role's side instead of the route's.

Every action in this section — creating a role, deleting one, granting or revoking route access — is sent immediately, with no staging step.

## Deleting a role

Deleting a role automatically strips it from every route's allowed-roles list. Unlike deleting a pool, this isn't blocked by anything — no need to touch the affected routes first.

## Applying changes

As with Servers/Pools/Routes, writes here land in the router's configuration immediately but don't reach live traffic until you click `Apply` in the top bar. See [Routers](#routers).

## Next

[Routes](#routes) is the routing table itself — method, path, target, and access, row by row.
