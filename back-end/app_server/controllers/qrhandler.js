var Qrimages = require('../models/qrhandler')
var fs = require('fs');
//const qrhandler = require('../models/qrhandler');

module.exports.uploadsingle = async(req,res,next)=>{
    
    var record = new Qrimages;
    record.image.data = fs.readFileSync(req.file.path);
    record.image.name = req.file.filename
    console.log(req.file.path)
    record.image.contentType= "image/png";
    record.save((err,result)=>{
        //console.log(result)
        console.log("image has been saved to database")
        console.log(result._id)
        // res.send(record)
        res.send(result._id)
    }).catch((err)=>{
        console.log(err)
    })
    
}

module.exports.uploadmultiple = async(req,res,next)=>{
    
    Qrimages.create(req.body)
    .then((record) => {
        console.log('record added ', record);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'image/png');
        res.send(record.image.data);
    }, (err) => next(err))
    .catch((err) => next(err));


    var record = new Qrimages;
    record.image.data = fs.readFileSync(req.file.path);
    record.save((err,result)=>{
        console.log(result)
        if(err) return console.log(err)
        console.log("Multiple images uploaded successfully")
        res.send(record)
    })
  
}


module.exports.getimage = async(req,res,next)=>{
    
    Qrimages.findById(req.params.id, function(err,record){
        if(err) return next(err);
        // res.contentType(record.image.contentType);
        res.contentType('json');
        // res.send(record.image.data)
        res.send(record.image.name)
        console.log(record.image.name)
        console.log("Image retrieved Successfully")

    })

}



