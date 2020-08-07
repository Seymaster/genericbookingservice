const Complete = require("../models/Complete");

exports.postComplete = (req,res,next) =>{
    const { bookingId, serviceOptionId, paymentRef } = req.body;
    newComplete = Complete({bookingId,serviceOptionId,paymentRef})
    newComplete.save((err,data)=>{
        if(err){
            if (err.code == 11000) {
                let error = err['errmsg'].split(':')[2].split(' ')[1].split('_')[0];
                res.status(500).send({
                    message: `${error} Complete booking saved already`,
                    status: 11000,
                    error: err
                });
                return false;
            }
            res.status(500).send({
                status:500,
                message:"Could not save Complete booking"
            });
        }
        else{
            // console.log(data)            
            mailSender
            res.status(200).send({
                status:200,
                message: "Complete booking created successfully",
                data: data
            });
        }
    });
};


exports.getAllCompleted = (req,res,next)=>{
    Complete.find()
    .then( data => {
        // console.log(data)
        if(data === null){
            res.status(503).json({
                status:503,
                message: "No complete booking available"})
        }
        else{
            res.status(200).send({
                status: 200,
                message: "Complete bookings Loaded Successfully",
                data: data
            });
        }
    })
    .catch(err =>{
        res.status(500).send({
            status: 500,
            message: "Error getting Complete booking",
            err: err
        })
    });
}