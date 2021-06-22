## MediaSell
### Short Description
This is a website where anyone can buy and sell products from specific stores. It is developed using the MERN stack (Mongo, Express, React and Node).

### Nodemon
Make sure you install nodemon globally to run this app using the following command in the terminal:
```
npm install nodemon -g
```
Then in order to run the app, use the following command:
```
nodemon
```

### Recommended versions:
* node: v12.18.3
* npm: v6.14.6
* nodemon:  v2.0.7

### Data Details
This website contains three collections of data:
* Users - (people that use the application),
Example of a user document:
  ```
  "data": {
        "role": "NORMAL",
        "_id": "60b0318bff33c83cc0b3f643",
        "created_at": "2021-05-27T23:55:55.743Z",
        "username": "SomeUser",
        "password": "abc",
        "full_name": "Some User",
        "phone_number": "123 456 789",
        "email": "someuser@gmail.com",
        "__v": 0
    }
  ```
* Posts - (items that people sell),
Example of a post document:
```
"data": {
        "_id": "60bd379c96efd1ec27a3617d",
        "name": "Samsung Galaxy s3",
        "cost": 3232,
        "description": "Amazing phone",
        "state": "New",
        "created_at": "2021-06-22T10:26:48.294Z"
    }
```
* Stores - (stores that posts are associated by)
Example of a store document:
```
"data": {
         "location": {
             "city": "Bihac",
             "address": "Some Street 321"
         },
         "_id": "60c8c244b860d0204c719e72",
         "name": "Adidas Store",
         "__v": 0
    }
```



