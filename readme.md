# Singapore Lifesaving Online Database

---

## Motivations

To create a easily accessible and searchable database of all of Singapore’s Lifesaving sports historical results - from 1st Nationals all the way up to now, including the other events e.g. NUS Invis as well as international meets. Results to include time (where applicable), names and organisation of participants, position. Can be easily sorted according to event or participant name or organisation. This can then be further expanded to include records of officials & volunteers, coaches & team managers (and the results of their teams), etc. All results to be in the same format.

---

## Techstack

Front-end: React, Material-UI library (styling)

Why react?

1.  Working with DOM API is hard. React allows developers to work with virtual DOM.
2.  Allows developers to declaratively describe their UI and model the state of those interfaces.
3.  Reusable, composable, stateful components.
4.  Overall much more enjoyable experience building the UI

Back-end: Node, Express, Postgresql (database)

Might change to Rails backend.

---

## Progress

This project will consist of 2 client-facing interface.

1.  For admins/officials to login and perform CRUD on existing data (athletes profile, results etc). (20% completed - finish up CRUD for results and also data validation)
2.  For general public to view the existing database (0% completed - UXUI design, etc)
