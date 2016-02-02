# Restaurant Seating Algorithms

## Idea
My family visited my sister and me for dinner at a restaurant in Manhattan. When we arrived, we were asked to wait up to 40 minutes for a table to open up for four people. I wondered if there was an efficient algorithm to seat people waiting in line so that waiting time can be minimized. I thought about First-In-First-Out, largest group prioritized, first best fit, etc. How can one make sure as many people would get seated without other groups waiting too long. If a group waits too long, it can face starvation much like how processes face starvation when it is denied resources to do its work.

## Implementation
So I am creating a visual representation of what a randomized night would be like a small restaurant of 10 tables where each table can seat one or two people and groups larger than 2 must sit in a consecutive row of tables. This format was chosen for the sake of simplicity; the number of tables and chairs remain constant, and chairs cannot be moved from one table to another. Each table can seat up to a maximum of 2 people. Every time unit, there is a 20% one person arrives, 40% two arrive, 20% three arrive, 10% four arrive, 5% five arrive, and 5% six arrive. When a group is seated, the eating duration is 10 times the number of people in that group. These are just some arbitrary values I came up with in order to simulate group sizes and eating duration.

## Algorithms
This is a variation of the bin packing algorithm, but it updates "real-time" with additional customers who arrive at the restaurant to grab a meal. The bin packing algorithm is a combinatorial NP-hard problem, so the algorithms I use here are not the optimal solutions to the problem. However, I allow the user to choose between the algorithms to compare the results.

So far, I have the First-In-First-Out, largest group prioritized, and first best fit algorithms.

## Check it out
See the code in action: http://philipsdyoo.github.io/restaurant-seating/