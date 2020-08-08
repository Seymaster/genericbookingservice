const Complete     = require("../models/Complete");
const fetch = require("node-fetch");
const Confirm = require("../models/Confirm");

function sendmail(){
    var raw = JSON.stringify({ "provider": "sendgrid",
    "subject": "Booking Completed",
    "recipients": [
        "alugbinoluwaseyi1@gmail.com"
    ],
    "header": {
        "title": "The Email Header",
        "bgColor": "",
        "appName": "MyApp",
        "appURL": "http://myapp.com",
        "appLogo": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
    },
    "content": "Inside Content: <br>Testing email attachment content<br> <p>KKD</p>",
    "body": {
        "content": "Inside Content: <br>Testing email content<br> <p>KKD</p>",
        "greeting": "Greetings,",
        "introLines": [
            "Introduction Line",
            "You can still add more intro"
        ],
        "outroLines": [
            "1. Content below button",
            "2. Still below button or rather main content"
        ]
    },
    "button": {
        "level": "success",
        "actionUrl": "https://google.com/hello",
        "actionText": "The Button text"
    },
    "attachments": [
        {
            "type":"url",
            "filename":"invoice.png",
            "data":"https://res.cloudinary.com/tm30global/image/upload/v1593685114/meygwiis1vnqgug6icnq.png"
        }
    ]});

    var requestOptions = {
    method: 'POST',
    headers:  {
                "Accept": "application/json",
                "Content-Type":"application/json",
                "client-id": "humber"
            },
    body: raw,
    redirect: 'follow'
    };

    fetch("https://staging.api.humbergames.com/notifications/v1/email",requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

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
            sendmail();
            res.status(200).send({
                status:200,
                message: "Complete booking created successfully",
                data: data
            });
        }
    });
};


exports.getAllConfirmed = (req,res,next)=>{
    Confirm.find()
    .then( data => {
        // console.log(data)
        if(data === null){
            res.status(503).json({
                status:503,
                message: "No Confirmed booking available"})
        }
        else{
            res.status(200).send({
                status: 200,
                message: "Confirmed bookings Loaded Successfully",
                data: data
            });
        }
    })
    .catch(err =>{
        res.status(500).send({
            status: 500,
            message: "Error getting Confirmed booking",
            err: err
        })
    });
};