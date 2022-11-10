const mongoose = require("mongoose")



const carsSchema = mongoose.Schema({



    Car_Company: String,

    Car_Cost: Number,

    Car_Model: String,

})

//The first argument to the model function is going to be the name of the collection of documents that will be stored in your MongoDB.

module.exports = mongoose.model("cars",
    carsSchema)