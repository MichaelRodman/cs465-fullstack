# CS 465 Travlr Getaways

## Overview

Travlr Getaways is a full-stack web application developed with Node.js, Express, Handlebars, and the Model-View-Controller architectural pattern. Later modules will expand the application by incorporating MongoDB, RESTful API services, and an Angular single-page application.

## Module 2: MVC Routing

Module 2 refactored the Express application into an MVC-style structure. Routes, controllers, and Handlebars views were organized inside the `app_server` folder. The Travel page was converted from static HTML into a server-rendered Handlebars view.

## Module 3: Dynamic Templates With JSON

Module 3 moves the Travel page data out of the Handlebars view and into `data/trips.json`. The Travel controller reads and parses the JSON file, passes the trip collection to the view, and `travel.hbs` uses a Handlebars `{{#each}}` loop to render each trip dynamically. This reduces repeated HTML and prepares the application for the later transition to MongoDB.

The public-facing Home, Rooms, Meals, News, About, and Contact pages were also converted from static HTML pages into MVC routes, controller functions, and Handlebars views. Shared header and footer partials now use Express route paths and dynamically highlight the active page.

## Project Structure

```text
travlr/
  app.js
  data/
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
| `/rooms` | Displays the available guest rooms. |
| `/meals` | Displays the available meal selections. |
| `/news` | Displays travel news and vacation tips. |
| `/about` | Displays information about the website and template. |
| `/contact` | Displays the contact form and contact information. |
| `/users` | Retains the default Express users route. |

## How to Run Locally

1. Open Windows PowerShell.

2. Navigate to the project folder:

   ```powershell
   cd C:\Users\Michael\travlr
   ```

3. Install dependencies:

   ```powershell
   npm install
   ```

4. Start the application:

   ```powershell
   npm start
   ```

5. Open the application in a browser:

   ```text
   http://localhost:3000
   ```

## Testing Notes

The application was tested locally using `npm start`. The Home, Travel, Rooms, Meals, News, About, and Contact pages rendered successfully through the Express MVC routing structure.

The Travel page successfully rendered all three trips from `data/trips.json` through the Travel controller and the Handlebars `{{#each}}` template. Shared header and footer navigation links were tested, including active-page highlighting and the homepage promotional links.