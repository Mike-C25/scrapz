const express = require("express");
const router = express.Router();



router.get("/",function(req,res){
    res.render("home");
});


router.get("test", function(req,res){
    res.render("testpage");
})



module.exports = router;