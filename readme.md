### WELCOME TO DIGITAL-COW-HUT-WITH-AUTH PROJECT.

### LIVE PREVIEW -> https://digital-cow-hut-backend-jade.vercel.app/

### Application Routes:

### Sample Login User [POST] :
```json
{
  "phoneNumber": "01792878278",
  "password": "@mithu123"
}
```

### sample json for creating a new seller :
```json
{
  "phoneNumber": "01792878278",
  "password": "@mithu123",
  "seller": {
    "name": {
      "firstName": "Mohaiminul",
      "lastName": "Islam"
    },
    "phoneNumber": "+6555345",
    "address": "singapore",
    "income": 1600000
  }
}
```

### get a seller:
```json
{
  "phoneNumber": "01055698544",
  "password": "rakib435"
}
```

### sample json for creating a new Buyer : 
```json
{
  "phoneNumber": "01055698544",
  "password": "rakib435",
  "buyer": {
    "name": {
      "firstName": "Rakib",
      "lastName": "Islam"
    },
    "address": "Gulshan",
    "budget": 150000
  }
}
```

### Sample create Admin [POST]
```json
{
  "password": "Jim445",
  "role": "admin",
  "name": {
    "firstName": "Jannatul ",
    "lastName": "Ferdous"
  },
  "phoneNumber": "0178999454",
  "address": "Nilphamari, Domar"
}
```

### Sample Login ADMIN [POST]
```json
{
  "phoneNumber": "0178999454",
  "password": "Jim445"
}
```


### Sample Cow Data for create a cow : [POST]
```json
{
  "name": "kalachan",
  "age": 3,
  "price": 162000,
  "location": "khulna",
  "breed": "Sahiwal",
  "weight": 300,
  "label": "for sale",
  "category": "Beef",
  "seller": "64f300f37c4212f756b3d261"
}
```


