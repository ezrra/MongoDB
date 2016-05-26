$ document = { name: "Josh", real: 122.33, float: true, date: new Date() }

$ other_document = { name: "Mark", country: "Brazil" }

$ show databases;

$ use database_local;

$ db;

$ user = { name: "Josh", age: 20 }

$ db.user.insert(user);

$ show collections;

// Where

$ db.users.find()

$ db.users.findOne()

$ var user_1 = db.users.findOne()

// Update

> db.users.find();
{ "_id" : ObjectId("5743d5087c0d7682606718b8"), "name" : "Josh", "age" : 20 }
{ "_id" : ObjectId("5743d57c7c0d7682606718b9"), "name" : "Mark", "age" : 21 }

$ db.users.update({ _id: ObjectId("5743d57c7c0d7682606718b9") }, { $set: { name: "Mark" } });


// Where not

$ db.users.find({ age: { $ne: 20 } });

// insert multiple

$ user_2 = { name: "user 2", age: 30 };

$ user_3 = { name: "user 3", age: 24 };

$ db.users.insert([user_2, user_3])

$ user_3 = db.users.findOne({ name: "user 3" })

$ user_3.name = "name 3 updated"

$ db.users.save(user_3)

$ db.users.find();

// { "_id" : ObjectId("5743e94d7c0d7682606718bb"), "name" : "name 3 updated", "age" : 24 }

// Update - other way

$ db.users.insert({ name: 'user 4' })

$ user_4 = db.users.findOne({ name: 'user 4' })

$ user_4.age = 33

$ db.users.update({ name: 'user 4' }, user_4)

// remove

$ db.users.remove({ name: 'user 4' })

$ db.users.update({}, { $set: { name: 'same name' } }, {multi: true})

$ db.users.remove({ name: 'same name' })

$ db.users.remove({})

$ db.users.drop()

$ show collections;

$ db.dropDatabase()

$ show databases;

// between

$ db.users.find({}, { name: 1, _id:0 })

// operators - exmaple books

/*
	$gt => greater than
	$gte => greate than equals
	$lt => less than 
	$lte => less than equals
*/

$ db.book.find({ first_edition: { $gt: 2000 } }, { name: 1 })

$ db.book.find({ first_edition: { $gte: 1940, $lte: 2000 } }, { name: 1 })

$ db.book.find({ first_edition: { $gte: 1940, $lte: 2005}, number: { $gt: 100 } }, { name: 1 })

// cursor

$ for(i=0; i < 100; i++) { db.test.insert({ value: i }) }

$ var cursor = db.test.find();

$ cursor.forEach(function (d) { print(d.value) })

$ var cursor = db.test.find();

$ cursor.forEach(function (d) { d.valor = 100; db.test.save(d) })

$ db.apples.find().count()

$ for (i=0; i<10; i++) { db.apples.insert({ name: 'Apple ' + i, price: '2' + i }) }

$ db.apples.find().count()

$ db.apples.find().sort({ value: 1 }) // ASC

$ db.apples.find().sort({ value: -1 })

$ db.apples.find().sort({ valor: -1 }).skip(1).limit(1)

$ db.apples.find().sort({ value: -1}).skip(3).size()	

// Array

// Array without document

$ var array_1 = [1, 2, 3]

$ var user = { name: 'Josh', values: array_1 }

$ db.users.insert(user);

$ db.users.update({}, { $addToSet: { values: 4 } }) // search, if find value then not add

$ db.users.update({}, { $push: { values: 4 } }) // insert value in array

$ db.users.update({}, { $push: { values: { $each : [5, 6] } } })

$ db.users.update({}, { $addToSet: { values : { $each : [6, 8] } } })

$ db.users.update({}, { $push: { values: { $each : [100, 101], $position: 4 } } })

$ db.users.update({}, { $push: { values: { $each: [90, 91], $sort:1 } } })

$ db.users.update({}, { $push: { values: { $each: [], $sort:1 } } })

// exmaple by array

$ db.users.inset({ name: 'Josh', examples: ['MongoDB', 'C#', 'Java', "Python"] })

