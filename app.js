// app.js

var exphbs = require('express-handlebars');
const express = require('express')
const app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



// // OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//   { title: "Great Review" },
//   { title: "Next Review" }
// ]

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


//connects to mongo database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

const Review = mongoose.model('Review', {
  title: String
});
