---
title: Inside The Core: Why We Built On Pingora
date: 2026-06-02
author: Punkolink Team
tag: Engineering
readTime: 6 min read
excerpt: We didn't write our own proxy core from scratch. Here's why building on Cloudflare's Pingora was the right call for a router meant to disappear into the background.
---

When you're building a product whose entire pitch is "boring, reliable routing," the last thing you want is a proxy core with something to prove. That's the short version of why Punkolink is built in Rust on top of Cloudflare's Pingora framework, rather than a bespoke core.

## What Pingora gives us

Pingora already handles the parts of an L7 proxy that are easy to get subtly wrong: connection pooling under load, graceful upgrades, and the kind of memory safety Rust provides by construction rather than by discipline. Cloudflare built it to replace NGINX at a scale most of us will never personally operate — which means the edge cases we'd hit in year three of running Punkolink in production, Pingora hit years ago.

```rust
// simplified: how a Punkolink route resolves through the Pingora request lifecycle
async fn upstream_peer(&self, session: &mut Session) -> Result<Box<HttpPeer>> {
    let route = self.router.match_request(session.req_header())?;
    Ok(Box::new(route.pick_upstream()?))
}
```

## What we build on top

Pingora gives us the plumbing. Punkolink is everything layered on top of it: the routing table, the config model, health checking, and the operational behavior that makes it feel like a single coherent product instead of a framework you have to assemble yourself.

**We didn't want to spend our first two years re-discovering bugs Cloudflare already fixed.** Building on Pingora let us spend that time on the part that's actually our job — making routing decisions correctly and predictably, at your scale.

## The tradeoff, honestly

Building on someone else's core means our release cadence is partly downstream of theirs. We've made peace with that trade — a security fix that lands in Pingora lands in Punkolink fast, because we're not maintaining a fork of the hard parts.
