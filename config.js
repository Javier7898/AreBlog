const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Berita_Crud");


// Check database connected or not
connect.then(() => {
    console.log("Database for user Connected Successfully");
})
.catch(() => {
    console.log("Database for user cannot be Connected");
})

// Create Schema
const Loginschema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
});

// collection part
const collection = new mongoose.model("users", Loginschema);

module.exports = collection;