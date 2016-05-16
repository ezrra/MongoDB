### Examples and about is MongoDB

#### Database Authors

## .insert()

```
db.authors.insert({
    name: “Juan”,
    last_name: “Lopez”,
    sections: [‘how to’, ‘MongoDB’]
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
By //scotch.io/