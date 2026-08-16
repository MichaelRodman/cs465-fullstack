# CS 465 Travlr Getaways

## Overview

Travlr Getaways is a full-stack web application developed with Node.js, Express, Handlebars, MongoDB, Mongoose, Angular, Bootstrap, Passport, JSON Web Tokens, and the Model-View-Controller architectural pattern.

The application began as a static customer-facing website and was gradually refactored into a full-stack application with reusable Handlebars templates, JSON-driven content, a MongoDB database layer, RESTful API services, and an Angular single-page application for administrative functions.

The customer-facing Express website retrieves trip data through the REST API. The Angular administrative SPA also communicates with the same REST API and provides authenticated functionality for viewing, adding, editing, and deleting trip records.

Module 7 added user authentication and security to the administrative functionality. Users can register and log in through API endpoints, passwords are stored as salted hashes rather than plaintext, and successful authentication generates a JSON Web Token (JWT). Trip creation, update, and deletion endpoints require a valid JWT, while GET requests remain publicly available.

---

## Module 2: MVC Routing

Module 2 refactored the Express application into an MVC-style structure. Routes, controllers, and Handlebars views were organized inside the `app_server` folder. The Travel page was converted from static HTML into a server-rendered Handlebars view.

Shared header and footer partials were also created to reduce repeated HTML and provide consistent navigation across the application.

---

## Module 3: Dynamic Templates With JSON

Module 3 moved the Travel page data out of the Handlebars view and into:

```text
data/trips.json
```

The Travel controller originally read and parsed the JSON file, passed the trip collection to the view, and used a Handlebars `{{#each}}` loop in `travel.hbs` to render each trip dynamically.

The public-facing Home, Rooms, Meals, News, About, and Contact pages were also converted from static HTML pages into MVC routes, controller functions, and Handlebars views.

Shared header and footer partials use Express route paths and dynamically highlight the active page.

---

## Module 4: MongoDB, Mongoose, Models, and Schemas

Module 4 added the database layer for the Travlr Getaways application.

Mongoose was installed and used to connect the Express application to a local MongoDB database named `travlr`.

The trip model is located at:

```text
app_api/models/travlr.js
```

The current Mongoose schema requires the following fields:

- `code`
- `name`
- `length`
- `start`
- `resort`
- `perPerson`
- `image`

The following field is optional:

- `description`

The description field was made optional in Module 7 in response to instructor feedback recommending more appropriate validation instead of requiring every field.

The `code` and `name` fields are indexed to support efficient database searches.

The database connection is managed in:

```text
app_api/models/db.js
```

This module:

- Connects to the local `travlr` MongoDB database
- Supports an optional `DB_HOST` environment variable
- Monitors connection, error, and disconnection events
- Includes Windows signal handling
- Closes the database connection during application shutdown
- Loads both the Trip and User Mongoose models

The seed script is located at:

```text
app_api/models/seed.js
```

The script reads the original trip records from `data/trips.json`, removes existing trip records, inserts the seed data, and closes the database connection.

MongoDB Compass was used throughout development to confirm that trip and user records were correctly stored.

---

## Module 5: RESTful API

Module 5 separated the database and API responsibilities from the public-facing Express website.

The RESTful API files are organized inside:

```text
app_api/
```

The API router is mounted in `app.js` at:

```text
/api
```

Module 5 initially implemented the following GET endpoints:

```text
GET /api/trips
GET /api/trips/:tripCode
```

The collection endpoint retrieves every trip stored in MongoDB.

The parameterized endpoint uses the supplied trip code to retrieve a specific trip. When no matching trip exists, the API returns an HTTP `404 Not Found` response and a JSON error message.

The API controllers use asynchronous Mongoose queries with `async`, `await`, and `try/catch` error handling.

### Express Website API Integration

The public-facing Travel controller is located at:

```text
app_server/controllers/travel.js
```

The controller no longer reads `data/trips.json` directly. It uses Node.js `fetch()` to request trip data from:

```text
http://localhost:3000/api/trips
```

The controller verifies that:

- The API response is successful
- The returned data is an array
- The trip collection is not empty
- API communication errors are handled

The trip collection is then passed to `travel.hbs`, where a Handlebars `{{#each}}` loop renders the trip records.

Each trip image links to its individual API endpoint using the trip code:

```handlebars
<a href="/api/trips/{{this.code}}">
```

