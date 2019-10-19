const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const car = mongoose.model('Car');

router.get('/',(req,res) => {
	res.render("car/addcar",{
		viewTitle : "Insert Car Details"
	});
});

router.post('/',(req,res) => {
	if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function insertRecord(req,res){
    var ca = new car();
     ca.model = req.body.model;
      ca.details =  req.body.details;
      ca.price = req.body.price;
      ca.year = req.body.year;
         creationDate = Date.now();
         // 
         // mongoose.collection("carrenting").insertOne(ca,function(err,res){
         // 	if (err) throw err;
         // 	console.log('Inserted');
         // 	db.close();
         // });
		ca.save((err, doc) => {
        if (!err)
            res.redirect('car/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("car/addcar", {
                    viewTitle: "Insert Car",
                    car: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}



function updateRecord(req, res) {
    car.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('car/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("car/addcar", {
                    viewTitle: 'Update Car ',
                    car: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}




router.get('/list', (req, res) => {
    car.find((err, docs) => {
        if (!err) {
            res.render("car/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving car list :' + err);
        }
    });
});



function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'model':
                body['modelError'] = err.errors[field].message;
                break;
            case 'details':
                body['detailsError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    car.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("car/addcar", {
                viewTitle: "Update Car",
                car: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    car.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/car/list');
        }
        else { console.log('Error in Car delete :' + err); }
    });
});





module.exports = router;
