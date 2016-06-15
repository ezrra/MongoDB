// MongoDB CRUD
/*
- Cursors
- Query Optimization

Indexes improve the efficiency of read operations
Create an Index to support read operations

Create indexes using the.

> db.inventory.createIndex({ type: 1 })

- Query selectivity

Refers to how well the query predicate excludes or filters out documents in a collection.

db.collection.explain()

-Return information on the query plan for the following operations: aggregate(), count(), find(), group(), remove(), update() methods.

Destributed Queries

Read Operations to sharded clusters

Read Operations to replica sets

Write operations

- When Sharding 
*If you care about initial performance, you must pre-split
*Otherwise, initial performance will be slow
*(Hash sharding automatically presplits collections)


*/