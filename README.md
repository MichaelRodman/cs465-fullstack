# CS 465 Travlr Getaways

## Overview

Travlr Getaways is a full-stack web application developed with Node.js, Express, Handlebars, MongoDB, Mongoose, and the Model-View-Controller architectural pattern.

The application began as a static customer-facing website and has gradually been refactored into an MVC application with reusable templates, JSON-driven content, and a MongoDB database layer. Later modules will add RESTful API services and an Angular single-page application.

## Module 2: MVC Routing

Module 2 refactored the Express application into an MVC-style structure. Routes, controllers, and Handlebars views were organized inside the `app_server` folder. The Travel page was converted from static HTML into a server-rendered Handlebars view.

Shared header and footer partials were also created to reduce repeated HTML and provide consistent navigation across the application.

## Module 3: Dynamic Templates With JSON

Module 3 moved the Travel page data out of the Handlebars view and into `data/trips.json`.

The Travel controller reads and parses the JSON file, passes the trip collection to the view, and `travel.hbs` uses a Handlebars `{{#each}}` loop to render each trip dynamically. This reduces repeated HTML and prepares the application for the transition to MongoDB.

The public-facing Home, Rooms, Meals, News, About, and Contact pages were also converted from static HTML pages into MVC routes, controller functions, and Handlebars views.

Shared header and footer partials use Express route paths and dynamically highlight the active page.

## Module 4: MongoDB, Mongoose, Models, and Schemas

Module 4 added the database layer for the Travlr Getaways application.

Mongoose was installed and used to connect the Express application to a local MongoDB database named `travlr`.

The trip model is defined in:

```text
app_server/models/travlr.js
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
app_server/models/db.js
```

This module:

- Connects to the local `travlr` MongoDB database
- Supports an optional `DB_HOST` environment variable
- Monitors connection, error, and disconnection events
- Includes Windows signal handling
- Closes the database connection during application shutdown

The seed script is located at:

```text
app_server/models/seed.js
```

The script reads the trip records from `data/trips.json`, removes existing trip records, inserts the current seed data, and closes the database connection.

MongoDB Compass was used to confirm that the `travlr` database contains a `trips` collection with all three complete trip documents.

## Instructor Feedback Enhancement

The Rooms and Meals pages were updated in response to instructor feedback recommending additional JSON-driven resources.

The repeated content from the Handlebars views was moved into:

```text
data/rooms.json
data/meals.json
```

The main controller reads both JSON files and passes the data collections to the appropriate views.

The following templates now use Handlebars `{{#each}}` loops:

```text
app_server/views/rooms.hbs
app_server/views/meals.hbs
```

This continues the MVC and dynamic-template approach used for the Travel page while preserving the original page layouts, images, descriptions, and navigation.

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
  app_server/
    controllers/
      main.js
      travel.js
    models/
      db.js
      seed.js
      travlr.js
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

## Available Routes

| Route | Purpose |
|---|---|
| `/` | Displays the Travlr Getaways homepage. |
| `/travel` | Displays trip data dynamically from `data/trips.json`. |
| `/rooms` | Displays room data dynamically from `data/rooms.json`. |
| `/meals` | Displays meal data dynamically from `data/meals.json`. |
| `/news` | Displays travel news and vacation tips. |
| `/about` | Displays information about the website and template. |
| `/contact` | Displays the contact form and contact information. |
| `/users` | Retains the default Express users route. |

## Requirements

The local development environment requires:

- Node.js
- npm
- MongoDB Community Server
- MongoDB Compass
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
node .\app_server\models\seed.js
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

The Travel page rendered all three trips from `data/trips.json`.

The Rooms page rendered all three room records from `data/rooms.json`.

The Meals page rendered all three meal records from `data/meals.json`.

The shared header and footer navigation links were tested, including active-page highlighting and the homepage promotional links.

MongoDB testing confirmed that:

- The application connects to the local `travlr` database.
- The seed script inserts three trip records.
- Mongoose can retrieve the stored trip records as JSON.
- MongoDB Compass displays all required fields in the `trips` collection.
- Existing MVC pages continue to work after the database integration.

## Git Branches

The project uses a separate Git branch for each course module:

```text
module1
module2
module3
module4
```

The Module 4 work is completed on the `module4` branch so the completed work from earlier modules remains preserved.
