// Mantener solamente la informacion que necesitamos y aquella que es vieja, 
// desecharla y que deje ser parte de la base de datos.

// EXPIDACIONES O TIEMPO DE VIDA (TTL)

// Permite extablecer un tiempo de vigencia sobre los documentos de una coleccion
// Mediante el uso de un indice (TTL Index)
// Es ejecutado cada 60 segundos

// Restricciones
- Los indices TTL deben hacerse sobre campos que no posean otro indice
- Campo a indexar debe de ser de tipo fecha o arreglo de fechas
- En caso de ser un arreglo el documento explirara cuando la menor fecha sea alcanzada
- El indice TTL no puede ser compuesto

// EXPIRACION EN UNA CUENTA REGRESIVA

$ var fantasma1 = {
	fecha: new Date(),
	mensaje: 'buuu..'
};

$ var fantasma2 = {
	fecha: new Date(),
	mensaje: 'No estare mucho tiempo'
};

$ db.fantasmas.insert(fantasma1)
$ db.fantasmas.insert(fantasma2)

$ db.fantasmas.find()

// Creando el indice TTL

$ db.fantasmas.ensureIndex({ fecha: 1 }, { expireAfterSeconds: 300 })

// EXPIRACION EN HORA ESPECIFICA

$ var fantasma3 = {
	fecha:    new Date('Nov 17, 2013. 16:00:00'),
  	mensaje:  'solo un susto y me voy'
}

$ var fantasma4 = {
  	fecha:    new Date('Nov 17, 2014. 16:00:00'),
  	mensaje:  'estare aqui un largo tiempo'
}

$ db.otrosFantasmas.insert(fantasma3)

$ db.otrosFantasmas.insert(fantasma4)

$ db.otrosFantasmas.find()

$ db.otrosFantasmas.ensureIndex({ fecha: 1 }, { expireAfterSeconds: 0 })

$ db.otrosFantasmas.find()

// COLECCIONES LIMITADAS
// Alcanza un tamaño determinado se empieza a sobre escribir desde el inicio.

// Restricciones
- No se pueden eliminar documentos particulares
- Al actualizar un documento ya existente, estos no se pueden crecer su tamaño en disco
- TTL no es compatible con estas colecciones 

// Creacion

$ db.createCollection('eventos', { capped: true, size: 1000000, max: 10000 })
// Limitada, espacio en disco 1MB, y 10000 documentos

// CONVERSION
// convertir una coleccion normal a limitada  soin necesidad de crearla desde cero,

$ db.otrosFantasmas.isCapped()
false
$ db.runCommand({ "convertToCapped": "otrosFantasmas", size: 1000000 })

$ db.otrosFantasmas.isCapped()
true

// De indices TTL a limitado
// Se elimina, verificar db.otroFantasmas.getIndexes()