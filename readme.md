### welcome to digital-cow-hut project.

### Live Preview --->> https://digital-cow-hut-backend-jade.vercel.app/

### Table of Contents:

1. [User](#user)
2. [Cow](#cow)
3. [Order](#order)
4. [Pagination](#pagination)
5. [Orders](#orders)

### User

- `GET /users`: Retrieve a list of users.
- `GET /users/{id}`: Retrieve details of a specific user.
- `POST /users`: Create a new user.
- `PUT /users/{id}`: Update an existing user.
- `DELETE /users/{id}`: Delete a user.

### Cow

- `GET /cows`: Retrieve a list of cows.
- `GET /cows/{id}`: Retrieve details of a specific cow.
- `POST /cows`: Create a new cow.
- `PUT /cows/{id}`: Update an existing cow.
- `DELETE /cows/{id}`: Delete a cow.

### Order

- `GET /orders`: Retrieve a list of orders.
- `GET /orders/{id}`: Retrieve details of a specific order.
- `POST /orders`: Create a new order.

### Pagination

- api/v1/users?page=1&limit=10
- api/v1/orders?sortBy=price&sortOrder=asc
- api/v1/cows?page=1&limit=10
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?minPrice=20000&maxPrice=70000
- api/v1/cows?location=Chattogram
- api/v1/cows?searchTerm=Cha

### Orders

- api/v1/orders (POST)
- api/v1/orders (GET)
- api/v1/orders/648f20d2cf3746f1ec2a9437 (GET) Include an id that is saved in your database
