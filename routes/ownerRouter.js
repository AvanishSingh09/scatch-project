const express = require('express');
const router = express.Router();

router.get("/",function(req,res) {
    res.send("I am the owner route and working properly");
});

module.exports = router;