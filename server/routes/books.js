// modules that are required for routing
const { defaultMaxListeners} = require('events');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// this get books from models and define the book model
let book = require('../models/books');

/* GET the books index (Books List page) */
router.get('/', (req, res, next) => {

  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the page to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
      res.render('books/details', {title: 'Add', page: 'details', books: ''});

});

// POST in page and create a new Book with the fields enunciated below
router.post('/add', (req, res, next) => {
  let books = book({
    "Title":req.body.Title,
    "Description":req.body.Description,
    "Price":req.body.Price,
    "Author":req.body.Author,
    "Genre":req.body.Genre
  });
book.create(books,(err, book) => {
  if (err) 
  {
    console.log(err);
    res.end(err);
  }
      res.redirect('/books');
  }); 
});
// GET page to edit a Book in our db
router.get('edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    book.findById(req.params.id,(err,booktoEdit)=>{
      if(err){
        return console.error(err);
      } else {
        res.render('books/details',{title:'Edit',page:'details',books: book});
      }
    });
});
// POST - this update the details of the document
router.post('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;
    let updatedBook = {
      "_id": id,
      "Title": req.body.title,
      "Price": req.body.Price,
      "Author": req.body.Author,
      "Genre": req.body.Genre
    }
    book.updateOne({_id:id},updatedBook,(err)=>{
      if(err){
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/books');
      }
    });
});

// GET - process the delete one of the items in the db using the unique id field
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;
    book.remove({_id:id},(err)=>{
      if(err){
        console.log(err);
        res.end(err);
      }
      res.redirect('/books');
      
    });

});

module.exports = router;