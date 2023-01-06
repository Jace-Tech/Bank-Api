# BANK API

## ROUTES

> GET: /

### Response

```json
{
  "message": "Hello Bank API"
}
```

> GET: /ping

### Response

```json
{
  "message": "Hello Bank API"
}
```

> POST: /auth/sign-up

### Required Body

- name: string
- email: string
- password: string

### Response

```json
{
  "message": "User created",
  "data": {
      "id": "63b807d12dfdd60c99611a07",
      "name": "Jace Alexander",
      "email": "alexjace151@gmail.com",
      "isActive": true,
      "role": "user",
      "accountNumber": "164996154",
      "accountType": "savings",
      "balance": 0
  },
  "success": true
}
```

> POST: /auth/sign-in

### Required Body

- email: string
- password: string

### Response

```json
{
  "message": "Logged in successfully",
  "data": {
      "user": {
          "_id": "63b7f3399d65f7326f834266",
          "name": "Jace Alexander",
          "email": "alexjace151@gmail.com",
          "isActive": true,
          "role": "user"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2I3ZjMzOTlkNjVmNzMyNmY4MzQyNjYiLCJyb2xlIjoidXNlciIsImlhdCI6MTY3MzAwMjQ2OSwiZXhwIjoxNjczNjA3MjY5fQ.0DKyqiCkKrcs6Rix5WT66bz-zdws8HJhz006aETYisE"
  },
  "success": true
}
```

> POST: /auth/sign-in

### Required Body

- email: string
- password: string

### Response

```json
{
  "message": "Logged in successfully",
  "data": {
      "user": {
          "_id": "63b7f3399d65f7326f834266",
          "name": "Jace Alexander",
          "email": "alexjace151@gmail.com",
          "isActive": true,
          "role": "user"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2I3ZjMzOTlkNjVmNzMyNmY4MzQyNjYiLCJyb2xlIjoidXNlciIsImlhdCI6MTY3MzAwMjQ2OSwiZXhwIjoxNjczNjA3MjY5fQ.0DKyqiCkKrcs6Rix5WT66bz-zdws8HJhz006aETYisE"
  },
  "success": true
}
```

> GET: /user  `protected` ONLY ADMIN

### Required Headers
- authorization: string. eg `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2I3ZjMzOTlkNjVmNzMyNmY4MzQyNjYiLCJyb2xlIjoidXNlciIsImlhdCI6MTY3MzAwMjQ2OSwiZXhwIjoxNjczNjA3MjY5fQ.0DKyqiCkKrcs6Rix5WT66bz-zdws8HJhz006aETYisE`

### Response

```json
{
  "message": "All users",
  "data": [
      {
          "_id": "63b7f3399d65f7326f834266",
          "name": "Jace Alexander",
          "email": "alexjace151@gmail.com",
          "password": "1234",
          "isActive": true,
          "role": "user",
          "createdAt": "2023-01-06T10:08:57.586Z",
          "updatedAt": "2023-01-06T10:08:57.586Z"
      }
  ],
  "success": true
}
```

> GET: /user/:id  `protected` USER & ADMIN

### Required Headers
- authorization: string. eg `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2I3ZjMzOTlkNjVmNzMyNmY4MzQyNjYiLCJyb2xlIjoidXNlciIsImlhdCI6MTY3MzAwMjQ2OSwiZXhwIjoxNjczNjA3MjY5fQ.0DKyqiCkKrcs6Rix5WT66bz-zdws8HJhz006aETYisE`

### Response

```json
{
  "message": "All users",
  "data":{
    "_id": "63b7f3399d65f7326f834266",
    "name": "Jace Alexander",
    "email": "alexjace151@gmail.com",
    "password": "1234",
    "isActive": true,
    "role": "user",
    "createdAt": "2023-01-06T10:08:57.586Z",
    "updatedAt": "2023-01-06T10:08:57.586Z"
  },
  "success": true
}
```


> DELETE: /user/:id  `protected` USER & ADMIN <i>User can only delete his / her account</i>

