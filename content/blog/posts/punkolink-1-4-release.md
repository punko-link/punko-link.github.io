---
title: "Punkolink 1.4: Faster Health Checks, Smaller Binaries"
date: 2026-04-20
author: Punkolink Team
tag: Release
readTime: 4 min read
excerpt: 1.4 ships sub-millisecond health check overhead, a 30% smaller binary, and a config linter that catches routing mistakes before they ship.
---

Punkolink 1.4 is out. This release is mostly about shaving milliseconds and megabytes off things that were already fine — because "already fine" isn't the bar we hold ourselves to.

## Faster health checks

The health check loop was rewritten to reuse connections instead of opening a fresh one per probe. On a 500-upstream pool, this cut health-check-related overhead from ~3ms to sub-millisecond per cycle.

## Smaller binary

Trimming unused Pingora feature flags and switching to a leaner allocator brought the release binary down about 30%, which matters most for teams shipping Punkolink inside minimal container images.

## Config linting, before you apply

The single most requested feature from support tickets: catch a broken route before it's live, not after.

```bash
$ punkolink lint ./punkolink.toml
✗ route "api-v2" has no healthy upstream group defined
✓ 14 other routes passed
```

## Upgrading

1.4 is a drop-in upgrade for anyone on 1.x — no config schema changes. As always, our engineers are on call if the upgrade doesn't go the way this changelog says it should.
