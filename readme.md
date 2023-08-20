### 🎯 Digital Cow Hut Service : 
```ts
    install:  
    npm install --global yarn ,
    yarn add -D typescript ,
    yarn add express mongoose dotenv, 
    tsc --init ,
    yarn add ts-node-dev --dev ,
    yarn add cors
    npm i --save-dev @types/express, yarn add --save-dev @types/cors, 
    add into package.json : "start" : "ts-node-dev --respawn --transpile-only server.ts"
    run: npm run dev.
    eslint prettier lintrec setup guide: https://blog.logrocket.com/linting-typescript-eslint-prettier/
    yarn add prettier eslint eslint-config-prettier eslint-plugin-prettier --dev,
    check linting:--> yarn lint:check
    check prettier:--> yarn prettier:check
    yarn add husky --dev, yarn husky install ,
    yarn add -D lint-staged,
    yarn add winston (error handler),
    yarn add Zod, yarn add http-status,
```

### 📗 Table of Content:
```ts
| >> Topic's i've learned :     
| ----------------------------- | --------------------------- | ------------------------------- |
| SDLC                          | Requirement Analysis        | ER Diagram Software             |
| Project Management-(JIRA)     | husky , lint-staged         | Modular / MVC pattern           |
| Advanced error handling       | Microservice                | NoSQL Database Design           |
| Aggregation                   | Rollback & Transaction      | logger (winston)                |
| ZOD Validation                | Rollback & Transaction      | logger (winston)                |

```



This is the documentation for the Authentication Service component of the University Management System. The Authentication Service provides authentication and authorization functionalities for the three main roles in the system: Admin, Student, and Faculty. It is built using TypeScript, Express.js, Zod validation, and MongoDB.

## Functional Requirements::

### Student

- Student can login and log out.
- Student can manage and update their profile.
- Student can update certain fields.

### Admin

- Admin can log in and log out.
- Admin can manage and update their profile.
- Admin can only update certain fields.
- Admin can manage user accounts:
  - Change Password

### Faculty

- Faculty can log in and log out.
- Faculty can manage and update their profile.
- Faculty can only update certain fields.

## API Endpoints

### User

- `POST /users/create-student`
- `POST /users/create-faculty`
- `POST /users/create-admin`

### Student

- `GET /students`
- `GET /students?searchTerm=fr797`
- `GET /students?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET /students/:id`
- `PATCH /students/:id`
- `DELETE /students/:id`

### Faculty

- `GET /faculties`
- `GET /faculties?searchTerm=john`
- `GET /faculties?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET /faculties/:id`
- `PATCH /faculties/:id`
- `DELETE /faculties/:id`

### Admin

- `GET /admins`
- `GET /admins?searchTerm=us88`
- `GET /admins?page=1&limit=10&sortBy=gender&sortOrder=asc`
- `GET /admins/:id`
- `PATCH /admins/:id`
- `DELETE /admins/:id`

### Academic Semester

- `POST /academic-semesters/create-semester`
- `GET /academic-semesters`
- `GET /academic-semesters?searchTerm=fal`
- `GET /academic-semesters?page=1&limit=10&sortBy=year&sortOrder=asc`
- `GET /academic-semesters/:id`
- `PATCH /academic-semesters/:id`
- `DELETE /academic-semesters/:id`

### Academic Department

- `POST /academic-departments/create-department`
- `GET /academic-departments`
- `GET /academic-departments?searchTerm=math`
- `GET /academic-departments?page=1&limit=10&sortBy=title&sortOrder=asc`
- `GET /academic-departments/:id`
- `PATCH /academic-departments/:id`
- `DELETE /academic-departments/:id`

### Academic Faculty

- `POST /academic-faculties/create-faculty`
- `GET /academic-faculties`
- `GET /academic-faculties?searchTerm=com`
- `GET /academic-faculties?page=1&limit=10&sortBy=title&sortOrder=asc`
- `GET /academic-faculties/:id`
- `PATCH /academic-faculties/:id`
- `DELETE /academic-faculties/:id`

### Authentication

- `POST /auth/login`
- `POST /auth/change-password`
- `POST /auth/refresh-token`
