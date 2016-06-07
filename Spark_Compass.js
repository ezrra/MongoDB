// SPARK COMPASS

// db.EventPerDay
{
	_id:,
	OrgId,
	AppId,
	AppInstanceId,
	EndUserId,
	EntityId,
	EventDate,
	LoggedTime,
	Events: [
		{
			Entry,
			Exit,
			Diff
		}
	]
}

/* ------------------------------------------------------------------------------------------------ */

// Event_log
{
	"DeviceId" : ObjectID('APP1'),
	"EventId": ObjectID('EVENT1'),
	"Date": '06-02-2016',
	"BeacondId": ObjectID('BEACON1'),
	"EntryTimestamp" : '08:00',
	"ExitTimestamp" : '12:00',
	"DualTimestamp" : '04:00'
}

// Or

// Event_log
{
	"DeviceId" : ObjectID('APP1'),
	"EventId": ObjectID('EVENT1'),
	"Date": '06-02-2016',
	"BeacondId": ObjectID('BEACON1'),
	"entries": [
		{
			"EntryTime" : '08:00',
			"ExitTime" : '12:00',
			"DualTime" : '04:00'
		},
		{
			"EntryTimestamp" : '08:00',
			"ExitTimestamp" : '12:00',
			"DualTimestamp" : '04:00'
		}
	]
	
}

// Beacon
{
	"_id": ObjectID('BEACON2')
	"Name": ""
}

// Event
{
	"_id": "EVENT1",
	"Name": "Super Bowl",
	"BeacondId" : ObjectID('BEACON2')
}

// Users
{
	"_id": ObjectID('USER1'),
	"Name": "Mark",
	"Devices": [
		ObjectID('DEVICE1'), ObjectID('DEVICE2')
	]
}

// Devices
{
	"_id": ObjectID('DEVICE1'),
	"Description": "Samsung Model 5"
},
{
	"_id": ObjectID('DEVICE2'),
	"Description": "LG Model 1"
},
{
	"_id": ObjectID('DEVICE3'),
	"Description": "LG Model 2"
},
{
	"_id": ObjectID('DEVICE4'),
	"Description": "LG Model 3"
}

db.dbd.insert({ 
    "DeviceId": "DEVICE02",
    "BeaconID" : "BEACOND1",
    "Date": ISODate('2016-02-06T08:01:00.301Z'),
    "entries": [
        { "EntryTime": "08:01:00" }
     ]
})

{ "_id" : ObjectId("5751d7bd95cf521d28033afc"), "DeviceId" : "DEVICE01", "BeaconID" : "BEACOND1", "Date" : ISODate("2016-02-06T08:00:01.301Z"), "entries" : [ { "EntryTime" : "08:00:01" } ] }

/* ------------------------------------------------------------------------------------------------ */

// Beacon
{
	"_id": ObjectID('BEACON2')
	"name": "Entrance1",
	"eventId": ObjectID('EVENT1'),
	"eventLog": [ // Event_log
		{
			"DeviceId" : ObjectID('APP1')
			"UserId" : ObjectID('USER1')
			"EntryTimestamp" : '06-02-2016 08:00'
			"ExitTimestamp" : '06-02-2016 12:00'
		},
		{
			"DeviceId" : ObjectID('APP1')
			"UserId" : ObjectID('USER1')
			"EntryTimestamp" : '06-02-2016 08:00'
			"ExitTimestamp" : '06-02-2016 12:00'
			"DualTimestamp" : '00:00:00 04:00'
		}
	],
	entries : [
		{
			deviceId,
			userId,
			loggedtime
		}
	],
	exists : [
		{
			deviceId,
			userId,
			loggedtime
		}
	],
}

// Users
{
	"_id": ObjectID('USER1'),
	"name": "Mark",
	"devices": ['DEVICE1']
}

// Event
{
	"_id": ObjectID('EVENT1'),
	"name": "Super Bowl"
}

// * Insert a item or event in beacon
var event_log = [
	"deviceId" : ObjectID('DEVICE1'),
	"userId" : ObjectID('USER1'),
	"entryTimestamp" : '06-02-2016 08:00'
];

$ db.beacon.insert({ event_log: event_log })

// * Update a item or event by beacon
$ var user_event = db.beacon.find({ '_id': 'BEACON2', 'event_log.UserId': 'USER1' })
$ var value_dual = ... getDualTimestamp();
$ db.beacon.update({ _id: 'BEACON2', event_log: UserId: 'USER1' }, { $set: { ExitTimestamp: '06-02-2016 12:00', DualTimestamp: value_dual } })
