# CS 465 Travlr Getaways

## Overview

Travlr Getaways is a full-stack web application developed with Node.js, Express, Handlebars, MongoDB, Mongoose, and the Model-View-Controller architectural pattern.

The application began as a static customer-facing website and has gradually been refactored into an MVC application with reusable templates, JSON-driven content, a MongoDB database layer, and RESTful API services.

The public-facing Express website now retrieves trip data through the REST API rather than reading the trip data file directly. Later modules will add an Angular single-page application and application security.

## Module 2: MVC Routing

Module 2 refactored the Express application into an MVC-style structure. Routes, controllers, and Handlebars views were organized inside the `app_server` folder. The Travel page was converted from static HTML into a server-rendered Handlebars view.

Shared header and footer partials were also created to reduce repeated HTML and provide consistent navigation across the application.

## Module 3: Dynamic Templates With JSON

Module 3 moved the Travel page data out of the Handlebars view and into:

```text
data/trips.json
```

The Travel controller originally read and parsed the JSON file, passed the trip collection to the view, and used a Handlebars `{{#each}}` loop in `travel.hbs` to render each trip dynamically.

The public-facing Home, Rooms, Meals, News, About, and Contact pages were also converted from static HTML pages into MVC routes, controller functions, and Handlebars views.

Shared header and footer partials use Express route paths and dynamically highlight the active page.

## Module 4: MongoDB, Mongoose, Models, and Schemas

Module 4 added the database layer for the Travlr Getaways application.

Mongoose was installed and used to connect the Express application to a local MongoDB database named `travlr`.

The trip model is now located at:

```text
app_api/models/travlr.js
```

The Mongoose schema includes the following required fields:

- `code`
- `name`
- `length`
- `start`
- `resort`
- `perPerson`
- `image`
- `description`

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

The seed script is located at:

```text
app_api/models/seed.js
```

The script reads the trip records from `data/trips.json`, removes existing trip records, inserts the current seed data, and closes the database connection.

MongoDB Compass was used to confirm that the `travlr` database contains a `trips` collection with all three complete trip documents.

## Module 5: RESTful API

Module 5 separated the database and API responsibilities from the public-facing Express website.

The RESTful API files are organized into the following structure:

```text
app_api/
  controllers/
    trips.js
  models/
    db.js
    seed.js
    travlr.js
  routes/
    index.js
```

The API router is mounted in `app.js` at:

```text
/api
```

The application provides two GET endpoints:

```text
GET /api/trips
GET /api/trips/:tripCode
```

The collection endpoint retrieves every trip stored in MongoDB.

The parameterized endpoint uses the supplied trip code to retrieve a specific trip. When no matching trip exists, the API returns an HTTP `404 Not Found` response and a JSON error message.

The API controllers use asynchronous Mongoose queries with `async`, `await`, and `try/catch` error handling. Database failures return an HTTP `500 Internal Server Error` response.

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

The trip collection is then passed to `travel.hbs`, where a Handlebars `{{#each}}` loop renders all three trips.

Each trip image links to its individual API endpoint using the trip code:

```handlebars
<a href="/api/trips/{{this.code}}">
```

Selecting a trip image displays the JSON data for that individual trip.

## Instructor Feedback Enhancement

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

## Project Structure

```text
travlr/
  app.js
  package.json
  package-lock.json
  README.md
  data/
    trips.json
    rooms.json
    meals.json
  app_api/
    controllers/
      trips.js
    models/
      db.js
      seed.js
      travlr.js
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
  public/
    css/
    images/
    javascripts/
    stylesheets/
```

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

## RESTful API Endpoints

| HTTP Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/trips` | Retrieves the complete collection of trips from MongoDB. |
| GET | `/api/trips/:tripCode` | Retrieves the trip matching the supplied trip code. |

A successful request returns an HTTP `200 OK` response and JSON data.

A request for an unknown trip code returns an HTTP `404 Not Found` response with a JSON error message.

A database or server failure returns an HTTP `500 Internal Server Error` response.

## Requirements

The local development environment requires:

- Node.js
- npm
- MongoDB Community Server
- MongoDB Compass
- Postman
- Visual Studio Code or another code editor

This project uses Mongoose 8 because the current local Node.js version is compatible with that major release.

## How to Install Dependencies

Open Windows PowerShell and navigate to the project folder:

```powershell
cd C:\Users\Michael\travlr
```

Install the project dependencies:

```powershell
npm install
```

## How to Seed the MongoDB Database

Confirm that the MongoDB Windows service is running:

```powershell
Get-Service MongoDB
```

Run the seed script:

```powershell
node .\app_api\models\seed.js
```

A successful seed displays messages showing that Mongoose connected to and disconnected from:

```text
mongodb://127.0.0.1/travlr
```

The seed script removes existing trip records before inserting the three current records from `data/trips.json`.

## How to Run the Application

Start the application:

```powershell
npm start
```

Open the application in a browser:

```text
http://localhost:3000
```

Open the Travel page:

```text
http://localhost:3000/travel
```

When the application starts successfully, the terminal displays:

```text
Mongoose connected to mongodb://127.0.0.1/travlr
```

## MongoDB Compass Verification

Connect MongoDB Compass to:

```text
mongodb://127.0.0.1:27017
```

Verify the following database structure:

```text
Database: travlr
Collection: trips
Documents: 3
```

The collection should contain:

- Gale Reef
- Dawson's Reef
- Claire's Reef

Each document should contain all eight trip schema fields and a MongoDB-generated `_id`.

## Postman API Testing

The RESTful API was tested locally with Postman.

### Complete Trip Collection

```text
GET http://localhost:3000/api/trips
```

Expected result:

- HTTP `200 OK`
- JSON array containing Gale Reef, Dawson's Reef, and Claire's Reef

### Individual Trip

```text
GET http://localhost:3000/api/trips/GALR210214
```

Expected result:

- HTTP `200 OK`
- JSON array containing only the Gale Reef trip

### Unknown Trip Code

```text
GET http://localhost:3000/api/trips/INVALID123
```

Expected result:

- HTTP `404 Not Found`
- JSON response:

```json
{
  "message": "Trip with code INVALID123 was not found"
}
```

## Testing Notes

The application was tested locally using `npm start`.

The following pages rendered successfully through the Express MVC routing structure:

- Home
- Travel
- Rooms
- Meals
- News
- About
- Contact

Testing confirmed that:

- The application connects to the local `travlr` MongoDB database.
- The seed script inserts three trip records.
- MongoDB Compass displays all required fields in the `trips` collection.
- `GET /api/trips` returns the complete trip collection.
- `GET /api/trips/GALR210214` returns the requested individual trip.
- An invalid trip code returns HTTP `404 Not Found`.
- The Travel controller receives and processes JSON from the API.
- The Travel page renders all three MongoDB trip records.
- Selecting a trip image opens that trip's individual API response.
- Existing MVC pages continue to work after the API refactor.
- The Rooms and Meals pages continue to render their JSON-driven content.
- Shared navigation and active-page highlighting continue to work.

## Git Branches

The project uses a separate Git branch for each course module:

```text
module1
module2
module3
module4
module5
```

The Module 5 RESTful API work is completed on the `module5` branch so the completed work from earlier modules remains preserved.