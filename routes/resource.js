var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var cars_controller = require('../controllers/cars');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// CARS ROUTES ///
// POST request for creating a cars.
router.post('/cars', cars_controller.cars_create_post);
// DELETE request to delete cars.
router.delete('/cars/:id', cars_controller.cars_delete);
// PUT request to update cars.
router.put('/cars/:id', cars_controller.cars_update_put);
// GET request for one cars.
router.get('/cars/:id', cars_controller.cars_detail);
// GET request for list of all cars items.
router.get('/cars', cars_controller.cars_list);
module.exports = router;

// Handle Cars update form on PUT. 
exports.cars_update_put = async function(req, res) { 
    console.log(`update on id ${req.params.id} with body 
${JSON.stringify(req.body)}`) 
    try { 
        let toUpdate = await cars.findById( req.params.id) 
        // Do updates of properties 
        if(req.body.cars_type)  
               toUpdate.cars_type = req.body.cars_type; 
        if(req.body.cost) toUpdate.cost = req.body.cost; 
        if(req.body.size) toUpdate.size = req.body.size; 
        let result = await toUpdate.save(); 
        console.log("Sucess " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": ${err}: Update for id ${req.params.id}s 
failed`); 
    } 
};