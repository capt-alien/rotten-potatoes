// app.js

var exphbs = require('express-handlebars');
const express = require('express')
const methodOverride = require('method-override')

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
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

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

// EDIT
app.get('/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  })
})


// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review)
    res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message)
  })
})

// NEW
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})

// UPDATE
app.put('/reviews/:id/edit', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

// SHOW
app.get('/reviews/:id', (req, res) => {
    // params => URL PARAMETERS
    // console.log(req.params.taco)
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})
//listen
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
