const Service = require("../models/Service");
const { options } = require("../routes/service");

exports.postService = (req,res,next) =>{
    const { name }   = req.body;
    const options =  [{ label: "Service 1",amount: 500},
                      { label: "Service 2",amount: 1000, default: true},
                      { label: "Service 3",amount: 1500, default: true}]
    const newService = Service({name,options});    
    newService.save((err,data)=>{
        if(err){
            if (err.code == 11000) {
                let error = err['errmsg'].split(':')[2].split(' ')[1].split('_')[0];
                res.status(500).send({
                    message: `${error} Service Option saved already`,
                    status: 11000,
                    error: err
                });
                return false;
            }
            res.status(500).send({
                status:500,
                message:"Could not save Service Option"
            });
        }
        else{
            // console.log(data)
            res.status(200).send({
                status:200,
                message: "Service Option created successfully",
                data: data
            });
        }
    })
};

exports.getService = (req,res,next)=>{
    Service.find()
    .then( data => {
        // console.log(data)
        if(data === null){
            res.status(503).json({
                status:503,
                message: "No Service available"})
        }
        else{
            res.status(200).send({
                status: 200,
                message: "Service Loaded Successfully",
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
};

exports.updateService = (req, res, next) =>{
    const optionId = req.params.id;
    const optionupdate = req.body;
    optionupdate['date_modified'] = new Date()
    Service.findOneAndUpdate({_id:optionId},{$push:{option:optionupdate}})
    // {new:true,upsert:true})
    .then((data) =>{
        res.status(200).send({
            status: 200,
            message: "Service Option updated",
            data: data
        });
    })
    .catch((err)=>{
        res.status(500).send({
            status: 500,
            message: " An error occurred"
        });
    });

};
