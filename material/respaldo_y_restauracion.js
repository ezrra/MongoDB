// Prevencion al desastre por medio del respaldo 

// VOLCADO (dump)

- mongodump

$ mongodump

// Parametros

--out
--port
--host
--db
--collection
--dbpath
--username
--password

$ mongodump --db base_de_datos

// RESTAURACION

$ mongo
$ mongorestore --db base_de_datos dump/base_de_datos

// MIGRACIONES

// Migrar una base de datos de una instancia a otra.

// Primero debemos acceder a la instancia de Mongo del equipo destino y tan solo haremos lo siguiente:

$ db.copyDatabase('codehero', 'codeheroRemoto', '192.168.0.100')
// { "ok" : 1 }
$ show dbs
// codeheroRemoto
$ use codeheroRemoto
// switched
$ show collections

// bind_ip - configuracion de mongodb


