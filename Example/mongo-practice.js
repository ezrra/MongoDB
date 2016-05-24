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

