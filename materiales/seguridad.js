// SEGURIDAD
// AUTENTICACION

$ mongo
$ use admin
$ db.addUser('isra', 'password') // db.createUser(user, writeConcern)

// Archivo de la configuracion de la instancia habilitaremos la autenticacion

auth = true
// /etc/mongodb.conf

// Reiniciar
$ mongo
$ show dbs
// unauthorized

$ use admin
$ db.auth('isra', 'password')

// Usuario en especifico

$ use code

$ use.addUser('code', '12345')  // db.createUser(user, writeConcern)
  {
  	"user": "code",
  	"readOnly": false,
  	"pwd": "49e2220035d3d25cf3010bb9ff9f8ad9",
  	"_id": ObjectId('5280083e4c857f20fa16e052')
  }

// Autorizacion

// Restricciones o privilegios - Roles
- read
- readWrite
- dbAdmin
- userAdmin

// Multiples bases de datos

- readAnyDatabase
- readWriteAnyDatabase
- userAdminAnyDatabase
- dbAdminAnyDatabase

// ADMINISTRATIVO

- clusterAdmin // Estrategias de replicacion y fragmentacion

$ db.addUser({

	user: 'nombre_de_usuario',
	pwd: 'contrasena',
	roles: ['rol1', 'rol2']
})

// EXPOSIVION

// Manipular los niveles a los que esta se encuentra expuesta la instancia.

// access http://localhost:27017/

// Archivo de configuracion 
nohttpinterface = false

// INTERFACE REST
// Esta interface interactiva permite realizar algunas tareas administrativas
rest = true

//LIGADO DE IPs

bind_ip = 127.0.0.1 // suponiendo que solo quieremos que acceda algo en el mismo equipo

bind_ip = 127.0.0.1, 192.168.0.122, etc
// Revisar sobre IP Spoofing

// EL PUERTOS
// Cambiar puerto
port = 22622

