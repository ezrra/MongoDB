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

	
