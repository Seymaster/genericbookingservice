const Booking = require("../models/Booking");
const mailSender   = require("./sendmail")


exports.postBooking = (req,res,next)=>{
    const {address,nextOfKin} = req.body;
    newBooking = Booking({address,nextOfKin})
    newBooking.save((err,data)=>{
        if(err){
            if (err.code == 11000) {
                let error = err['errmsg'].split(':')[2].split(' ')[1].split('_')[0];
                res.status(500).send({
                    message: `${error} Booking saved already`,
                    status: 11000,
                    error: err
                });
                return false;
            }
            res.status(500).send({
                status:500,
                message:"Could not save Booking"
            });
        }
        else{
            // console.log(data)            
            mailSender
            res.status(200).send({
                status:200,
                message: "Booking created successfully",
                data: data
            });
        }
    });
};

exports.getAllBooking = (req,res,next)=>{
    Booking.find()
    .then( data => {
        // console.log(data)
        if(data === null){
            res.status(503).json({
                status:503,
                message: "No Booking available"})
        }
        else{
            res.status(200).send({
                status: 200,
                message: "Bookings Loaded Successfully",
                data: data
            });
        }
    })
    .catch(err =>{
        res.status(500).send({
            status: 500,
            message: "Error getting the Service",
            err: err
        })
    });
}