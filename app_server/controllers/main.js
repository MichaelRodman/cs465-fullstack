const fs = require('fs');

const roomsData = JSON.parse(
  fs.readFileSync('./data/rooms.json', 'utf8')
);

const mealsData = JSON.parse(
  fs.readFileSync('./data/meals.json', 'utf8')
);

/* GET Home page */
const index = (req, res) => {
  res.render('index', {
    title: 'Travlr Getaways',
    activeHome: true
  });
};

/* GET Rooms page */
const rooms = (req, res) => {
  res.render('rooms', {
    title: 'Rooms - Travlr Getaways',
    rooms: roomsData,
    activeRooms: true
  });
};

/* GET Meals page */
const meals = (req, res) => {
  res.render('meals', {
    title: 'Meals - Travlr Getaways',
    meals: mealsData,
    activeMeals: true
  });
};

/* GET News page */
const news = (req, res) => {
  res.render('news', {
    title: 'News - Travlr Getaways',
    activeNews: true
  });
};

/* GET About page */
const about = (req, res) => {
  res.render('about', {
    title: 'About - Travlr Getaways',
    activeAbout: true
  });
};

/* GET Contact page */
const contact = (req, res) => {
  res.render('contact', {
    title: 'Contact - Travlr Getaways',
    activeContact: true
  });
};

module.exports = {
  index,
  rooms,
  meals,
  news,
  about,
  contact
};