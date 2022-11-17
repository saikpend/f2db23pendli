var cars = require('../models/cars');

// List of all cars
exports.cars_list = async function(req, res) {
    try{
    theCars = await cars.find();
    res.send(theCars);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };

    // VIEWS
// Handle a show all view
exports.cars_view_all_Page = async function(req, res) {
    try{
    theCars = await cars.find();
    res.render('cars', { title: 'cars Search Results', results: theCars });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };

// List of all cars
//exports.cars_list = function(req, res) {
//res.send('NOT IMPLEMENTED: cars list');
//};
// for a specific cars.
exports.cars_detail = function(req, res) {
res.send('NOT IMPLEMENTED: cars detail: ' + req.params.id);
};
// Handle cars create on POST.
exports.cars_create_post = function(req, res) {
res.send('NOT IMPLEMENTED: cars create POST');
};
// Handle cars delete form on DELETE.
exports.cars_delete = function(req, res) {
res.send('NOT IMPLEMENTED: cars delete DELETE ' + req.params.id);
};
// Handle cars update form on PUT.
exports.cars_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: cars update PUT' + req.params.id);
};

// Handle Costume create on POST.
exports.cars_create_post = async function(req, res) {
    console.log(req.body)
    let document = new cars();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"Car_Company":"lambhorgini", "Car_Model":"canvas", "Car_Cost":21222}
    document.Car_Company = req.body.Car_Company;
    document.Car_Model = req.body.Car_Model;
    document.Car_Cost = req.body.Car_Cost;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };

    // for a specific Cars. 
exports.cars_detail = async function(req, res) { 
    console.log("detail"  + req.params.id) 
    try { 
        result = await cars.findById( req.params.id) 
        res.send(result) 
    } catch (error) { 
        res.status(500) 
        res.send(`{"error": document for id ${req.params.id} not found`); 
    } 
};

// Handle Cars update form on PUT. 
exports.cars_update_put = async function(req, res) { 
    console.log(`update on id ${req.params.id} with body 
${JSON.stringify(req.body)}`) 
    try { 
        let toUpdate = await cars.findById( req.params.id) 
        // Do updates of properties 
        if(req.body.Car_Company)  
               toUpdate.Car_Company = req.body.Car_Company; 
        if(req.body.Car_Cost) toUpdate.Car_Cost = req.body.Car_Cost; 
        if(req.body.Car_Model) toUpdate.Car_Model = req.body.Car_Model; 
        let result = await toUpdate.save(); 
        console.log("Sucess " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": ${err}: Update for id ${req.params.id}s 
failed`); 
    } 
};

// Handle Cars delete on DELETE.
exports.cars_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await cars.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
   };

   // Handle a show one view with id specified by query
exports.cars_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await cars.findById( req.query.id)
    res.render('carsdetail',
   { title: 'Cars Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

   // Handle building the view for creating a cars.
// No body, no in path parameter, no query.
// Does not need to be async
exports.cars_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('carscreate', { title: 'Cars Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

   // Handle building the view for updating a cars. 
// query provides the id 
exports.cars_update_Page =  async function(req, res) { 
    console.log("update view for item "+req.query.id) 
    try{ 
        let result = await cars.findById(req.query.id) 
        res.render('carsupdate', { title: 'Cars Update', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle a delete one view with id from query 
exports.cars_delete_Page = async function(req, res) { 
    console.log("Delete view for id "  + req.query.id) 
    try{ 
        result = await cars.findById(req.query.id) 
        res.render('carsdelete', { title: 'Cars Delete', toShow: 
result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 