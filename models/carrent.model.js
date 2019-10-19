const mongoose = require('mongoose');

var carschema = new mongoose.Schema({
    model: { type: mongoose.Schema.Types.String, required: true },
    image: { type: mongoose.Schema.Types.String, required: true },
    price: { type: Number, required: true },
    year: { type: Number, required: true },
    isRendet: {type: Boolean, required: true, default: false},
    creationDate: {type: Number, required:true}    
});