const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.get("/",function(req,res) {
    res.send("I am the owner route and working properly");
});

   router.post("/create", async function(req,res){
       let owners = await ownerModel.find();
       if(owners.length>0) {
        return res
         .status(403)
         .send("you dont have permission to create a new owner");
       }
          let { fullname,email,password,gstin } = req.body;
          let createdOwner = await ownerModel.create({
             fullname,
             email,
            password,
            gstin,
          });
           res.status(201).send(createdOwner);
    });


module.exports = router;