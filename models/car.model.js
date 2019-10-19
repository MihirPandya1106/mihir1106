const mongoose = require('mongoose');

var carschema = new mongoose.Schema({
    model: { type: mongoose.Schema.Types.String, required: true },
    details: { type: mongoose.Schema.Types.String, required: true },
    price: { type: Number, required: true },
    year: { type: Number, required: true },
    isRented: {type: Boolean, required: true, default: false},
    creationDate: {type: Number, required:true}    
});

const Car = mongoose.model('Car', carschema);

module.exports = Car;