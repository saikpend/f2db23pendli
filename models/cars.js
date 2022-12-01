const mongoose = require("mongoose")

const carsSchema = mongoose.Schema({


    Car_Company: {
        type: String,
        minLength:2,
        maxLength:30
       
    },

    Car_Cost: Number,

    Car_Model: {
        type: String,
        minLength:2,
        maxLength:28
       
    }

})

//The first argument to the model function is going to be the name of the collection of documents that will be stored in your MongoDB.

module.exports = mongoose.model("cars",
    carsSchema)