const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app:addRoutes');

const addRouter = express.Router();

function router(title, nav) {
  addRouter.route('/')
    .get((req, res) => {
      res.render('addBook', {
        title,
        nav,
        book: req.book
      });
    })
    .post((req, res, next) => {
      debug(req.body.title);
      (async function query() {
        const { titleName } = req.body;
        const { authorName } = req.body;
        const request = new sql.Request();
        try {
          await request
            .input('title', sql.VarChar, titleName)
            .input('author', sql.VarChar, authorName)
            .query('INSERT INTO books (title, author) VALUES(@title, @author)');
        } catch (err) {
          next(err);
        }
        res.redirect('/books');
      }());
    });
  return addRouter;
}

module.exports = router;
