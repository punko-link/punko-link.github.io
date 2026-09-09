---
title: A Gigabyte for Fifty Megabytes
subtitle: Why thousands of small projects create a large false demand for compute — and what to do about it
description: Data centers are more expensive than ever before — and it's not just about the money. How much of that rented capacity is actually doing useful work?
tag: Concept
date: 2026-09-08
author: Glab Strizhkov
readingTime: 7 min read
---

Data centers are more expensive than ever before—and it's not just about the money. According to estimates by the International Energy Agency, data centers consumed about 415 terawatt-hours of electricity in 2024—roughly 1.5 percent of global consumption—and this figure has been growing by 12 percent annually. Under the IEA's baseline scenario, this figure will double by 2030 to about 945 terawatt-hours, and in the U.S., the expansion of data centers will account for half of the total increase in electricity demand. Simply put, what used to be a minor item on the planet's utility bill is becoming one of the main burdens on the power grid.

This raises an important question: how much of this demand is genuine? How many of the rented servers are actually performing a useful task, and how many are simply taking up space in the rack and in the invoice?

I want to talk about a telling example of this mismatch. Thousands of educational, hobby, and DIY projects that, in practice, use tens of megabytes of RAM, even though a gigabyte is reserved for each project. On the scale of a single project, this is a trifle. But there are hundreds of thousands of such projects, and collectively they amount to what I will henceforth refer to as “false demand for infrastructure”: demand that does not correspond to any real load.

Let's start by saying that the discrepancy between “rented” and “used” is not my guess, but a measured fact of the industry.

Every year, the Flexera State of the Cloud survey polls hundreds of technical leaders and consistently finds that a significant portion of cloud spending is not justified. In 2026, this share was 29%; in 2019–2020, it was 30%; in 2021, 32%; in 2022–2023, 28%; and 27% from 2024 to 2025. The stability of this metric is the key takeaway here: this is not a glitch; it is a structural feature. According to Gartner's calculations, 675 billion dollars were spent on nothing. According to Harness's estimate (FinOps in Focus 2025), the figure is 44.5 billion in a single year.

Flexera directly identifies the reason why this trend has persisted for years: fewer than half of developers have access to real-time data on idle resources, and only one-third can see whether a workload is overprovisioned. You can't optimize what you can't see.

The problem becomes even clearer when you look at the hardware level. A McKinsey study showed that servers in corporate data centers are rarely utilized at more than 6% of their capacity. And research by Jonathan Koomey (Stanford) in collaboration with the Anthesis Group found that 30% of them are “comatose.” These servers were consuming electricity but had not performed any useful work for half a year or longer. On a global scale, that amounts to 10 million servers, or 30 billion dollars in idle costs. The Uptime Institute independently arrived at similar figures.

The industry has long been systematically paying for what it doesn't use. A hobby project with a gigabyte-sized instance for a 50-megabyte database isn't an anomaly—it's a miniature version of the problem.

Here the objection arises: “So what? The provider sells memory with a margin and will give my surplus to someone else. No one loses anything.” It sounds convincing, but such a statement is false.

In 2007, Luiz André Barroso and Urs Hölzle of Google, in their article “The Case for Energy-Proportional Computing,” articulated a problem that still plagues us today: an ideal machine would consume no energy when under no load. But real hardware isn't capable of that. Measurements show just how far it falls short. According to data from the U.S. Department of Energy, the typical server load is 10–15%. Nevertheless, a server's power consumption when idle reaches 60–80% of its power consumption under load. More up-to-date figures from the Kepler project at the CNCF, as shown by the SPECpower benchmark, range from 20% to 60% of the maximum, depending on the hardware generation. It is important to keep this key fact in mind: a 10-fold reduction in load does not result in a 10-fold reduction in power consumption; it remains closer to the midpoint of the maximum range.

What can be done about all this? The most promising answer is to share computing resources. This involves bundling a large number of small projects into dense clusters on a shared infrastructure, rather than providing each one with its own dedicated instance with excess capacity.

With this approach, it's important to be honest with yourself. The idea isn't new. Shared memory and computing are implemented in Neon and PlanetScale, while thousands of small SQLite instances run on shared infrastructure—Cloudflare D1. Dense workload orchestration is the bread and butter of orchestrators like Kubernetes.

So the problem isn't technical; it lies in defaults and incentives. Why does “1 project – 1 instance” remain the standard for a startup, a project under development, or even a side project? Because that's what most manuals and tutorials aimed at a broad audience say. Because “scale-to-zero” seems like “advanced” magic. Because no one is personally accountable for an empty gigabyte—it gets lost in the hosting bill.

Dense packaging comes at a price that can't be ignored: weak isolation compared to classic virtualization, the problem of noisy neighbors, greater difficulty in building reliable security, and significant losses in the event of a “shared” machine failure. The point of this article isn't that “Oh, I came up with a solution”; it's that the industry—and each of us—regularly finds itself at a crossroads: pay for the convenience of the default, or use resources efficiently. Unfortunately, we still often automatically choose the former.

Let's go back to where we started. The day is approaching when data centers will consume 3% of the world's electricity, and in certain regions, they will account for half of the total increase in electricity demand. Against this backdrop, the conversation is no longer about saving $5 on hosting services. Now it's a conversation about engineering ethics: we've gotten used to ordering with a margin of safety. That margin comes at the cost of electricity and hardware production.

False demand isn't reduced by heroic decisions, but by working on default behaviors—calculating actual needs rather than ordering blindly. Opt for “scale-to-zero” where the load is sporadic—and in pet and other projects of a similar scale, it's always sporadic.

Cooperation on this issue could be the solution. One gigabyte of freed-up RAM or one CPU core won't make much of a difference, but hundreds of thousands will.

## Sources

- [Barroso & Hölzle — “The Case for Energy-Proportional Computing” (IEEE Computer, 2007)](https://doi.org/10.1109/MC.2007.443)
- [eWeek — “30% of servers worldwide sit idle, report says”](https://www.eweek.com/servers/30-percent-of-servers-worldwide-sit-idle-report-says/)
- [Forbes Councils — “Strategies to manage cloud spend post cloud-boom”](https://councils.forbes.com/blog/strategies-to-manage-cloud-spend-post-cloud-boom)
- [Spendark — “State of Cloud Waste 2026”](https://spendark.com/blog/state-of-cloud-waste-2026)
- [CNCF TAG Environmental Sustainability — “Idle power matters”](https://tag-env-sustainability.cncf.io/blog/2024-06-idle-power-matters)
- [Flexera — “Cloud value is rising while AI waste grows”](https://www.flexera.com/about-us/press-center/flexera-finds-cloud-value-is-rising-while-ai-waste-grows)
