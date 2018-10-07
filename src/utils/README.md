# Data Json api

## CRUD

1. Create File

```ts
    _jsonFile.create('users', 'newFile', {'foo': 'bar'}, (err) => {
        console.log('This was the message', err);
    });

```
2. Read from file

```ts
    _jsonFile.read('users', 'newFile', (err, data) => {
        console.log('This was the message', err, data);
    });
```

3. Update file

```ts
    _jsonFile.update('users', 'newFile', {'name': 'oshri'}, (err) => {
        console.log('This was the message', err);
    });
```

4. Delete file

```ts
    _jsonFile.delete('users', 'newFile', (err) => {
        console.log('This was the message', err);
    });
```