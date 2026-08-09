# CS 465 Travlr Getaways

## Overview

Travlr Getaways is a full-stack web application developed with Node.js, Express, Handlebars, MongoDB, Mongoose, Angular, Bootstrap, and the Model-View-Controller architectural pattern.

The application began as a static customer-facing website and has gradually been refactored into a full-stack application with reusable Handlebars templates, JSON-driven content, a MongoDB database layer, RESTful API services, and an Angular single-page application for administrative functions.

The customer-facing Express website retrieves trip data through the REST API. The Angular administrative SPA also communicates with the same REST API and provides functionality for viewing, adding, editing, and deleting trip records.

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

The trip model is located at:

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

The script reads the original trip records from `data/trips.json`, removes existing trip records, inserts the seed data, and closes the database connection.

MongoDB Compass was used throughout development to confirm that trip records were correctly stored, added, updated, and deleted.

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

The service supports the following operations:

- Retrieve all trips
- Retrieve one trip by trip code
- Add a new trip
- Update an existing trip
- Delete a trip

The Angular application communicates with:

```text
http://localhost:3000/api/trips
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

for creating a trip, and

```text
/edit-trip
```

for editing an existing trip.

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
- Description

The submit button remains disabled until all required fields are valid.

### Bootstrap Interface

Bootstrap is used to style:

- Trip cards
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

The API supports the required HTTP methods for Angular communication.

### Module 6 CRUD Operations

The REST API now supports all four CRUD behaviors required by the administrative SPA:

```text
GET
POST
PUT
DELETE
```

The following API endpoints are available:

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

MongoDB Compass was used to verify that the deleted records were removed from the database.

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
  app_admin/
    src/
      app/
        add-trip/
        edit-trip/
        trip-card/
        trip-listing/
        models/
          trip.ts
        services/
          trip-data.service.ts
      assets/
        css/
        images/
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

## Angular SPA Routes

| Route | Purpose |
|---|---|
| `/` | Displays the administrative trip card listing. |
| `/add-trip` | Displays the form for creating a new trip. |
| `/edit-trip` | Displays the form for editing a selected trip. |

The Angular SPA runs separately from Express during development at:

```text
http://localhost:4200
```

## RESTful API Endpoints

| HTTP Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/trips` | Retrieves the complete collection of trips from MongoDB. |
| POST | `/api/trips` | Creates a new trip in MongoDB. |
| GET | `/api/trips/:tripCode` | Retrieves the trip matching the supplied trip code. |
| PUT | `/api/trips/:tripCode` | Updates the trip matching the supplied trip code. |
| DELETE | `/api/trips/:tripCode` | Deletes the trip matching the supplied trip code. |

Successful GET requests return HTTP `200 OK`.

Successful POST requests return HTTP `201 Created`.

Successful PUT requests return HTTP `201 Created`.

Successful DELETE requests return HTTP `204 No Content`.

An unknown trip code returns an appropriate error response.

Database or server failures return HTTP `500 Internal Server Error`.

## Requirements

The local development environment requires:

- Node.js
- npm
- MongoDB Community Server
- MongoDB Compass
- Postman
- Angular CLI 17
- Visual Studio Code or another code editor

## How to Install Express Dependencies

Open Windows PowerShell and navigate to the project folder:

```powershell
cd C:\Users\Michael\travlr
```

Install the Express project dependencies:

```powershell
npm install
```

## How to Install Angular Dependencies

Navigate to the Angular project:

```powershell
cd C:\Users\Michael\travlr\app_admin
```

Install the Angular dependencies:

```powershell
npm install
```

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

Because the seed script restores the original dataset, running it after Module 6 testing will remove additional records such as Mega Reef. Additional trips can be recreated through the Angular administrative SPA.

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

## MongoDB Compass Verification

Connect MongoDB Compass to:

```text
mongodb://127.0.0.1:27017
```

Verify:

```text
Database: travlr
Collection: trips
```

The original seeded records are:

- Gale Reef
- Dawson's Reef
- Claire's Reef

Module 6 testing added:

- Mega Reef

The temporary records used to test DELETE functionality were removed after successful testing.

## Postman API Testing

The RESTful API was tested locally with Postman.

### Complete Trip Collection

```text
GET http://localhost:3000/api/trips
```

Expected result:

- HTTP `200 OK`
- JSON array containing all current trip records

### Individual Trip

```text
GET http://localhost:3000/api/trips/GALR210214
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

### Create Trip

```text
POST http://localhost:3000/api/trips
```

Expected result:

- HTTP `201 Created`
- JSON representation of the newly created trip

### Update Trip

```text
PUT http://localhost:3000/api/trips/MEGR220119
```

Expected result:

- HTTP `201 Created`
- JSON representation of the updated trip

### Delete Trip

```text
DELETE http://localhost:3000/api/trips/:tripCode
```

Expected result:

- HTTP `204 No Content`

## Testing Notes

The application was tested locally using both the Express and Angular development servers.

Testing confirmed that:

- Express connects successfully to the local `travlr` MongoDB database.
- The seed script restores the three original trip records.
- MongoDB Compass displays the required trip fields.
- `GET /api/trips` returns the complete trip collection.
- `GET /api/trips/:tripCode` returns an individual trip.
- An invalid trip code returns HTTP `404 Not Found`.
- `POST /api/trips` creates a new MongoDB record.
- `PUT /api/trips/:tripCode` updates an existing MongoDB record.
- `DELETE /api/trips/:tripCode` removes the requested MongoDB record.
- The Angular Trip Listing component retrieves trip data through the REST API.
- The Angular Trip Card component displays reusable trip cards.
- The Add Trip reactive form creates new trips.
- The Edit Trip reactive form retrieves and updates existing trips.
- The Delete button removes trips after user confirmation.
- Deleted cards are removed from the Angular interface immediately.
- The customer-facing Travel page reflects records created or updated through the Angular SPA.
- Angular browser testing completed without console errors.
- The Angular application completed a successful production build with `ng build`.
- Existing MVC pages continue to work after the Angular and CRUD additions.
- Rooms and Meals continue to render their JSON-driven content.
- Shared navigation and active-page highlighting continue to work.

## Git Branches

The project uses a separate Git branch for each course module:

```text
module1
module2
module3
module4
module5
module6
```

Module 6 contains the Angular administrative SPA, expanded RESTful CRUD API, CORS configuration, and completed CRUD testing.

The `module6` branch is preserved separately so the completed work from earlier modules remains available.