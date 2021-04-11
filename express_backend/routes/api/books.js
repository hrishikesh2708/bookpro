const express = require("express");
const router = express.Router();
const book = require("../../model/books");

router.get('/book', async (req, res) => {
    try {
        const x = await book.find();
        res.json(x)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }

})

module.exports = router;