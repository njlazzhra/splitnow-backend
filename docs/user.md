# User API Spec

# Register User

Endpoint : POST /api/users

Request Body

````json
{
  "username": "imam",
  "Password": "rahasia",
  "name": "imamm ronaldo"
}
````

Response Body Succsess

```json
{
  "data": {
    "username": "imam",
    "name": "imam ronaldo"
  }
}
```

Response Body Erorr

```json
{
  "data": {
    "erorrs": "username already taken"
  }
}
```

# Login API

Endpoint : POST /api/users/login

Request Body

````json
{
  "Username": "imam",
  "password": "Rahasia"
}
````

Response Body Succses

```json
{
  "data": {
    "token": "uuid/jwt"
  }
}
```

Response Body Error

```json
{
  "errors": "username or password wrong"
  
}
```

# Update User

Endpoint : PATCH api/users/current

Headers :

- Authorization: token

Request Body

```json
{
  "name": "lionel Bintang",
  "password": "new password" 
}
```

Response Body Error

```json
{
  "errors": "name length max 100"
}
```

# GET User API

Endpoint : GET /api/users/current

Headers :
- Authorization: token

Response Body Succsses

```json
{
  "data": {
    "username": "Bintang",
    "name": "Bintang Aulia"
  }
}
```

Response Body Error

```json
{
  "errors" : "Unauthorized"
}
```

# Logout User API

Endpoint : DELETE /api/users/logout

Response Body Succses

```json
{
  "data":"ok"
}
```

Response Body Error

```json
{
  "errorr": "Unauthorized"
}
```

