# Backend Api Documentation

## ENV Settings

- **PORT**: Port for express server
- **LOG_LEVEL**: Winston log level
- **JWT_SECRET**: JSON Webtoken secret
- **NODE_ENV**: Node environment

## Authentication

POST `/api/register`

Key | Value | Description
--- | --- | ---
name | *string* | The name of the user
email | *string* | The email of the user, who tries to register (must be unique)
password | *string* | The preferred password of the user (min. 8 characters)

--> Success response:
```json
{
    "success": true,
    "message": "User {email} successfully created",
    "token": "generatedToken..."
}
```

POST `/api/login`

Key | Value | Description
--- | --- | ---
email | *string* | The users email
password | *string* | The users password
loggedIn | *boolean* | State of checkbox if user want to stay logged in for a long time

--> Success response:
```json
{
    "success": true,
    "message": "You successfully logged in!",
    "token": "generatedToken..."
}
```

## History

To access the history view a user must be logged in. So you have to provide an the bearer token for the backend.

GET `/api/history`

Header fields:
Key | Value | Description
--- | --- | ---
Authorization | *string*| The bearer token of logged in user ("Bearer " + token)