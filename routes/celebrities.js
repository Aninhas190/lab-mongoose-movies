const express = require('express');
const celebrityRouter = express.Router();
const Celebrity = require('./../models/celebrity');

//
celebrityRouter.get('/', (req, res, next) => {
  Celebrity.find()
    .then((document) => {
      if (!document) {
        const error = new Error();
        return Promise.reject(error);
      } else {
        res.render('celebrities/index', { document });
      }
    })
    .catch((error) => {
      next(error);
    });
});

celebrityRouter.get('/create', (req, res) => {
  res.render('celebrities/create');
});

celebrityRouter.post('/create', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  const newCelebrity = new Celebrity({ name, occupation, catchPhrase });
  newCelebrity
    .save()
    .then((celebrity) => res.redirect('/celebrities'))
    .catch(error => res.render('celebrities/create'));
});

celebrityRouter.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findByIdAndRemove({ _id: id })
    .then(document => res.redirect('/celebrities'))
    .catch(error => {
      next(error);
    })
})

celebrityRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findOne({ _id: id })
    .then((celebrityId) => {
      res.render('celebrities/show', { celebrityId });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = celebrityRouter;