Selecting a trip image displays the JSON data for that individual trip.

---

## Module 6: Angular Administrative SPA

Module 6 added an Angular single-page application for administering Travlr Getaways trip data.

The Angular project is located in:

```text
app_admin/
```

Angular components were created for:

```text
trip-listing
trip-card
add-trip
edit-trip
```

The application uses reusable components so each trip is rendered through a `TripCardComponent`, while `TripListingComponent` manages the overall collection of trips.

A TypeScript `Trip` model is located at:

```text
app_admin/src/app/models/trip.ts
```

The Angular data service is located at:

```text
app_admin/src/app/services/trip-data.service.ts
```

The service uses Angular `HttpClient` to communicate with the Express REST API.

### Angular Trip Data Service

The service supports the following trip operations:

- Retrieve all trips
- Retrieve one trip by trip code
- Add a new trip
- Update an existing trip
- Delete a trip

Module 7 also added authentication requests for:

- User registration
- User login

The Angular application communicates with:

```text
http://localhost:3000/api
```

### Angular Routing

Angular routing provides navigation between:

```text
/
```

for the trip listing,

```text
/add-trip
```

for creating a trip,

```text
/edit-trip
```

for editing an existing trip, and

```text
/login
```

for administrator authentication.

The Edit button stores the selected trip code and routes the user to the Edit Trip component. The component retrieves the selected trip from the REST API and populates the reactive form with its current values.

### Reactive Forms

Both the Add Trip and Edit Trip components use Angular reactive forms.

Required fields include:

- Trip code
- Trip name
- Length
- Start date
- Resort
- Price per person
- Image

The Description field is optional.

The submit button remains disabled until the required fields are valid.

### Bootstrap Interface

Bootstrap is used to style:

- Navigation bar
- Trip cards
- Login form
- Add Trip button
- Edit buttons
- Delete buttons
- Add Trip form
- Edit Trip form

Trip images are stored in:

```text
app_admin/src/assets/images/
```

### CORS Support

The Express application includes Cross-Origin Resource Sharing configuration so the Angular development server running on:

```text
http://localhost:4200
```

can communicate with the Express API running on:

```text
http://localhost:3000
```

CORS allows the required HTTP methods:

```text
GET
POST
PUT
DELETE
```

The allowed request headers include:

```text
Origin
X-Requested-With
Content-Type
Accept
Authorization
```

The `Authorization` header allows the Angular application to send JWT bearer tokens with protected API requests.

### Module 6 CRUD Operations

The REST API supports all four CRUD behaviors required by the administrative SPA:

```text
GET
POST
PUT
DELETE
```

The trip endpoints are:

```text
GET    /api/trips
POST   /api/trips
GET    /api/trips/:tripCode
PUT    /api/trips/:tripCode
DELETE /api/trips/:tripCode
```

### Module 6 Added Trip

The Angular Add Trip form was used to create an additional trip:

```text
Code: MEGR220119
Name: Mega Reef
```

After the POST request completed, Mega Reef appeared in:

- MongoDB Compass
- The Angular administrative trip listing
- The customer-facing Express Travel page

The Mega Reef record was later edited through the Angular Edit Trip form. The final description was updated to:

```text
The great barrier reef awaits! Update verified in Angular.
```

The updated value was confirmed in MongoDB, the Angular SPA, and the customer-facing Express website.

### Delete Testing

DELETE functionality was tested through both Postman and the Angular SPA.

Temporary records were created specifically for deletion testing so the permanent Mega Reef record and the original trip records would remain intact.

Successful DELETE requests returned:

```text
204 No Content
```

MongoDB Compass and the Angular interface were used to verify that deleted records were removed.

---

## Module 7: Authentication and Security

Module 7 added authentication and security to the Travlr administrative application.

The backend uses:

- Passport
- Passport Local Strategy
- JSON Web Tokens
- Node.js `crypto`
- dotenv
- Mongoose User model

Authentication protects operations that modify trip data while allowing public trip information to remain accessible.

### User Model

The user model is located at:

```text
app_api/models/user.js
```

User records contain:

- `email`
- `name`
- `hash`
- `salt`

Passwords are never stored in plaintext.

The `setPassword()` method generates a random salt and uses PBKDF2 with SHA-512 to create the stored password hash.

The `validPassword()` method hashes the submitted password with the stored salt and compares it with the stored hash.