### Required Headers
- authorization: string. eg `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2I3ZjMzOTlkNjVmNzMyNmY4MzQyNjYiLCJyb2xlIjoidXNlciIsImlhdCI6MTY3MzAwMjQ2OSwiZXhwIjoxNjczNjA3MjY5fQ.0DKyqiCkKrcs6Rix5WT66bz-zdws8HJhz006aETYisE`

### Response

```json
{
  "message": "User deleted",
  "data":{
    "_id": "63b7f3399d65f7326f834266",
    "name": "Jace Alexander",
    "email": "alexjace151@gmail.com",
    "password": "1234",
    "isActive": true,
    "role": "user",
    "createdAt": "2023-01-06T10:08:57.586Z",
    "updatedAt": "2023-01-06T10:08:57.586Z"
  },
  "success": true
}
```

> GET /user/:id/account  `protected` USER & ADMIN <i>User can only get his / her account</i>

### Required Headers
- authorization: string. eg `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2I3ZjMzOTlkNjVmNzMyNmY4MzQyNjYiLCJyb2xlIjoidXNlciIsImlhdCI6MTY3MzAwMjQ2OSwiZXhwIjoxNjczNjA3MjY5fQ.0DKyqiCkKrcs6Rix5WT66bz-zdws8HJhz006aETYisE`

### Required Params

- id: string - `Users id`

### Response

```json
{
  "message": "User account",
  "data":{
    "_id": "63b7f3399d65f7326f834268",
    "user": {
        "_id": "63b7f3399d65f7326f834266",
        "name": "Jace Alexander",
        "email": "alexjace151@gmail.com",
        "password": "1234",
        "isActive": true,
        "role": "user",
        "createdAt": "2023-01-06T10:08:57.586Z",
        "updatedAt": "2023-01-06T10:08:57.586Z",
        "__v": 0
    },
    "accountNumber": "317648467",
    "balance": 0,
    "accountType": "savings",
    "pin": null,
    "createdAt": "2023-01-06T10:08:57.643Z",
    "updatedAt": "2023-01-06T10:08:57.643Z"
  },
  "success": true
}
```

> GET /user/accounts  `protected` ADMIN

### Required Headers
- authorization: string. eg `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2I3ZjMzOTlkNjVmNzMyNmY4MzQyNjYiLCJyb2xlIjoidXNlciIsImlhdCI6MTY3MzAwMjQ2OSwiZXhwIjoxNjczNjA3MjY5fQ.0DKyqiCkKrcs6Rix5WT66bz-zdws8HJhz006aETYisE`

### Response

```json
{
  "message": "User accounts",
  "data": [
      {
          "_id": "63b7f3399d65f7326f834268",
          "user": {
              "_id": "63b7f3399d65f7326f834266",
              "name": "Jace Alexander",
              "email": "alexjace151@gmail.com",
              "password": "1234",
              "isActive": true,
              "role": "user",
              "createdAt": "2023-01-06T10:08:57.586Z",
              "updatedAt": "2023-01-06T10:08:57.586Z",
              "__v": 0
          },
          "accountNumber": "317648467",
          "balance": 0,
          "accountType": "savings",
          "pin": null,
          "createdAt": "2023-01-06T10:08:57.643Z",
          "updatedAt": "2023-01-06T10:08:57.643Z"
      },
      {
          "_id": "63b8367163e64995fa0c4bc6",
          "user": {
              "_id": "63b8367163e64995fa0c4bc4",
              "name": "Mace Alexander",
              "email": "jacealex151@gmail.com",
              "password": "1234",
              "isActive": true,
              "role": "admin",
              "createdAt": "2023-01-06T14:55:45.184Z",
              "updatedAt": "2023-01-06T14:55:45.184Z",
              "__v": 0
          },
          "accountNumber": "721830152",
          "balance": 0,
          "accountType": "savings",
          "pin": null,
          "createdAt": "2023-01-06T14:55:45.523Z",
          "updatedAt": "2023-01-06T14:55:45.523Z"
      }
  ],
  "success": true
}
```
