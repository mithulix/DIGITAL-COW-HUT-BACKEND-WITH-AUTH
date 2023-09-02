### WELCOME TO DIGITAL-COW-HUT-WITH-AUTH PROJECT.

### LIVE PREVIEW -> https://digital-cow-hut-backend-jade.vercel.app/

### Application Routes:
1. [User](#user)
2. [Buyer](#buyer)
3. [Seller](#seller)
4. [Cows](#cows)
5. [Orders](#orders)
6. [Pagination](#pagination)


### TABLE OF CONTENTS :

1. [User](#user)
2. [Buyer](#buyer)
3. [Seller](#seller)
4. [Cows](#cows)
5. [Orders](#orders)
6. [Pagination](#pagination)

### User : 

- `POST /users/signup-buyer`: create a new buyer.
- `POST /users/signup-seller`: create a new seller.
- `GET /users`: Retrieve a list of users.
- `GET /users/{id}`: Retrieve details of a specific user.
- `PATCH /users/{id}`: Update an existing user.
- `DELETE /users/{id}`: Delete a user.

### Buyer : 

- `GET /buyers/`: Retrieve a list of buyer.
- `GET /buyers/{id}`: Retrieve details of a specific buyer.
- `PATCH /buyers/{id}`: Update an existing buyer.
- `DELETE /buyers/{id}`: Delete a buyer.

### Seller : 
- `GET /sellers`: Retrieve a list of seller.
- `GET /sellers/{id}`: Retrieve details of a specific seller.
- `PATCH /sellers/{id}`: Update an existing seller.
- `DELETE /sellers/{id}`: Delete a seller.

### Cows : 

- `GET /cows/create-cow`: Create a new cow.
- `GET /cows/{id}`: Retrieve details of a specific cow.
- `GET /cows/`: Retrieve a list of cows.
- `PATCH /cows/{id}`: Update an existing cow.
- `DELETE /cows/{id}`: Delete a cow.

### Orders : 

- `POST /orders/order-cow`: Create a new order.
- `GET /orders/`: Retrieve a list of orders.
- `GET /orders/{id}`: Retrieve details of a specific order.

### Pagination

- api/v1/users?page=1&limit=10
- api/v1/orders?sortBy=price&sortOrder=asc
- api/v1/cows?page=1&limit=10
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?minPrice=20000&maxPrice=70000
- api/v1/cows?location=Chattogram
- api/v1/cows?searchTerm=Cha
