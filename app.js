// app.js

var exphbs = require('express-handlebars');
const express = require('express')
const app = express()
// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
//connects to mongo database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));

// INDEX
app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

app.get('/', (req, res) => {
  res.render('reviews-index', { reviews: reviews });
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})


// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

// NEW
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})
