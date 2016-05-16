### Examples and about is MongoDB

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

db.authors.update({ name: 'Josh' }, { $pop: { section: 1 } });


### $pull - Destroy by update

db.authors.update({ name: 'Josh' }, $pull : { sections: ['Jquery', 'GO'] });

## .save()
Another way to update or insert data, use command .save();

db.authors.save({
    name: 'Mark'
});

### update with save()

db.authors.save({
    _id: ObjectId('XXXX...'),
    name: 'Mark A',
    sections: ['Laravel', 'PHP']
});

// Updated all, columns and values.

By //scotch.io/