const express = require('express');
const app = express();
const Movie = require('./Movie');
const bodyParser = require('body-parser');

const apikey = '385e80';

// x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//localhost:5000/getmovie?title=YourMovieTitle
app.get('/getmovie', (req, res) => {
  const title = req.query.title;
  const querystr = `http://www.omdbapi.com/?t=${title}&apikey=${apikey}`;

  axios
    .get(querystr)
    .then(response => {
      const movie = new Movie({
        title: response.data.Title,
        year: response.data.Year,
        genre: response.data.Genre,
        actors: response.data.Actors,
        plot: response.data.Plot,
        poster: response.data.Poster
      });
      if (!movie.title) {
        res.status(200).json('Not found');
        return;
      }
      movie
        .save()
        .then(response => {
          res.status(200).json(response);
        })
        .catch(error => {
          res.status(400).json(error);
        });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

// localhost:5000/create?name=NAME&value=VALUE
app.get('/create', (req, res) => {
  const data = new Data({
    name: req.query.name,
    value: req.query.value
  });

  data
    .save()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

// localhost:5000/getalldata
app.get('/getalldata', (req, res) => {
  Data.find({})
    .then(response => {
      res.status(200).json(response);
    })
    .catch(errors => {
      res.status(400).json(errors);
    });
});

// localhost:5000/delete?name=NAME
app.get('/delete', (req, res) => {
  const query = {
    name: req.query.name
  };
  Data.deleteMany(query)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(errors => {
      res.status(400).json(errors);
    });
});

// localhost/postcreate
// x-www-form-urlencoded
// name=NAME value=VALUE
app.post('/postcreate', (req, res) => {
  const data = new Data({
    name: req.body.name,
    value: req.body.value
  });

  data
    .save()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
