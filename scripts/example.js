// Indices compuestos
db.user.createIndex({ userid: 1, score: -1 })

// Indices Multiclave

{
	userid:"xyz",
	score:30,
	address:[
		{street:"street one", ...},
		{street:"street two", ...},
		{street:"street three", ...},
	]
}

db.user.createIndex({ "address.street": 1 })

// Example from indeces

for (i=0; i<1000000; i++) {
    db.users.insert({
        "i": i,
        "username": "user" + i,
        "age" : Math.floor(Math.random() * 120),
        "created" : new Date()
    });
}


db.users.find({ username: "user201" }).explain()
db.users.find({ username: "user202" }).limit(1).explain()
db.users.ensureIndex({ "username": 1 })
db.users.find({ "username": "user101" }).explain()

db.users.ensureIndex({ "age": 1, "username": 1 })
db.users.find().sort({ "age": 1, "username": 1})
db.users.find({}, { "_id": 0, "i": 0, "created": 0 })
db.users.find({ "age": 21 }).sort({ "username": -1 })


// Introduction to Compound Index - Example

// Indices 2d

loc: [-3.7037902, 40.4167754]

db.places.ensureIndex({ "loc": "2d" })

// Indices 2d esfericos
// Debes usar indices esfericos si pretendes almacenar datos en formato GeoJSON

// Point
{
	loc:  {
			type: "Point",
			coordinates: [40, 5]
		}
}

// Line
{
	loc: {
		type: "LineString",
		coordinates: [[40, 5], [41, 6]]
	}
}

db.points.ensureIndex({ location: "2dsphere" })

// Indices de Texto

db.reviews.ensureIndex({ comments: "text" })
//Especificando un lenguaje concreto. en este caso español

db.collection.ensureIndex({ content: "text" }, { default_language: "spanish"})


// Indices Unicos

db.users.ensureIndex({ "userid": 1 }, { unique: true })

// Indices Esparcios

db.addresses.ensureIndex({ "secondAddress": 1 }, { sparse: true })


// Colecciones usando TTL

{
	"createdAt": ISODate('2014-02-08T15:34:06.968Z'),
	"logEvent": 2,
	"logMessage": "Success!"
}

// Crea un nuevo indice para expirar los documentos tras 300 segundos desde su insercion

db.log.ensureIndex({ "createdAt": 1 }, { expireAfterSeconds: 300 })
// MongoDB eliminara automaticamente todos los documentos de la collecion log cuando el valor del campo 'createAt' sea mayor que 'createdAt + expireAfterSeconds'

db.log.insert({
	"createdAt": new Date(),
	"logEvent": 5,
	"logMessage": "Error!"
})

// Expiracion de Documentos en una fecha y hora determinadas

// Crea un nuevo indice que xpirara documentos a una hora determinada
db.log.ensureIndex({ "expireAd": 1 }, { expireAfterSeconds: 0 })
// El proceso mongod buscara los documentos en los que el campo 'expireAt' se mas antiguo que la fecha actual y lo borrara de forma automatica

// Siguiendo las reglas de indexacion, este documento sera eliminado el 22 de Julio de 2014 a la hora especificada

db.log.insert({
	"expiredAt": new Date('July 22, 2014 14:00:00'),
	"logEvent": 2,
	"logMessage": "Success!"
})

// Indices en segundo plano

db.collection.ensureIndex({ ... }, { background : true })

// Group

db.aggfwktest.group({
	key : { user_id : 1 },
	cond : { score : { $gte : 6 } },
	reduce : function(cur, result) { result.totalscore += cur.score },
	initial : { totalscore : 0 }
})

// $add

db.aggfwktest.insert( { owner : "Peter", cars : 3, bikes : 2 } )

db.aggfwktest.aggregate([
	{ $match : { owner : "Peter" } },
	{ $project : { _id : 0, autos : { "$add" : [ "$cars", "$bikes" ] } } }
])

{ "autos" : 5 }


/**
 *
 * $map
 *
 */

db.users.aggregate([
{
    $project:
    {
        // finished: 1,
        finished:
        {
          $map:
          {
               input: "$finished",
               as: "grade",
               in: { $add: [ "$$grade", 2 ] }
          }
        }
    }
}
])

/**
 *
 * $isArray
 *
 */

db.test.aggregate([
{
    $project: {
        items: {
            $cond: {
                if: { $and: [ { $isArray: "$instock" }, { $isArray: "$ordered" } ] },
                then: { $concatArrays: [ "$instock", "$ordered" ] },
                else: "not"
            }
        }
    }
}
])

/**
 *
 * $filter
 *
 */

db.sales.aggregate([
    {
        $project: {
            items: {
                $filter: {
                    input: "$items",
                    as: "item",
                    cond: { $gte: ["$$item.price", 100] }
                }
            }
        }
    }
]);

/**
 *
 * $map
 *
 */

db.map.aggregate([
{
    $project: {
        adjustedGrades: {
            $map: {
                input: "$quizzes",
                as: "grade",
                in: { $add: ["$$grade", 2] }
            }
        }
    }
}
])

/**
 *
 * $where
 *
 */

db.test.find({
    $where: "this.name == this.nick"
})

db.test.find({
    $where: function () {
            return (this.name == this.nick)
        }
})

db.test.find({
    $where: function () {
        return obj.name == obj.nick;
    }
})

db.test.find("this.name == this.nick")

db.test.find(function () { return (this.name == this.nick) })

db.test.find({ name: "josh", $where: "this.name == this.nick" })

db.test.find()

db.test.drop()

db.test.insertMany([
    { name: "juan", nick: "juan1" },
    { name: "josh", nick: "josh1" },
    { name: "josh", nick: "josh" },
    { name: "carlos", nick: "carlos" }
])

/**
 *
 * $let
 *
 */

db.test.aggregate([
{
    $project: {
        finalTotal: {
            $let: {
                vars: {
                    total: { $add: ['$price', '$tax'] },
                    discounted: { $cond: { if: '$applyDiscount', then: 0.9, else: 1 } }
                },
                in: { $multiply: ["$$total", "$$discounted"] }
            }
        }
    }
}
])