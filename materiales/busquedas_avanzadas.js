// BUSQUEDAS AVANZADAS Y LAS SECUENCIAS AUTO-INCREMENTABLES
// SECUENCIAS AUTO-INCREMENTABLES -  constraint
// Coleccion de contadores

$ var usuariosAutoIncremtables = {
	_id: 'autoresid',
	secuencia: 0
}

$ db.contadores.insert(usuariosAutoIncremtables)

// Crear una funcion para la secuencia

$ function proximoEnSecuencia (nombre) {
	var resultado = db.contadores.findAndModify({
		query: { _id: nombre },
		update: { $inc: { secuencia: 1 } },
		new: true
	});

	return resultado.secuencia
}

// Ejecutando

$ var oscar = {
	_id: proximoEnSecuencia('autoresid'),
	nombre: 'Oscar',
	edad: 20
}

$ var alberto = {
	_id: proximoEnSecuencia('autoresid'),
	nombre: 'Alberto',
	edad: 'veintiseis'
}

$ var jonathan = {
  	_id:    proximoEnSecuencia('autoresid'),
  	nombre:   'Jonathan',
  	apellido: 'Wiesel'
}

$ db.autoresAutoIncrement.insert(oscar);
$ db.autoresAutoIncrement.insert(alberto);
$ db.autoresAutoIncrement.insert(jonathan);
$ db.autoresAutoIncrement.find()

// SELECTORES DE BUSQUEDA

$ '$gt'
$ '$gte'
$ '$lt'
$ '$lte'
$ '$ne' // Distinto a
$ '$in' // Entre los siguientes
$ '$nin' // No esta entre los siguientes

// LOGICOS

$ '$or' // 
$ '$and'
$ '$nor'
$ '$not'

// Ejemplos

$ db.autoresAutoIncrement.find({ $or : [{ _id: 1 }, { nombre: 'Jonathan' }] })

// Out
{ "_id" : 1, "nombre" : "Oscar", "edad" : 20 }
{ "_id" : 3, "nombre" : "Jonathan", "apellido" : "Wiesel" }


$ db.autoresAutoIncrement.find({ $nor : [{ _id: 1 }, { nombre: 'Jonathan' }] })
// Out
{ "_id" : 2, "nombre" : "Alberto", "edad" : "veintiseis" }


$ db.autoresAutoIncrement.find({ _id: { $not: { $gt: 2 } } })
// Out
{ "_id" : 1, "nombre" : "Oscar", "edad" : 20 }
{ "_id" : 2, "nombre" : "Alberto", "edad" : "veintiseis" }

// ELEMENTALES
// Comparaciones referentes a las propiedades del campo como tal.


$exits // Existencia de un campo en particular
$type 

$ db.autoresAutoIncrement.find({ apellido: { $exists: true }})
// Out
{ "_id" : 3, "nombre" : "Jonathan", "apellido" : "Wiesel" }

// Tipos de dato BSON

1 - Double
2 - String
3 - Objeto
4 - Arreglo
5 - Data binaria
6 - Indefinido (deprecado)
7 - Id de objeto
8 - Booleano
9 - Fecha
10 - Nulo
11 - Expresión regular
13 - Javascript
14 - Símbolo
15 - Javascript con alcance definido
16 - Entero de 32bit
17 - Estampilla de tiempo
18 - Entero de 64bit
127 - Llave máxima
255 - Llave mínima

$ db.autoresAutoIncrement.find({ edad: { $type: 1 } })
// Out
{ "_id" : 1, "nombre" : "Oscar", "edad" : 20 }

$ db.autoresAutoIncrement.find({ edad: { $type: 2 }})
// Out
{ "_id" : 2, "nombre" : "Alberto", "edad" : "veintiseis" }


