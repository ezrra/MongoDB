// Agregación - Aggregation Framework

// Serie de operaciones a las cuales se les somete una coleccion para obtener un conjunto 
// de resultados calculados, formateados y/o filtrados de manera diferente a como 
// se encuentra en los documentos

// MapReduce 

// TUBERIA DE AGREGACION
// Someter en una coleccion a un conjunto de operaciones o etapas las cuales iran convirtiendo 
// un conjunto de documentos pertenecientes a una coleccion hasta obtener un conjunto 
// de documentos ...
// Se llama tuberia ya que cada etapa ira modificando, moldeando y calculando.

// ETAPAS

$ db.ordenes.aggregate([
	{
		$etapa1: {

		}
	}, {

		$etapa2: {

		}
	},
])

// Example
$ mongoimport -d test -c ordenes ordenes.json

// FILTRAR $match

$ db.ordenes.aggregate([
	{
		$match: {
			id_cliente: 2
		}
	}
])

// OPERADORES

- $addToSet
- $push
- $first
- $last
- $min
- $max
- $avg
- $sum

// AGRUPAR $group
// Agrupar por "modo_de_pago" y obtener para cada uno el monto total y la cantidad
// de ordenes.

$ db.ordenes.aggregate([
	{
		$group: {
			_id: "$modo_de_pago",
			cantidad_de_ordenes: { $sum: 1 },
			monto_total: { $sum: "$monto" }
		}
	}
])

	
// ETAPAS

// PROYECTAR - $project

$ db.ordenes.aggregate([
	{
		$project : {
			monto: 1,
			cliente: "$id_cliente"
		}
	}
])

// DESENVOLVER - $unwind
// Permite tomar un campo de los documentos que sea de tipo arreglo y generar un documento para cada 
// valor del mismo.
// Esta etaoa seule combinarse con la de agrupacion cuandi la finalidad es realizar algun calculo
// que involicre a los valores de un campo tipo arreglo

$ db.ordenes.aggregate([
	{
		$unwind: "$articulos"
	}
])

// ORDENAR, LIMITAR Y SALTAR - $sort, $limit, $skip

$ db.ordenes.aggregate([
	{
		$sort: { monto: -1, _id: 1 }
	}
])

$ db.ordenes.aggregate([
	{
		$sort: { monto: -1, _id: 1 }
	},
	{
		$skip: 7 
	},
	{
		$limit: 2
	}
])

$ db.ordenes.aggregate([
	{
		$match: {
			monto: { $gt: 200 }
		}
	},
	{
		$unwind: "$articulos"
	},
	{
		$group: {
			_id: "$articulos",
			monto_promedio: { $avg: "$monto" },
			cantidad_ordenes: { $sum: 1 },
			compradores: { $addToSet: "$id_cliente" }
		}
	},
	{
		$sort: { monto_promedio: -1, cantidad_ordenes: -1 }
	},
	{
		$skip: 3
	},
	{
		$limit: 2
	}
])