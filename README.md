# CS 465 Travlr Getaways

## Overview

This project is the Travlr Getaways full stack web application for CS 465. The application is being built using the MEAN stack approach with Node.js, Express, Handlebars templates, and eventually MongoDB and Angular.

## Module 2: MVC Routing

Module 2 refactors the Express application into an MVC-style structure. Routes and views were moved into the app_server folder, controllers were added, and the Travel page was converted from static HTML into a Handlebars view.

## Module 3: Dynamic Templates With JSON

Module 3 moves the Travel page data out of the Handlebars view and into `data/trips.json`. The Travel controller reads and parses the JSON file, passes the trip collection to the view, and `travel.hbs` uses a Handlebars `{{#each}}` loop to render each trip dynamically. This reduces repeated HTML and prepares the application for the later transition to MongoDB.

## Project Structure

travlr/
  app.js
  daa/
    trips.json
  app_server/
    controllers/
      main.js
      travel.js
    routes/
      index.js
      travel.js
      users.js
    views/
      error.hbs
      index.hbs
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

## Available Routes

| Route | Purpose |
|---|---|
| / | Displays the Travlr Getaways public homepage. |
| /travel | Displays the Travel page through the Express route, controller, and Handlebars view. |
| /users | Default Express users route retained from the generated Express project. |

## How to Run Locally

1. Open Windows PowerShell.
2. Navigate to the project folder:
   cd C:\Users\Michael\travlr

3. Install dependencies if needed:
   npm install

4. Start the application:
   npm start

5. Open the site in a browser:
   http://localhost:3000
   http://localhost:3000/travel

## Testing Notes

The application was tested locally using npm start. The homepage rendered at http://localhost:3000, and the Travel page rendered at http://localhost:3000/travel through the MVC routing structure.

