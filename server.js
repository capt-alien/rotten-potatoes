// INITIAL DECLARATIONS
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser'); // initialize body-parser
const mongoose = require('mongoose'); // once was const or var...let is used
const exphbs = require('express-handlebars');
const app = express(); // include express.js stuff... adding dots after app (eg app.???)!

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/rotten-potatoes';
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rotten-potatoes'
// MIDDLEWARE
mongoose.connect(mongoUri, { useNewUrlParser: true });
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(methodOverride('_method'))
// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));

const reviews = require('./controllers/reviews')(app); // initialize reveiws
const movies = require('./controllers/movies')(app); // initialize movies
const comments = require('./controllers/comments')(app); // initialize movies

//listen
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

module.exports = app;
