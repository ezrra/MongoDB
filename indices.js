// Indices es una estructura de datos que toma los valores de campos particulares de una tabla
// y se almacenan en un espacio de rapido acceso.

// Solo se debe de crear indices sobre campos que vayan a ser consultados con alta frecuencia

// Tipos de indices

/*

 Indice sencillo - definidos sobre un unico campo de un documento
 Indice compuesto - definidos sobre varios campos de un documento
 Indice multillave - En casos de que el campos a indexar pertenezca a subdocumentos dentro de un arreglo del documento padre
 Indice geoespacial - Indexar campos que sean coordenadas de tipo GeoJSON
 Indice Texto - 
 Indice tipo hash

*/

/*

 Propiedades de los indices:

 Unicidad: Establecer el indice como campos unico.
 Dispersion: El filtrado de los resultados basados en campo indexado.

*/

// Ejemplo

{
	nombre: "Juan",
	gandas: 3, 
	perdidas: 3,
	retiradas: 9,
	dinero: 15,
	mejores: ['1 trio', '2 pares'],
	comentarios: [
		{
			hora: '22:00:00',
			texto: "Hoy sera"
		},
		{
			hora: '10:00:00',
			texto: 'Quiza mañana'
		}
	]
}

{
	nombre: "Jose",
	gandas: 8, 
	perdidas: 4,
	retiradas: 3,
	dinero: 120,
	mejores: ['Escalera real', 'Full house'],
	comentarios: [
		{
			hora: '22:00:00',
			texto: "Los humillare"
		},
		{
			hora: '10:00:00',
			texto: 'Gracias'
		}
	]
}

{
	nombre: "Manuel",
	gandas: 4, 
	perdidas: 6,
	retiradas: 5,
	dinero: 30,
	mejores: ['Escalera real', 'Full house'],
	comentarios: [
		{
			hora: '22:00:00',
			texto: "texto 1"
		},
		{
			hora: '10:00:00',
			texto: 'texto 2'
		}
	]
}

// Compobrar indice

$ db.puntuaciones.getIndexes()

// Crear nuestros propios indices

$ db.puntuaciones.ensureIndex({ dinero: 1 })

$ db.puntuaciones.find({ dinero: { $gt: 50 } })

// Indice compuestos

$ db.puntuaciones.ensureIndex({ perdidas: 1, retiradas: 1 })

$ db.puntuaciones.find({ perdidas: { $gt: 3 } })

// Rendimiento

// Indice multillave

$ db.puntuaciones.ensureIndex({ mejores: 1 })

$ db.puntuaciones.find({ mejores: 'Full house' })

// arreglos con documentos anidados

$ db.puntuaciones.ensureIndex({ 'comentarios.texto': 1 })

$ db.puntuaciones.find({ 'comentarios.texto': '...' })

// Uso de propiedades

// Propiedad de unicidad - valor de este campo sea unico

$ db.puntuaciones.ensureIndex({ nombre: 1 }, { unique: true })

// Propiedad de dispersion - filtrar los resultados buscados por el campo indexado dejando por fuera aquellos registros que no poseen el campo

// No apareceran documentos que no tenga el campo que se agrego como sparse: true - Ejemplo

$ var carlos = { nombre: 'Carlos' }

$ db.puntuaciones.insert(carlos)

$ db.puntuaciones.ensureIndex({ gandas: 1 }, { sparse: true })

