const express = require('express');
const movieRouter = express.Router();
const Movie = require('./../models/movie');

movieRouter.get('/', (req, res, next) => {
  Movie.find()
    .then((document) => {
      res.render('movies/index', { document });
    })
    .catch((error) => {
      next(error);
    });
});

movieRouter.get('/create', (req, res) => {
  res.render('movies/create');
});

movieRouter.post('/create', (req, res, next) => {
  const { title, genre, plot } = req.body;

  const newMovie = new Movie({ title, genre, plot });
  newMovie
    .save()
    .then((movie) => res.redirect('/movies'))
    .catch(error => res.render('movies/create'));
});

movieRouter.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Movie.findByIdAndRemove({ _id: id })
    .then(document => res.redirect('/movies'))
    .catch(error => {
      next(error);
    })
})

movieRouter.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Movie.findById({ _id: id })
    .then((document) => res.render('movies/edit', {document}))
    .catch(error => next(error));
});

movieRouter.post('/:id', (req, res, nex) => {
  const id = req.params.id;
  const { title, genre, plot } = req.body;
  Movie.update({ _id: id }, { $set: { title, genre, plot }})
    .then(document => res.redirect('/movies'))   
    .catch(error => next(error));
})

movieRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Movie.findOne({ _id: id })
    .then((movieId) => {
      res.render('movies/show', { movieId });
    })
    .catch(error => {
      next(error);
    });
});


module.exports = movieRouter;