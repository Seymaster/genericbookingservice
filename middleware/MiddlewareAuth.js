const { verifyJWT } = require("./helper");
const debug = require("debug")("app:debug");


exports.authenticate = async (req,res,next) => {
    try{
        if(res.allowPass)
            return next();
        let token = req.headers['x-access-token'] || req.headers['authorization'] || req.body.token;
        if (!token) throw new Error("No token provided.");
        if (token.startsWith('Bearer '))
            token = token.slice(7, token.length);
        const user = await verifyJWT(token, res.client.secret);
        if(!user)
            throw new Error("Failed to authenticate token. ");

        // debug("User", user);
        res.token = token;
        // console.log("user details", user)
        res.locals = { user_email: user.auth.email }
        return next();
    }catch (error) {
        // debug(error);
        // console.log(error);
        return res.status(400).send({
            status:400,
            message: "Failed to authenticate token",
            error: error
        })
    }
};

exports.requireClient = async (request, reply, next) => {
    const clientId = request.headers['client-id'] || request.headers.client_id;
    if (!clientId)
        return reply.status(403).send({
                    status:403,
                    message:"You are not authorized to use this service"
                });

    //check if client-id can access this service
    if (clientId == "default")
        return;
    // //check if client exists
    const client = await cache.hgetAsync("clients", clientId);
    if(!client)
        return reply.status(403).send({
            status:403,
            message:"You are not authorized to use this service"
        });
    reply.client = JSON.parse(client);
    //check if client can access this service
    reply.clientId = clientId;
    if (request.body)
        request.body.clientId = clientId;
    if (request.query)
        request.query.clientId = clientId;
    if (request.params)
        request.params.clientId = clientId;
    return next();
};