The `generateJWT()` method creates a JWT containing user information. Tokens expire after one hour.

### Passport Configuration

Passport configuration is located at:

```text
app_api/config/passport.js
```

The Local Strategy uses the user's email as the username field.

Passport retrieves the matching user from MongoDB and validates the submitted password using the User model's `validPassword()` method.

### Authentication Controller

Authentication logic is located at:

```text
app_api/controllers/authentication.js
```

The API supports:

```text
POST /api/register
POST /api/login
```

Successful registration:

- Creates a MongoDB user record
- Generates a salt and password hash
- Does not save the plaintext password
- Returns a JWT

Successful login:

- Finds the user by email
- Validates the submitted password
- Returns a JWT

### JWT API Security

JWT verification is implemented in:

```text
app_api/routes/index.js
```

Trip retrieval remains public:

```text
GET /api/trips
GET /api/trips/:tripCode
```

Database-changing operations require authentication:

```text
POST   /api/trips
PUT    /api/trips/:tripCode
DELETE /api/trips/:tripCode
```

Protected requests must contain an HTTP authorization header in this format:

```text
Authorization: Bearer <JWT>
```

Requests without an authorization header return:

```text
401 Unauthorized
```

Invalid or malformed JWTs also return:

```text
401 Unauthorized
```

A valid JWT allows the request to continue to the appropriate trip controller.

### Angular Authentication

Angular authentication is implemented with:

```text
app_admin/src/app/services/authentication.service.ts
app_admin/src/app/models/user.ts
app_admin/src/app/models/authresponse.ts
app_admin/src/app/storage.ts
```

The JWT is stored in browser local storage using the key:

```text
travlr-token
```

The authentication service supports:

- Login
- Registration
- Saving a JWT
- Retrieving a JWT
- Removing a JWT during logout
- Determining whether the current JWT is still valid
- Retrieving the current user's information from the JWT

### Angular Login

The login component is located at:

```text
app_admin/src/app/login/
```

The login form accepts:

- Email
- Password

After successful authentication, the JWT is stored in browser local storage and the administrator returns to the trip listing.

The navigation bar changes from:

```text
Log In
```

to:

```text
Log Out
```

when an authenticated JWT is present.

### Authentication-Aware Interface

When the user is logged out:

- Trip cards remain visible
- Add Trip is hidden
- Edit buttons are hidden
- Delete buttons are hidden
- The navbar displays Log In

When the user is logged in:

- Add Trip is visible
- Edit buttons are visible
- Delete buttons are visible
- The navbar displays Log Out

API security remains enforced on the backend even if a protected route is accessed manually.

### Angular JWT Interceptor

The JWT interceptor is located at:

```text
app_admin/src/app/auth.interceptor.ts
```

The Angular application uses a functional HTTP interceptor registered through:

```text
provideHttpClient(
  withInterceptors([authInterceptor])
)
```

The interceptor automatically adds the current JWT to protected trip requests.

JWT authorization is attached to:

```text
POST
PUT
DELETE
```

requests made to the trip API.

GET requests remain public and do not require a JWT.

### Module 7 Security Testing

Authentication and authorization-related API behavior was tested using Postman and the Angular SPA.

Testing confirmed:

- Registration returns HTTP `200 OK` with a JWT
- Login returns HTTP `200 OK` with a JWT
- User passwords are stored as a salt and hash rather than plaintext
- POST without a token returns HTTP `401 Unauthorized`
- A fake or invalid token returns HTTP `401 Unauthorized`
- A valid JWT passes authentication
- Authenticated POST requests successfully create trips
- Authenticated PUT requests successfully update trips
- Authenticated DELETE requests successfully delete trips
- Public GET requests continue to return HTTP `200 OK`
- Angular login stores the JWT successfully
- Angular logout removes the JWT
- Add, Edit, and Delete controls are hidden while logged out
- Add, Edit, and Delete controls appear while logged in
- Angular protected requests successfully send the JWT through the HTTP interceptor
- CORS preflight requests succeed with the Authorization header
- A trip can be created with a blank Description field
- Temporary authentication and validation test records were deleted afterward

---

## Instructor Feedback Enhancements

### Rooms and Meals JSON Data

The Rooms and Meals pages were updated in response to instructor feedback recommending additional JSON-driven resources.

The repeated content from the Handlebars views was moved into:

```text
data/rooms.json
data/meals.json
```

The main controller reads both JSON files and passes the data collections to the appropriate views.

The following templates use Handlebars `{{#each}}` loops:

```text
app_server/views/rooms.hbs
app_server/views/meals.hbs
```

This continues the MVC and dynamic-template approach while preserving the original page layouts, images, descriptions, and navigation.

### Trip Validation

Module 7 also addressed instructor feedback about overly restrictive trip validation.

The Description field is now optional in:

```text
app_api/models/travlr.js
app_admin/src/app/add-trip/add-trip.component.ts
app_admin/src/app/edit-trip/edit-trip.component.ts
```

All other required trip fields continue to use validation.

Testing confirmed that a trip can be successfully created without a Description value.

---

## Project Structure

```text
travlr/
  app.js
  package.json
  package-lock.json
  README.md
  .env
  data/
    trips.json
    rooms.json
    meals.json
  app_api/
    config/
      passport.js
    controllers/
      authentication.js
      trips.js
    models/
      db.js
      seed.js
      travlr.js
      user.js
    routes/
      index.js
  app_server/
    controllers/
      main.js
      travel.js
    routes/
      index.js
      travel.js
      users.js
    views/
      about.hbs
      contact.hbs
      error.hbs
      index.hbs
      meals.hbs
      news.hbs
      rooms.hbs
      travel.hbs
      layouts/
        layout.hbs
      partials/
        header.hbs
        footer.hbs
  app_admin/
    src/
      app/
        add-trip/
        edit-trip/
        login/
        navbar/
        trip-card/
        trip-listing/
        models/
          authresponse.ts
          trip.ts
          user.ts
        services/
          authentication.service.ts
          trip-data.service.ts
        app.component.html
        app.component.ts
        app.config.ts
        app.routes.ts
        auth.interceptor.ts
        storage.ts
      assets/
        css/
        images/
  public/
    css/
    images/
    javascripts/
    stylesheets/
```

The `.env` file is excluded from Git source control through `.gitignore`.

---

## Available Website Routes

| Route | Purpose |
|---|---|
| `/` | Displays the Travlr Getaways homepage. |
| `/travel` | Retrieves trip data through the REST API and renders the Travel page. |
| `/rooms` | Displays room data dynamically from `data/rooms.json`. |
| `/meals` | Displays meal data dynamically from `data/meals.json`. |
| `/news` | Displays travel news and vacation tips. |
| `/about` | Displays information about the website and template. |
| `/contact` | Displays the contact form and contact information. |
| `/users` | Retains the default Express users route. |

---

## Angular SPA Routes

| Route | Purpose |
|---|---|
| `/` | Displays the administrative trip card listing. |
| `/login` | Displays the administrator login form. |
| `/add-trip` | Displays the form for creating a new trip. |
| `/edit-trip` | Displays the form for editing a selected trip. |

The Angular SPA runs separately from Express during development at:

```text
http://localhost:4200
```

---

## RESTful API Endpoints

| HTTP Method | Endpoint | Authentication | Purpose |
|---|---|---|---|
| GET | `/api/trips` | Public | Retrieves the complete collection of trips. |
| POST | `/api/trips` | JWT required | Creates a new trip. |
| GET | `/api/trips/:tripCode` | Public | Retrieves the trip matching the supplied trip code. |
| PUT | `/api/trips/:tripCode` | JWT required | Updates the matching trip. |
| DELETE | `/api/trips/:tripCode` | JWT required | Deletes the matching trip. |
| POST | `/api/register` | Public | Registers a user and returns a JWT. |
| POST | `/api/login` | Public | Authenticates a user and returns a JWT. |

Successful GET requests return HTTP `200 OK`.

Successful trip POST requests return HTTP `201 Created`.

Successful trip PUT requests return HTTP `201 Created`.

Successful DELETE requests return HTTP `204 No Content`.

Successful registration and login requests return HTTP `200 OK`.

Missing or invalid authentication for a protected endpoint returns HTTP `401 Unauthorized`.

An unknown trip code returns an appropriate error response.

Database or server failures return HTTP `500 Internal Server Error`.

---

## Requirements

The local development environment requires:

- Node.js
- npm
- MongoDB Community Server
- MongoDB Compass
- Postman
- Angular CLI 17
- Visual Studio Code or another code editor

Major application dependencies include:

