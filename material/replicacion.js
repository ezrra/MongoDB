// mongod --dbpath "C:\data\replicaRS0" -replSet rs0 --port 20020
// mongod --port 27017 --dbpath 'C:\data\replicacion\' --replSet rs0

// REPLICACION

// Replicacion de los datos a trces de distinrtas instancias y 
// computadores para asegurar que la informacion este disponible
// y reducir los riesgos de perdida o corrupcion de la misma

// Copias exactas

//	ARQUITECTURA

// Grupo de instancias que poseeran la misma informacion se les conoce como "replica set" o groupo de replicacion

// "replica set" tiene 2 tipos principakes miembros (primarias y secundarias)

// Escritura a primaria, y tambien lectura
// pero se puede configurar que lectura tome a la secundaria

// TIPOS DE MIEMBROS SECUNDARIOS

// 3 Configuraciones para los miembros secundarios - delimitar el funcionamiento para un fin especifico

// Miembro de prioridad 0 - esto evita que dicho miembro pueda ser elegido a convertise en miembro primario en caso de fallo

// Miembro escondico - prioridad 0 pero ademas se les niega la posibilidad de ser accesibles para 
// lecuta por parte de los sistemas cliente

// Miembro retrasado = Miembros prioridad 0 y cualidad mantener un estado retrasado de la base de datos. 
// Suele utilizarse para respaldo ya que no afecta las ultimas operaciones que pudieran estar alterando y se recomienda
// como un miembro escondido/

// ELECCIONES
// miembros deben de evitar pings entre ellos cada 2 segundos, si un periodo de 10 segundos el latido se marcaria como inaccesible

// OPTIME
// Se tina eb cyebta ka estampilla de tiempo mas reciente de la ultima operacion que el miembro aplico del oplog, por ello 
// se llama optime o tiempo de operacion

// MIEMBROS IMPARES
// Cantidad de miembros en tu replica set sea impar, facilitara procesos de eleccion y solicitara menos 
// recursos y menos tiempo.
// Configurar un miembro "arbitro". Esto tipo de miembros no poseen una copia del conjunto de datos y por ende no 
// pueden volverse primarios.

// NUMEROS DE MIEMBROS
// 12 maximo y solo 7 de ellos con la capacitar de votar.
// si se necesita as miembros realizar "replicacion maestro-esclavo" 


// "replica set" - practice

// CONVERTIR A REPLICA SET
// Para la instancia de "mongod"

// Configurar el archivo de confiuguracion
replSet = <nombre_del_replica_set>

// o pasarlo cini argumento en el comando de ejecucion.

$ mongod --replSet <nombre_del_replica_set>

$ mongo

$ rs.status() {
	..

}

$ rs.conf()
null

// Iniciamos el replica set ya que arriba menciona el estatus pero no esta configurada.

$ rs.initiate()
{
	...
}

// De ha se creara una replica set sencilla

$ rs.status() {

	...
}

$ rs.conf() {
	...
}

// AGREGAR MIEMBROS

$ sudo nano /etc/mongodb.conf

# mongodb.conf
# in replca set configuration, specify the name of the replicate set
replSet = miRS

// Reiniciar la instancia

$ sudo service mongodb restart

$ mongo

$ rs.status
{
	...
}

// no se ocupa hacer rs.inititate() ya que replica set se encuentra iniciado por otro lado y este miembro sera uno 
// que agregaremos a este ya existente.

// Tomemos nota del host donde se encuentra la instancia de mongod para poder agregarla al "replica set"
$ ifconfig

eth1      Link encap:Ethernet  HWaddr **:**:**:**:**:**
          inet addr:192.168.33.10  Bcast:192.168.33.255  Mask:255.255.255.0

// Regresamos a la instancia primaria
$ rs.add('192.168.33.10:27017')
// { "ok": 1 }

$ rs.status() 

$ rs.conf()

// Nota: El caso se tuvo colocar en el archivo /etc/hosts de mi equipo secundarios la asociacion del host
// Mordor.local a la IP de mi equipo principal 192.168.0.100, ya que el nuev o miembro no podria resolver ese 
// nombre a nivel DNS para lograr conectarse con el miembro principal

// AGREGAR ARBITRO

$ rs.addArb()

// 	CONFIGURACION DE MIEMBROS
// Se debe de hacer esta configuracion desde el miembro primario

$ rs.conf()

$ config = rs.conf()

// Configuracion de miembro retrasado - prioridad 0, miembro escondido, tiempo de retraso

$ config.member[1].priority = 0
$ config.member[1].hidden = true
$ config.member[1].slaveDelay = 3600

// votes - influencia de elecciones

$ rs.reconfig(config)

$ rs.conf()

{
	"members" :[
		{
			"_id",
			"priority",
			...
		}
	]
}

// Tambien se puede configurar directo el miembr cuando se esta agregando al "replica set"
// especificando los paraetros directamente

$ rs.add({ _id: 1, host: '192...', priority: 0, hidden:true, slaveDelay:3600 })

// ELIMINACION DE MIEMBROP

$ rs.stepdown(<cantidad_segundos>) // En el miembro primario - esto dejara a ceder su papel como primario
// y evitar ser elegido en la siguiente eleccion durante la cantidad de segundos indicada.


// Elimiar un miembro desde el primario
$ rs.remove('192.168.33.10:27017')

$ rs.status()
$ rs.confi()
// Ya no formara parte de la misma

// CONVERTIR MIEMBRO EN INDEPENDIENTE
// Para utilizar el antiguo miembro secundario como una instancia aislada nuevamente ejecutamos el comando 
// de inicio de la instancia sin el parametro --replSet 

$ sudo nano /etc/mongodb.conf

# replSet = miRS # eliminamos o comentamos esta linea

$ sudo service mongodb restart

$ mongo

$ use local

$ db.dropDatabase()
