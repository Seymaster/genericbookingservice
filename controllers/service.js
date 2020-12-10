const Service = require("../models/Service");
const { packageProduct } = require("./product");

exports.postService = async (req,res,next) =>{
    const { name,options }  = req.body;
    // options =  req.body.options);
    // console.log(options);
    for(let i = 0; i < options.length; i++){
        let product = await packageProduct(options[i].label,options[i].amount) // creates a product with the product API
        // console.log(product);
        product = JSON.parse(product)
        let product_id = product.data.id
        options[i].product_id = product_id;
    }
    const newService = Service({name,options});    
    newService.save((err,data)=>{
        if(err){
            console.log(err)
            // if (err.code == 11000) {
            //     let error = err['errmsg'].split(':')[2].split(' ')[1].split('_')[0];
            //     res.status(500).send({
            //         message: `${error} Service Option saved already`,
            //         status: 11000,
            //         error: err
            //     });
            //     return false;
            // }
            // res.status(500).send({
            //     status:500,
            //     message:"Could not save Service Option"
            // });
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


exports.deleteService = (req, res, next) =>{
    const optionId = req.params.id;
    // console.log(optionId)
    Service.remove({_id:optionId})
    .exec((err,data) =>{
        if (err) {
            res.status(500).send({
                status: 500,
                message: "An error Occurred"
            });
            return false;
        }
        res.status(200).send({
            status:200,
            message: `Service with id: ${optionId} deleted`
        });
    });

};
