---
title: "Postmortem: The Night 8 Nodes Went Down"
date: 2026-05-11
author: Punkolink Team
tag: Postmortem
readTime: 7 min read
excerpt: A rack lost power mid-deploy. Eight backend nodes dropped inside four seconds. Here's what the router did about it, and what we changed afterward.
---

At 02:14 UTC, a PDU fault took out power to a full rack in one of our reference customer's clusters. Eight backend nodes went dark within four seconds of each other, mid-deploy, during a traffic window that was not their quietest.

This is the postmortem, shared with permission, lightly anonymized.

## What the router saw

Punkolink's health checker runs on a 2-second interval per upstream by default. Within one interval of the first node dropping, it was marked unhealthy and pulled from the routing table. By the third interval, all eight were out.

```toml
[health_check]
interval_ms = 2000
timeout_ms = 800
unhealthy_threshold = 1
```

No request was routed to a dead node after its first missed check. Live traffic redistributed across the remaining healthy nodes in the pool automatically — no manual failover, no page acknowledged before the system had already recovered.

## Where it wasn't perfectly clean

The story isn't spotless. p99 latency rose for roughly ninety seconds while the remaining nodes absorbed the redistributed load before autoscaling caught up. That's the part we spent the most time on afterward — not the failover itself, which worked, but the thundering-herd period right after.

- We tuned `unhealthy_threshold` down for faster ejection on already-degraded upstreams
- We added jittered reconnection backoff so recovering nodes don't get slammed the instant they're marked healthy again
- We now surface per-upstream saturation in the metrics endpoint, not just aggregate load

## The actual takeaway

Nobody on the on-call rotation that night needed to make a routing decision. **The system had already made the right one before the first page went out.** That's the whole design goal — the router should be the most boring part of the incident, not the reason for it.
