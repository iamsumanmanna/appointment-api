const router = require('express').Router();
router.get("/",(req,res)=> {
    res.send("First APi NOde Js");
})
module.exports = router;