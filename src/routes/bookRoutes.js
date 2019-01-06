const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

function router(title, nav) {
  bookRouter.route('/')
    .all((req, res, next) => {
      (async function query() {
        const request = new sql.Request();

        const { recordset } = await request.query('select * from books')
          .catch(err => debug(err));
        req.bookList = recordset;
        next();
      }());
    })
    .get((req, res) => {
      res.render('bookList', {
        title,
        nav,
        books: req.bookList
      });
    })
    .post((req, res) => {
      (async function query() {
        const { id } = req.body;
        const request = new sql.Request();
        debug(id, req.params, req.body);
        await request
          .input('id', sql.Int, id)
          .query('DELETE FROM books WHERE id = @id')
          .catch(err => debug(err));

        res.redirect('/books');
      }());
    });

  bookRouter.route('/:id')
    .all((req, res, next) => {
      (async function query() {
        const { id } = req.params;
        debug(id, req.params, req.body);
        const request = new sql.Request();

        const { recordset } = await request.input('id', sql.Int, id)
          .query('select * from books where id = @id');
        [req.book] = recordset;
        next();
      }());
    })
    .get((req, res) => {
      res.render('singleBook', {
        title,
        nav,
        book: req.book
      });
    });
  return bookRouter;
}

module.exports = router;
