const router = require('express').Router();
const Book = require('./Models/book');
const Student = require('./Models/student');
const User = require('./Models/alluser');
const Videos = require('./Models/videos');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./verifyToken');

// 1st routes for books collection or book model
router.get("/bookdata", async (req, res) => {
    const book = await Book.find();
    res.send(book);
});

module.exports = router;