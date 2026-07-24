---
title: New Route
description: Adding your first route from the admin panel.
next: cheat-sheet.md
nextTitle: Cheat Sheet
---

In this section, we will delve a bit deeper into the philosophy of L7 routing.

Minimum necessary structural elements:

`Server` - Your target backend

`Pool` - Load balancer abstraction. If you have multiple backends across which you want to distribute the load, you wrap them in a pool. If you have only one backend, place it in a pool.

`Route` - A route leading to a specific endpoint

Note that each entity corresponds to a section in the left sidebar.

## 1. Add a Server

Go to the Servers section. Fill in the form:
Key – a human-readable server name.
Address – the server's IP address or domain name. Port – if applicable.
Next, select `Add server` and `Apply`.

## 2. Add a Pool

Go to the Pools section. Fill in the form:
Enter the pool key and click `Add`.
Select the pool you created from the list that appears. Choose the desired server from the drop-down list and click `Add`.
Then click `Apply`.

## 3. Add the Route

Go to the Pools section. Fill in the form:
Click `New route`.
In the row that appears, fill in the three mandatory fields: Method, Path, and Target (the pool created in the previous step).
Click Apply and verify that it works.

## Next

That's a request routed end to end through the admin panel. The [Cheat Sheet](#cheat-sheet) has the commands and config blocks you'll reach for most from here.
