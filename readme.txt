API Endpoints (on localhost)
User Authentication (Auth)

1. User Registration
URL: http://localhost:5000/api/auth/register
Method: POST
Description: Register a new user.
Body Parameters:

{
  "username": "string",
  "password": "string",
  "isAdmin": "boolean"
}


2. User Login
URL: http://localhost:5000/api/auth/login
Method: POST
Description: Login an existing user.
Body Parameters:

{
  "username": "string",
  "password": "string"
}

3. User Logout
URL: http://localhost:5000/api/auth/logout
Method: POST
Description: Logout the user.
Headers:

Authorization: Bearer <token>
