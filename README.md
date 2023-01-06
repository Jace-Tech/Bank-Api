# BANK API

## ROUTES

> GET > /api/

### Response

```json
{
  "message": "Hello Bank API"
}
```

> GET > /api/ping

### Response

```json
{
  "message": "Hello Bank API"
}
```

> POST: /api/auth/sign-up

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

> POST: /api/auth/sign-in

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