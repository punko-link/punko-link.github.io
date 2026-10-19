---
title: Interconnected Cyclical Loops as a Method for Constructing Artificial Subjectivity
description: The first post in a series on applying neurobiological patterns to the design of computational systems — a simple concept for building systems whose behavior looks subjective to an observer.
tag: Bionics
date: 2026-10-19
author: Glab Strizhkov
readingTime: 5 min read
---

With this post, I would like to begin a series dedicated to the attempt to apply certain neurobiological patterns to the design of computational systems. In it, I will explore a simple concept that would allow us to build systems whose behavior, from an observer’s perspective, would be subjective.

First of all, let’s agree on some terms so that we can all be on the same page:

A queue is a data structure based on the first-in, first-out (FIFO) principle. An element added to the queue ends up at the end of the queue. An element removed from the queue is located at the front of the queue.

A circular loop is a data structure based on a queue in which the last element added becomes the next one relative to the first, forming a loop. In such a structure, the direction of traversal remains crucial; specifically, the FIFO principle is followed, provided that the elements remain in their places, and the FIFO principle determines the order of traversal of such a structure.

Two or more queues between whose elements there are relationships outside the defined data structure, but which do not violate it, are called linked.

A class is a template according to which an object is created.

A class object is a concrete implementation of a class with its own set of data and state.

Queues form the basis of this concept because they are extremely convenient for packaging polymorphic tasks for CPU computation, since any complex data structure can be represented as a sequence of its traversals. For example, an audio file can be represented as a sequence of frequencies, and a car’s design as two sequences: a sequence of components and a sequence of connections. The car’s design, represented by these two sequences, is an example of linked sequences, since they are connected by a single common rule—there are connections between the components.

Returning to the cyclic circuit, if we view it as a data structure that we traverse in a loop, we find that it provides a convenient way to describe cyclic and rhythmic processes. Weather patterns, the alternation of day and night, and certain processes in the central nervous system—such as the functioning of short-term memory, anatomically represented by the Peipets circle.

If we assume that each element of a cyclic circuit—rather than being as simple as a number—is represented by a more complex structure, such as a class object, then we can construct a pair of interconnected cyclic circuits in which traversing one circuit will affect the state of the other and, consequently, the result of its traversal. This principle formed the basis of the design of the German Enigma cipher machine, which was a highly sophisticated algorithm for generating pseudo-random data at the time. In this case, “data” refers to a sequence of rotor positions at a specific moment that is difficult to predict. The rotors of the cipher machine formed precisely those interconnected cyclic loops discussed in this article.

Given that each element of the system can be quite complex, its behavior can affect the system by accelerating, slowing down traversal the circuit to which it belongs, or, in general, by allowing or prohibiting further bypassing if the system implements such behavior options. The connections between elements of different loops can alter the behavior of the elements themselves. Thus, two or more interconnected loops can form a system similar to a gyroscope in a moving environment, where the first loop models the rotor and the second models the suspension system in the surrounding environment. The surrounding environment can affect the second loop, and without the first loop, it would be easily influenced; however, a heavy first loop spun up to a high angular velocity will influence the second loop in such a way as to prevent changes in its behavior in response to environmental influences. Some navigation equipment operates based on this principle, and in orbit, more massive gyroscopes influence the trajectory of artificial satellites.

In the context of software, this principle can be used to construct a stable but not constant behavioral model. The ratio of the relative influence of the first and second loops in a pair can make the system more or less flexible. Combining a larger number of cyclic loops can lead to more complex, either predefined or random, behavioral models.

These properties can be used to simulate creativity and the human factor, and—in a sufficiently advanced implementation—can be interpreted by an observer as subjectively driven actions.

Such non-objective decisions can be useful primarily in two areas:

1. **Testing.** Generating human-like product usage scenarios. This allows us to go beyond the logic intended by the developers and identify vulnerabilities and imperfections at an early stage.
2. **Large language models.** When working with large language models, in cases where it is necessary to make them more natural. To throw them off their usual path, add an element of randomness to the pipeline, or recalibrate how the model is influenced by the outside world—that is, the user.

This article provides a general overview. In the following parts of the series, we will examine in greater detail the components from which such systems can be built and the specific use cases that may be useful when choosing—as a baseline—the modeling of mental processes and social behavior.
