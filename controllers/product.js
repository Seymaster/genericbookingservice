const fetch = require("node-fetch");

// Product Service API
async function packageProduct(name,amount){
    let result;
    const secKey = await cache.getAsync("INTERNAL_SECURITY_TOKEN");
    let urlencoded = {  "name" : name,
                        "amount" : amount,
                        "type": "events",
                        "description": "booking"
                    }       
    let requestOptions = {
        method: 'POST',
        headers: {  "Accept": "application/json",
                    "Content-Type": "application/json",
                    "internal-security-token": secKey,
                    "client-id":"test_33cc43cf02e34989f01f"
                },
        body: JSON.stringify(urlencoded),
        redirect: 'follow'
      };
    try{
        const response = await fetch("https://staging.phoenix.humbergames.com/products/v1/product", requestOptions)
        result = await response.text();
    }
    catch(error){
        console.log("error", error)
    }

    // console.log(result);
    return await result;
}

// var name = 'Basic'
// var amount = '5000'
// packageProduct(name,amount)
// .then(data=>{
//         console.log(data)
//     }).catch(err =>{
//         console.log(err)
//     })

module.exports = { packageProduct }