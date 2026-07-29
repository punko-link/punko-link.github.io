---
title: Pools
description: Reusable server groups routes target.
next: roles.md
nextTitle: Roles
---

Pools group servers together so routes can target the group instead of a single server. Like Servers, this section is scoped to whichever router is selected in the switcher at the top of the page — see [Routers](#routers).

## The list

Each pool is a collapsible card showing its key and member count. Click the header to expand or collapse it. The delete (`×`) button in the header removes the pool after confirmation, without triggering the expand/collapse.

## Creating a pool

Enter a key above the list and click `Add`. A new pool starts with no members.

## Members

Inside an expanded pool card:

- **Members** — current servers, as chips with a remove (`×`) on each. Clicking it drops that server from the pool immediately.
- A dropdown of servers not yet in the pool, plus `Add`, to add one immediately.

Every action in this section — creating a pool, adding or removing a member, deleting a pool — is sent to the server right away. There's no staging step and no `Apply changes` button like on the Servers page.

## Deleting a pool

A pool can't be deleted while any route still targets it. If you try, you'll get an error listing which routes reference it — repoint or remove those routes first.

## Applying changes

Writes here land in the router's configuration immediately, but — same as Servers/Roles/Routes — they don't reach live traffic on their own. Click `Apply` in the top bar to activate them. See [Routers](#routers).

## Next

[Roles](#roles) covers the access policies routes can require.