- Express
- Mongoose
- Handlebars
- Angular
- Bootstrap
- Passport
- Passport Local
- jsonwebtoken
- dotenv

Node.js provides the built-in `crypto` module used for password hashing.

---

## How to Install Express Dependencies

Open Windows PowerShell and navigate to the project folder:

```powershell
cd C:\Users\Michael\travlr
```

Install the Express project dependencies:

```powershell
npm install
```

---

## How to Install Angular Dependencies

Navigate to the Angular project:

```powershell
cd C:\Users\Michael\travlr\app_admin
```

Install the Angular dependencies:

```powershell
npm install
```

---

## Environment Configuration

Authentication requires a JWT secret stored in a local `.env` file.

Create:

```text
travlr/.env
```

Add:

```text
JWT_SECRET=your-long-private-secret-string
```

The application loads this value through:

```javascript
require('dotenv').config();
```

The `.env` file is intentionally listed in `.gitignore` so the JWT secret is not committed to the repository.

---

## How to Seed the MongoDB Database

Confirm that the MongoDB Windows service is running:

```powershell
Get-Service MongoDB
```

From the project root, run:

```powershell
node .\app_api\models\seed.js
```

The seed script removes existing trip records before inserting the three original records from:

```text
data/trips.json
```

Because the seed script restores the original trip dataset, running it after later testing will remove additional records such as Mega Reef.

The seed script does not create authentication users. User registration is handled separately through the authentication API.

---

## How to Run the Express Application

From the project root:

```powershell
npm start
```

Open the application in a browser:

```text
http://localhost:3000
```

Open the customer-facing Travel page:

```text
http://localhost:3000/travel
```

When the application starts successfully, the terminal displays:

```text
Mongoose connected to mongodb://127.0.0.1/travlr
```

---

## How to Run the Angular Admin SPA

Open a second PowerShell window and navigate to:

```powershell
cd C:\Users\Michael\travlr\app_admin
```

Start the Angular development server:

```powershell
ng serve
```

Open the administrative SPA at:

```text
http://localhost:4200
```

The Express application and MongoDB must also be running for the Angular SPA to retrieve and modify trip records.

---

## Creating an Administrator Account

If no user exists in the local MongoDB `users` collection, an administrator account can be created through Postman.

Use:

```text
POST http://localhost:3000/api/register
```

Set the request body to raw JSON:

```json
{
  "name": "Travlr Admin",
  "email": "admin@travlr.com",
  "password": "password123"
}
```

A successful response returns:

```text
200 OK
```

and a JSON Web Token.

MongoDB stores the user's email, name, salt, and password hash. The plaintext password is not stored.

After registration, the user can log in through:

```text
http://localhost:4200/login
```

---

## MongoDB Compass Verification

Connect MongoDB Compass to:

```text
mongodb://127.0.0.1:27017
```

Verify:

```text
Database: travlr
```

The trip collection is:

```text
trips
```

The original seeded records are:

- Gale Reef
- Dawson's Reef
- Claire's Reef

Module 6 testing added:

- Mega Reef

The user collection is:

```text
users
```

Registered users contain:

- Email
- Name
- Salt
- Password hash

Plaintext passwords are not stored.

Temporary records used for POST, DELETE, authentication, and validation testing were removed after successful testing.

---

## Postman API Testing

The RESTful API and authentication endpoints were tested locally with Postman.

### Complete Trip Collection

```text
GET http://localhost:3000/api/trips
```

Authentication:

```text
No Auth
```

Expected result:

- HTTP `200 OK`
- JSON array containing all current trip records

### Individual Trip

```text
GET http://localhost:3000/api/trips/GALR210214
```

Authentication:

```text
No Auth
```

Expected result:

- HTTP `200 OK`
- JSON array containing Gale Reef

### Unknown Trip Code

```text
GET http://localhost:3000/api/trips/INVALID123
```

Expected result:

- HTTP `404 Not Found`

### Register User

```text
POST http://localhost:3000/api/register
```

Example JSON body:

```json
{
  "name": "Travlr Admin",
  "email": "admin@travlr.com",
  "password": "password123"
}
```

Expected result:

- HTTP `200 OK`
- JWT returned in the response

### Login

```text
POST http://localhost:3000/api/login
```

Example JSON body:

```json
{
  "email": "admin@travlr.com",
  "password": "password123"
}
```

Expected result:

