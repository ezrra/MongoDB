/**
 *
 *	INSERT
 *
 **/

db.users.insert({		// <------- COLLECTION
	name: "Julian",		// <------- DOCUMENT
	age: 21,	        // <------- DOCUMENT
	gender: 'Male'		// <------- DOCUMENT
});

db.users.insert(		// <------- COLLECTION
	{					// <------- BEGIN DOCUMENT
		name: 'Josh',		
		age: 30,
		gender: 'Male',
		addresses: [
			{
				street: '123 Sun St', city: 'Anytown', cc: 'USA',
			},
			{
				street: '123 Avenue Q', city: 'New York', cc: 'USA'
			}
		],
		phones: [
			{ type: 'work', number: '01-123-4561' },
			{ type: 'cell', number: '01-987-6543' }
		],
		company: 'Arkusnexus'
	}					// <------- END DOCUMENT
);

/**
 *
 *	INSERT ONE
 *
 **/

db.users.insertOne(
	{
		name: 'Nancy',
		age: 22,
		gender: 'Female',
		company: 'Arkusnexus'
	}
);

/**
 *
 *	INSERT MANY
 *
 **/

db.users.insertMany([
{
	name: 'Omar',
	age: 18,
	gender: 'Male',
	company: 'Arkusnexus'
},
{
	name: 'Aaron',
	age: 29,
	gender: 'Male',
	company: 'Arkusnexus'
},
{
	name: 'Abram',
	age: 18,
	gender: 'Male',
	company: 'Arkusnexus'
},
{
	name: 'Abby',
	age: 29,
	gender: 'Female',
	company: 'Arkusnexus'
}
]);

/**
 *
 *	FIND
 *
 **/

db.users.find(						// <------- COLLECTION
	{ age: { $gt: 20 } },			// <------- QUERY CRITERIA
	{ name: 1, age: 1, _id: 0 }		// <------- PROJECTION
).limit(2)							// <------- CURSOR MODIFIER



/**
 *
 *	UPDATE, UPDATE ONE & UPDATE MANY
 *
 **/

db.users.update(				// <------- COLLECTION
	{ age: { $gt: 10 } }, 		// <------- UPDATE CRITERIA
	{ $set: { status: 'A' } }, 	// <------- UPDATE ACTION
	{ multi: true }				// <------- UPDATE OPTION
)

/**
 *
 *	REMOVE, DELETE ONE & DELETE MANY
 *
 **/

db.users.remove(			// <------- COLLECTION
	{ name: "Aaron" }		// <------- REMOVE CRITERIA
)