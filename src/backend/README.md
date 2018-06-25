# Backend Api Documentation

## ENV Settings

- **PORT**: Port for express server
- **LOG_LEVEL**: Winston log level
- **JWT_SECRET**: JSON Webtoken secret
- **NODE_ENV**: Node environment
- **EMAIL_USER**: Email address of gmail user
- **EMAIL_PASSWORD**: Passwort for gmail account

## Configuration

In `./config/` you can find several configuration files for the backend:

- *default.json*: Default-Values if other config files dont provide the values.
- *test.json*: Configuration for mocha tests
- *dev.json*: Development settings
- *production.json*: Production setting

**Note**: If you`re changing the VAPID Keys, make sure to edit the corresponding angular environment variables of [default environment](../environments/environment.ts) and  [producation environment](../environments/environment.prod.ts).

---

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
    "message": "User {email} successfully created"
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
    "token": "generatedToken...",
    "data": {
        logged in user
    }
}
```

---

## History

To access the history view a user must be logged in. So you have to provide an the bearer token for the backend.

GET `/api/history`

Header fields:

Key | Value | Description
--- | --- | ---
Authorization | *string*| The bearer token of logged in user ("Bearer " + token)

--> Success response:

```json
{
    "success": true,
    "data": [histories]
}
```

---

## Analysis

To access the history view a user must be logged in. So you have to provide an the bearer token for the backend.

GET `/api/analysis`

Header fields:

Key | Value | Description
--- | --- | ---
Authorization | *string*| The bearer token of logged in user ("Bearer " + token) (optional)

FormData fields:
Key | Value | Description
--- | --- | ---
crop_id | *number*| id of plant
image_file | *blob* | Image file of plant
email | *string* | Email to which result shall be sent
subscription | *NotificationSubscription* | Subscription if user allowed notifications (optional)

--> Success response:

```json
{
    "success": true,
    "method": "pull/push",
    "data": "jobId"
}
```

---

## Get result

GET `/api/result/:id`

Returns the job by its id

Get paramter:

Key | Value | Description
--- | --- | ---
id | *string*| id of job

---

## Plants

CRUD routes for plants

### Get all plants

GET `/api/plants`

Returns all plants

### Get a plant

GET `/api/plants/:id`

Return a plant by its id

Get paramter:

Key | Value | Description
--- | --- | ---
id | *string*| id of plant

---

## Diseases

CRUD routes for diseases

### Get all diseases

GET `/api/diseases`

Returns all diseases

### Get a disease

GET `/api/diseases/:id`

Return a disease by its id

Get paramter:

Key | Value | Description
--- | --- | ---
id | *string*| id of disease

---

## Gardeners

CRUD routes for gardeners

### Get all gardeners

GET `/api/gardeners`

Returns all diseases

### Get a gardener

GET `/api/gardeners/:id`

Return a gardener by its id

Get paramter:

Key | Value | Description
--- | --- | ---
id | *string*| id of gardener

### Add/Update a gardener

POST `/api/gardeners`

Adds a gardeners or if exitsting updates the entry

Body fields:

Key | Value | Description
--- | --- | ---
name | *string*| Name of gardeners business
email | *string*| Email of gardener
phone | *string*| Phone number of gardener (optional)
latitutde | *number*| Latitude of gardeners business
longitude | *number*| Longitude of gardeners business

---

## Notification

POST `/api/notifcation/result`

Route for spacenus api: Delivers the result to backend and database
-> User will be notified if he activated his notifications

## Email

POST `/api/email`

Send an email

Body fields:

Key | Value | Description
--- | --- | ---
sender | *string*| Email adress of user
receiver | *string*| Email adress of gardener
subject | *string*| Email subject
message | *string*| Email message of user
content | *any*| Additional content to identify in backend

---

## Users

CRUD operations for user

Every request requires the Authorization header:

Key | Value | Description
--- | --- | ---
Authorization | *string*| The bearer token of logged in user ("Bearer " + token) (optional)

### Get the user data

GET `/api/users`

Returns the user data for authorized user

### Update a user

PATCH `/api/users`

Update the user fields

Body fields:

Key | Value | Description
--- | --- | ---
password | *string*| Current password of user (required)
new_password | *string*| New password of user
name | *string*| New name of user

### Delete a user

POST `/api/users/delete`

Deletes a user from the database

Body fields:

Key | Value | Description
--- | --- | ---
password | *string*| Current password of user (required)