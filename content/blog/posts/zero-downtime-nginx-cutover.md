---
title: Zero-Downtime Cutover: Migrating From NGINX Ingress To Punkolink
date: 2026-07-14
author: Punkolink Team
tag: Migration
readTime: 9 min read
excerpt: A field-tested playbook for moving production traffic off NGINX Ingress and onto Punkolink without a single dropped request.
---

Every migration guide promises "zero downtime." Most of them mean "we didn't notice the downtime." This one is different — we cut a real production cluster over from NGINX Ingress to Punkolink, progressively, with traffic mirrored and measured at every step.

This is the playbook we used, and the one we hand to customers doing the same move.

## Why teams leave NGINX Ingress

NGINX Ingress does its job. The complaints we hear from teams migrating away are rarely about correctness — they're about operational weight: reload-based config changes that briefly drop connections, an annotation surface that's grown past what any one engineer can hold in their head, and a controller that's doing far more than routing.

Punkolink is scoped narrower on purpose. One job — L7 routing — done without the reload tax.

## Step 1: Mirror traffic before you touch anything

Before any cutover, stand up Punkolink alongside your existing ingress and mirror a copy of production traffic to it. Nothing user-facing depends on this yet — it exists purely to compare behavior.

```yaml
mirror:
  source: nginx-ingress
  target: punkolink-shadow
  sample: 100%
  compare: [status_code, latency_p99, response_hash]
```

Run this for at least one full traffic cycle — including your weekly peak — before moving forward.

## Step 2: Shift 1% of real traffic

Once the shadow comparison is clean, start moving real traffic in small increments. We favor weighted DNS or a load balancer target group over a hard switch — 1%, then 10%, then 50%, watching error rate and p99 latency at each step.

- Hold each step for at least one deploy cycle
- Alert on any p99 regression greater than 5ms
- Keep the old ingress warm and reachable until the last step is done

## Step 3: Cut the rest over, then decommission

By the time you're at 100%, this step should be uneventful — which is the point. Nothing about a good migration should be dramatic. Decommission the old ingress controller only after it's carried zero production traffic for a full week.

**The whole migration took our reference cluster eleven days, with zero customer-visible incidents.** That's not a coincidence — it's what happens when the router's only job is routing.
