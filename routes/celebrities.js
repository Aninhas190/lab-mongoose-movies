const express = require('express');
const celebrityRouter = express.Router();

const Celebrity = require('./../models/celebrity');


// celebrityRouter.get('/', (req, res) => {
//   res.render('/celebrities/index')
// });

celebrityRouter.get('/', (req, res, next) => {
  //res.send('abc');
  Celebrity.find()
    .then(celebrity => {
      if(!celebrity) {
        const error = new Error();
        return Promise.reject(error)
      } else {
        res.render('celebrities/index', {celebrity})
      }
    })
    .catch(error => {
      next(error);
    });
});

module.exports = celebrityRouter;
