## Educase API
### *First request to the server can take upto 50 sec to a min because render put services in sleep after 15mins of inactivity. I request you give a min to your first request then everything will run smoothly*

[POSTMAN COLLECTION](https://github.com/sk0x/Educase-API/blob/main/Educase%20India%20School%20API.postman_collection.json)

A RESTful API for managing school records and retrieving nearby schools based on geographic coordinates. Built with Node.js, Express, and MySQL.

### Features
*  Add a new school with name, address, longitude, and latitude.

*  List schools sorted by proximity to a location.

*  Request validation with meaningful error responses.

*  Rate limiting to prevent abuse.

*  Automatic database table setup on first run.

#### Tech Stack
* Backend: Node.js, Express

* Database: MySQL (using mysql2)

* Validation: express-validator

* Environment Management: dotenv

## Endpoints

1. `POST https://educase-api-nmgg.onrender.com/api/v1/addSchool`
Adds a new school to the database.

#### Request Body:


```json
{
  "name": "Greenwood High",
  "address": "123 Main Street",
  "longitude": 77.5946,
  "latitude": 12.9716
}
```
#### Validation:

All fields are required.

Longitude and latitude must be valid floating-point numbers.

#### Responses:

`201 Created on success.`

`400 Bad Request if validation fails.`

2. `GET https://educase-api-nmgg.onrender.com/api/v1/listSchools?longitude=77.5946&latitude=12.9716`

Returns a list of schools sorted by distance from the given coordinates.

#### Validation:

Both longitude and latitude query parameters are required and must be numbers.

#### Responses:

`200 OK with the list of schools.`

`400 Bad Request if validation fails.`

### Validation
Validation is handled using express-validator. Invalid requests are caught and responded to with a structured error format:


```
{
  "success": false,
  "message": "Invalid Request",
  "errors": {
    "longitude": "Longitude is required and must be a number",
    "latitude": "Latitude is required and must be a number"
  }
}
```

### Database
#### Connection
The database connection is managed using a connection pool via mysql2. Credentials are loaded from environment variables.

#### Auto-Creation
On server start, the following table is automatically created if it doesn't exist:


```
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  longitude FLOAT NOT NULL,
  latitude FLOAT NOT NULL
)
```
