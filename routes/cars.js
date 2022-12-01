var express = require('express');
const cars_controlers= require('../controllers/cars');
var router = express.Router();

// A little function to check if we have an authorized user and continue on 
//or 
// redirect to login. 
const secured = (req, res, next) => { 
    if (req.user){ 
      return next(); 
    } 
    req.session.returnTo = req.originalUrl; 
    res.redirect("/login"); 
  } 

 // GET request for one costume.
 router.get('/cars/:id',secured, cars_controlers.cars_detail);
 
/* GET home page. */
router.get('/',secured, cars_controlers.cars_view_all_Page);

/* GET detail cars page */
router.get('/detail',secured, cars_controlers.cars_view_one_Page);

/* GET create cars page */
router.get('/create',secured, cars_controlers.cars_create_Page);

/* GET create update page */
router.get('/update',secured, cars_controlers.cars_update_Page);

/* GET delete cars page */
router.get('/delete',secured, cars_controlers.cars_delete_Page);


module.exports = router;
