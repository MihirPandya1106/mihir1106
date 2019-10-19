const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/carrentDB', { useNewUrlParser: true }, (err) =>{
	if (!err) {console.log('Connection Successfull')}
	else {console.log('Error is '+err)}
});

require('./car.model');