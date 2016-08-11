### Examples with MongoDB

#### Database Authors

## .insert()

```
db.authors.insert({
    name: “Josh”,
    last_name: “L”,
    sections: [‘Javascript’, ‘MongoDB’]
});
```

## .find()

```
db.authors.find()
```
filter

```
db.authors.find({ admin: true });
db.authors.find({ gender: 'M', sections: 'GIT' });
```

## .remove() & .drop()
```
db.authors.remove({ name: 'Josh' });
db.authors.remove();
db.authors.drop();
```

## .update()

### Upsert // false default
### Multi // false default

```
db.authors.update({ name: 'Josh' }, { name: 'Mark', las_name : '---', sections: ['ruby', 'python'] });
```
## Operators modification
### $set - Add news column and set value
```
db.authors.update({ name: 'Mark' }, { $set: { age: 30 } });
```
### $unset - delete the column
```
db.authors.update({ name: 'Mark' }, { $unset: { age: '' } })
```

### $push - 
```
db.authors.update({ name: 'Josh' }, { $push: { sections: 'Jquery' } });
```

### $pop - 
```
db.authors.update({ name: 'Josh' }, { $pop: { section: 1 } });
```

### $pull - Destroy by update
```
db.authors.update({ name: 'Josh' }, $pull : { sections: ['Jquery', 'GO'] });
```

## .save()
Another way to update or insert data, use command .save();
```
db.authors.save({
    name: 'Mark'
});
```

### update with save()
```
db.authors.save({
    _id: ObjectId('XXXX...'),
    name: 'Mark A',
    sections: ['Laravel', 'PHP']
});
```

// Updated all, keys and values.

## Data modeling

### BSON - JSON Binary

#### Datatype

String 
Integer
Double
Boolean
Date
Timestamp
Null
Array
Array
Object
ObjectId
Data Binary
Javascript

### Modeling Patterns

#### Two patterns

##### Embedded
Documents embed one within the other (ADT)

#### Referencing

---

#### Relations 1 - 1
Example
```
Person = {
    name: 'Jonh',
    last_name: 'W.',
    gender: 'M'
};

PersonalDocument = {
    passport: 'SDADCFCF',
    licence: 'ASADSA53135' 
};
```

Example Embedded
```
Person = {
    name: 'Josh',
    last_name: 'W.',
    gender: 'M',
    documents: {
        passport: 'SDADCFCF',
        licence: 'ASADSA53135'
    }
}
```

#### Relations 1 - *
##### Example Embedded
```
Person = {
    nameL 'Josh',
    last_name: 'W.',
    gender: 'M',
    addresses: [{
        country: 'Venezuela',
        state: 'Distrito capital',
        city: 'Caracas'
    },{
        country: 'Estados Unidos',
        state: 'Florida',
        city: 'Miami'
    }]
};
```

##### Example Referencing

```
address_1 = {
    _id : '1',
    country: 'Venezuela',
    state: 'Distrito capital'
}

address_2 = {
    _id = '2',
    country: 'Estados Unidos',
    state: 'Florida'
}

person = {
    name: 'Josh',
    gender: 'M',
    addresses: [1, 2]
}
```
or

```
person = {
    _id: 1,
    name: 'Josh',
    gender: 'M'
};

address_1 = {
    _id : 1,
    country: 'Venezuela',
    state: 'Distrito capital',
    person_id: 1
}

address_2 = {
    _id = 2,
    country: 'Estados Unidos',
    state: 'Florida',
    person_id: 1
}
```

#### Relations * - *

```
address_1 = {
    _id: 1,
    city: 'Venezuela',
    people: [1000]
};

address_2 = {
    _id: 2,
    city: 'Estados Unidos',
    people: [1000, 1001]
};

person_1 = {
    _id: 1000,
    name: 'Josh',
    addresses: [1, 2]  
};

person_2 = {
    _id: 1001,
    name: 'Mark',
    addresses: [2]
}

```

#### intermediate table with columns

```
address_1 = {
    _id: 1,
    city: 'Venezuela',
    people: [1000]
};

address_2 = {
    _id: 2,
    city: 'Estados Unidos',
    people: [1000, 1001]
};

person_1 = {
    _id: 1000,
    name: 'Josh',
    addresses: [{
        address_id: 1,
        live_here: true
    }, {
        address_id: 2,
        live_here: false
    }]
};

person_2 = {
    _id: 2,
    name: 'Mark',
    addresses: [{
        address_id: 2,
        live_here: true
    }]
};

```

By //scotch.io/ and //codehero.cc