- HTTP `200 OK`
- JWT returned in the response

### Protected Request Without Authentication

```text
POST http://localhost:3000/api/trips
```

Authorization:

```text
No Auth
```

Expected result:

- HTTP `401 Unauthorized`

### Invalid JWT

Use a protected endpoint with:

```text
Authorization: Bearer this-is-not-a-valid-token
```

Expected result:

- HTTP `401 Unauthorized`
- Token validation error

### Create Trip

```text
POST http://localhost:3000/api/trips
```

Authorization:

```text
Bearer Token
```

Use the JWT returned by `/api/login`.

Expected result:

- HTTP `201 Created`
- JSON representation of the newly created trip

### Update Trip

```text
PUT http://localhost:3000/api/trips/MEGR220119
```

Authorization:

```text
Bearer Token
```

Expected result:

- HTTP `201 Created`
- JSON representation of the updated trip

### Delete Trip

```text
DELETE http://localhost:3000/api/trips/:tripCode
```

Authorization:

```text
Bearer Token
```

Expected result:

- HTTP `204 No Content`

---

## Testing Notes

The application was tested locally using the Express server, Angular development server, Postman, MongoDB Compass, and browser developer tools.

Testing confirmed that:

- Express connects successfully to the local `travlr` MongoDB database.
- The seed script restores the three original trip records.
- MongoDB Compass displays the expected trip data.
- `GET /api/trips` returns the complete trip collection without authentication.
- `GET /api/trips/:tripCode` returns an individual trip without authentication.
- An invalid trip code returns HTTP `404 Not Found`.
- User registration creates a MongoDB user record.
- Passwords are stored using a salt and hash rather than plaintext.
- Registration returns a JWT.
- Login returns a JWT.
- Missing authentication on protected trip requests returns HTTP `401 Unauthorized`.
- Invalid JWT values return HTTP `401 Unauthorized`.
- A valid JWT allows protected requests to reach the trip controller.
- Authenticated `POST /api/trips` creates a new MongoDB record.
- Authenticated `PUT /api/trips/:tripCode` updates an existing MongoDB record.
- Authenticated `DELETE /api/trips/:tripCode` removes the requested MongoDB record.
- The Angular Login component successfully authenticates an administrator.
- The JWT is saved in browser local storage after login.
- Logout removes the JWT.
- The navigation bar switches between Log In and Log Out.
- Add Trip, Edit, and Delete controls are hidden while logged out.
- Add Trip, Edit, and Delete controls are visible while logged in.
- The Angular JWT interceptor attaches the bearer token to protected POST, PUT, and DELETE requests.
- Public GET requests continue to work without a JWT.
- CORS permits the Authorization header required for JWT requests.
- The Angular Trip Listing component retrieves trip data through the REST API.
- The Angular Trip Card component displays reusable trip cards.
- The Add Trip reactive form creates authenticated trip records.
- The Edit Trip reactive form retrieves and updates authenticated trip records.
- The Delete button removes trips after user confirmation.
- Deleted cards are removed from the Angular interface immediately.
- Description is optional when adding or editing a trip.
- A trip with a blank Description field was successfully created during testing.
- Temporary security and validation test trips were deleted afterward.
- Mega Reef remains in the database with its intended final description.
- The customer-facing Travel page reflects records created or updated through the Angular SPA.
- The Angular application completed successful production builds with `ng build`.
- Existing MVC pages continue to work after the authentication additions.
- The customer-facing Home page continues to render correctly.
- The customer-facing Travel page continues to render all four intended trip records.
- Rooms and Meals continue to render their JSON-driven content.
- Shared navigation and active-page highlighting continue to work.

---

## Git Branches

The project uses a separate Git branch for each course module:

```text
module1
module2
module3
module4
module5
module6
module7
```

Module 6 contains the Angular administrative SPA, expanded RESTful CRUD API, CORS configuration, and completed CRUD testing.

Module 7 adds:

- User registration
- User login
- Passport Local authentication
- Salted and hashed passwords
- JSON Web Tokens
- Protected POST, PUT, and DELETE API endpoints
- Angular login and logout
- Authentication-aware navigation
- Authentication-aware Add, Edit, and Delete controls
- Angular JWT HTTP interceptor
- Authorization support in CORS
- Optional trip Description validation
- Authentication and security testing

Each module branch is preserved separately so completed work from earlier modules remains available.