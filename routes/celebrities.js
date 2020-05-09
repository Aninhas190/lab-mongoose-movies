const express = require('express');
const celebrityRouter = express.Router();

const Celebrity = require('./../models/celebrity');

//
celebrityRouter.get('/', (req, res, next) => {
  Celebrity.find()
    .then(document => {
      if(!document) {
        const error = new Error();
        return Promise.reject(error);
      } else {
        res.render('celebrities/index', {document})
      }
    })
    .catch(error => {
      next(error);
    });
});

celebrityRouter.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findOne( {_id: id})
  .then(celebrityId => {
      res.render('celebrities/show', {celebrityId})
  })
  .catch(error => {
    next(error);
  });
})




module.exports = celebrityRouter;