$ db.users.find({}, { _id: false, examples: true })

$ db.users.find({}, { _id: false, examples: { $slice : [1, 2] }}) // C#, Java

$ db.users.find({}, { _id: false, examples: { $slice : -1 }})

$ db.users.find({ examples: { $in: ['MongoDB'] } }, { _id: false, name: false, examples: { $slice: [1, 2] }})

$ db.users.find({ examples: { $in: ['XML'] } }, { _id: false, name: false, examples: { $slice: [1, 2] }})

$ db.users.find({ examples: { $in: ['XML', 'MongoDB'] } }, { _id: false, name: false, examples: { $slice: [1, 2] }})

$ db.users.find({ examples: { $nin: ['XML', 'MongoDB'] } }, { _id: false, name: false, examples: { $slice: [1, 2] }})

$ db.users.find({ examples: { $nin: ['XML'] } }, { _id: false, name: false, examples: { $slice: [1, 2] }})

$ db.users.find({ examples: { $nin: ["C#"] } })

$ db.users.update({ _id: ObjectId("5744a8950552c9c48832e304") }, { $push: { examples: "Go" } })

// { "_id" : ObjectId("5744a8950552c9c48832e304"), "name" : "Josh", "examples" : [ "MongoDB", "C#", "Java", "Python" ] }

$ db.users.find({ profession: { $exists: false } })

$ db.users.find( name: { $type: 2 })

$ db.users.find({ name: {$regex:  "a"  } })

$ db.users.find({ name: {$regex:  "e$"  } })

// $ db.users.find({ name: {$regex:  "A"  } })

$ db.users.find({ name: { $exists: true } })

$ db.users.find({ name: { $regex: 'J' } }) // or $regex: 'J$' - ^

// OR

$ db.users.find({ $or: [ { name: { $regex: 'e$' } }, { age: { $exists: true } } ] })

// AND

/*
{ "_id" : ObjectId("5744a8950552c9c48832e304"), "name" : "Josh", "examples" : [ "MongoDB", "C#", "Java", "Python", "Go" ] }
{ "_id" : ObjectId("5744b9853c51412a0ed5d36f"), "name" : "Mark", "examples" : [ "Javascript" ] }
*/
$ db.users.find({ $and: [ { name: { $gt: 'M' } }, { name: { $regex: "k" } } ] })
// { "_id" : ObjectId("5744b9853c51412a0ed5d36f"), "name" : "Mark", "examples" : [ "Javascript" ] }


// MongoDB & Node

// Synchronous vs Asynchronous

/*
	
	JSON Revisited

	Array => []
	Dictionaries => {}

*/

/*
	
	JSON Subdocuments

	{ "address": { "street_address": "Elm Drive", "city": "Palo Alto", "state": "California", "zipcode" : "94545" } }
	
*/

/* mongorestore dump */

// Querying Inside Arrays

$ db.accounts.find().pretty()

$ db.accounts.insert({ name: "George", favorites: ['ice scream', 'pizza'] })

$ db.accounts.insert({ name: "Howard", favorites: ['beer', 'pretzels'] })

$ db.accounts.find({ favorites: "pretzels" })

$ db.accounts.find({ favorites: { $all: ["pretzels", "beer"] } })

$ db.accounts.find({ favorites: { $in: ["beer", "ice cream"] } })

// Queries With Dot Notation

$ db.users.insert({ name: "richard", email: { work: "richard@10en.com", personal: "kre@example.com" } })

$ db.users.findOne()

$ db.user.find({ email: { work: "richard@10en.com" } })

$ db.users.find({ "email.work" : "richard@10en.com" })

// Quiz
$ db.catalog.find({ "price": { $gt: 10000 }, "reviews" : { $gte: 5 } })

// Cursors

$ cur = db.people.find(); null;

$ cur.hasNext();

$ cur.next()

// Tip

$ while (cur.hasNext()) printjson(cur.next())

$ cur.limit(5)

// reverse query

$ cur.sort({ name: -1 }); null;

$ cur.sort({ name: -1 }).limit(); null;

$ cur.sort({ name: -1 }).limit().skip(2); null;