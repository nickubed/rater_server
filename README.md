# Villager Rater
---
## Mission:
After watching ProZD's "Let's Rank All 391 Animal Crossing Villagers" I realized "hey. this is something everyone should do. I'd love to know where each villager *actually* stands in popularity, not just vaguely anecdotally."

And so Villager Rater was born.

Villager Rater will use the same system ProZD used to rank villagers in his video. Top tier is represented by S, and then A, B, C, D, and F represent the remaining columns.

## The Deliverable:
Villager Rater will be simple. Upon loading the webpage, you will immediately be offered the opportunity to start rating villagers. No account will be needed, and all villagers rated by non-logged-in entitites will be stored in a single "user" that will represent non-logged-in users.

MVP for this project is represented by the ability to send villagers to the DB accompanied by a rating. 

Stretch Goals:
- Click & Drag interface that allows users to drag the villager to a visual representation of the "rank" table.
- Data visualization. Allow users (once logged in) to see what the general consensus is on any given villager. Main page for logged in users should be a general "leaderboard" representing where, on average, villagers rank.

## How do we get there?
- Create an interface for users to see one villager at a time, and provide them a rank.
- Set up a DB to carry villager name, img, and rating. This will be a SQL table: Users, Villagers, Villagers_Users.
- Send the villager data to a DB, so that ultimately we may plot each villagers average.