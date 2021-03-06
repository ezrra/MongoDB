The leading NoSQL database

You can work with JSON-style.

Document across your entire development stack.

## MongoDB Schema Design

* Rich Documents
* Pre Join / embed data
* No Mongo Joins
* No constraints
* Atomic operations
* No Declared Schema

* What's the single most important factor in designing your application schema within MongoDB?
Matching the data access patterns of your application.

* Relational Normalization

Link: http://blog.mongodb.org/post/87200945828/6-rules-of-thumb-for-mongodb-schema-design-part-1

## Basic: Modeling

### One-to-Few

example: might be the addresses for a person
execute: Show me all task due tomorrow.

### One to Many

Might be parts for a product in a replacement parts ordering system.
Each product may have up to several hundred replacement parts.
This is a good use case for referencing.
"For these examples using 2 byte ObjectIDs because they're easier to read: real world code would use 12-byte ObjectIDs"

```
db.parts.findOne()
{
	_id: ObjectID
	name: "",
	price: 123
}

db.products.findOne() {
	
	name: "Product",
	catalog_number: 13,
	parts: [
		ObjectID('AAA'),
		ObjectID('BBB'),
	]
}
```

Application-level join to retrieve the parts for a particular producto:

Fetch the product document identified by this catalog number
```
> product = db.products.findOne({ catalog_number: 123 })
```
Fetch all the parts that ara linked to this product
```
> product_parts = db.parts.find({ _id: { $in: product.parts } }).toArray()
```

### One to Squillions

Might be an event logging system that collects los messages for different machines.

### "Parent referencing"
```
> db.hosts.findOne () {
	_id: ObjectID('AAA'),
	name: "",
	ipaddr: "192.x.x.x"
}

> db.logmsg.findOne () {
	
	time: ISODate('2014....'),
	message: 'cpu is on fire',
	host: ObjectID('AAA') // Reference
}
```

You're use a (slightly different) application level join to find the most recent 5000 messages
for a host:

find the parent 'host' document
```
> host = db.hosts.findOne({ ipaddr: '192.x.x.x' }) //assumes unique index
```
find the most recent 5000 log message documents linked to that host

```
last_5k_msg = db.logmsg.find({ host: host._id }).sort({ time: -1 }).limit(5000).toArray()
```

### Example by 2 BSON Documents

```
> db.users.findOne() {
	name: "",
	email: "",
	articles: [{
		name: "",
		slug: "",
		date: "",
		text: "",
		author: ""
		comments: {
			comment: "",
			date: "",
			author: ""
		},
		tags: ["",""],
		categories: ["", ""],

	},{

	}],
}
```

### Embedding, child-reference, and parent reference.

Invoking two-way referencing and denormalization

#### Two-way referencing

Example: task-traking system.

The app will need to track all of the tasks owned by a Person, so we will need to reference Person -> Task.
```
> db.person.findOne() {
	
	_id: ObjectID(),
	name: "Kate",
	tasks: [ // array of reference to Task documents
		ObjectID(),
		ObjectID(),
		// etc
	]
}
```

Other context 

All of the Tasks in a multi-person Project. And it will need to quickly find which Person is responsible for each Task.
 You can optimize this by putting an additional reference to the Person in the Task document.

```
> db.tasks.findOne() {
	_id: ObjectID(),
	description: "Write lesson plan",
	due_date: ISOdate(),
	owner: ObjectID() //  Reference to Person document
}
```

* Denormalizing With One to Many Relationship
* Denormalizing from Many One

```
> db.products.findOne() {
	name: "",
	manufacture: "Acme",
	catalog_number: 3,
	parts: [
		ObjectID(),
		ObjectID()
	]
}
```

Denormalizaing would mean that you dont have to perform the application level join when displaying all of the part names for the product.
```
> db.products.findOne() {
	name: "",
	manufacture: "Acme",
	catalog_number: 3,
	parts: [
		{
			id: ObjectID(), name: "",
		},
		{
			id: ObjectID(), name: "",
		}
	]
}
```

Execute: 
Fetch the product document
```
> product = db.products.find({catalog_number:123});
```
Create array of ObjectID()s containing 'just' the part numbers
```
> part_ids = product.parts.map(function (doc) { return doc.id });
```
Fetch all the parts that are linked to this Product
```
> product_parts = db.parts.find({ _id: { $in: part_ids } }).toArray()
```
--- Denormalizing from One -> Many

You can also denormalize fields from the One side into the Many side.
```
> db.parts.findOne() {
	_id: ObjectId(),
	partno: "12345678",
	name: "",
	product_name: "left-handed smoke",
	product_catalog_number: 123485,
	qty: ,
	cost: 24,
	price: 54
}
```
#### Denormalizing With One to Squillions Relationships

```
> db.logmsg.findOne() {
	time: "",
	message: "",
	ipaddr: "",
	host:  ObjectID()
}
```
Your query for the most recent messages from a particular IP just got easier.
It's now just one query instead of two
```
> last_5k_msg = db.logmsg.find({ ipaddr: '127.x.x.x' }).sort({ time: -1 }).limit(5000).toarray()
```
Get log message from monitoring system
```
logmsg = get_log_msg()
log_message_here = logmsg.msg;
log_ip = logmsg.ipaddr;
// get current timestamp
now = new Date();
// find the _id for the host I'm updating
host_doc = db.hosts.findOne({ ipaddr: log_id }, { _id:1 }) // Don't return the whole document
host_id = host_doc._id
// Insert the log message, the parent reference, and the denormalized data into the many side
db.logmsg.save({ time: now, message: log_message_here, ipaddr: log_ip, host: host_id })
// Push the denormalized log message onto the one side
db.hosts.update({ _id:host_id }, 
				{ $push: { logmsgs: { $each: [{ time: now, message: log_message_here }],
				  $sort: { time: 1 } // Only 
				}}})
```
#### Your guide through the rainbow
```
// User
{
    "_id":ObjectId("514ed98d44aee1b035ee756f"),
    "nombre":"Adrian",
    "apellido":"Alonso",
    "numerodecontacto":"412312",
    "direccion":
        {
        "tipo":"Calle",
        "nombre":"Buenavista",
        "numero":2,
        "piso": Noveno B,
        "codigopostal":28823
        },
    "email":"prueba@email.com",
    "password":"example",
    "privilegios":0
}

// Product
{
    "_id": ObjectId("514d920b44ae16d201a3ff51),
    "nombre":"Capucchino",
    "precio":20,
    "marca":"Nescafé",
    "comentarios":
        [
            DBRef("Comentario",
            ObjectId("514d91a644ae16d201a3ff50"))
        ]
}
// Comment
{
    "_id" : ObjectId("514d91a644ae16d201a3ff50"),
    "usuario" : DBRef("Usuario", ObjectId("514ed98d44aee1b035ee756f")),
    "texto" : "Me gusta"
}

```

### Modeling Strategy

### Case study 

Uses MongoDB to safeguard over 6 billion images served to million of customers

- Shutterfly

Ops Considerations

MongoDB Management Service

Cloud Managed MongoDB

Defense in Depth Security Architecture

Authorization, Authentication, Encryption & Auditing

Best Practice - http://es.slideshare.net/mongodb/migrating-to-mongodb-best-practices

MongoDB 3.2

* News engines
* Document Validate
* MongoDB y RealTime
* MongoDB Compass
* Metrics API

Use WiredTiger engine by default

MongoDB Compass

API Metric
Tools APM (Application Performance Monitoring)

Cover Queries

- Map / reduce
- $group command
- Aggregation pipeline