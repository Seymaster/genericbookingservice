require("dotenv").config();
require("tm-redis")
const express      = require("express");
const logger       = require("morgan");
const cors         = require("cors");
const mongoose     = require("mongoose");
const dbconfig     = require("./configs/dbconfig");
const serviceRouter = require("./routes/service");
const bookingRouter = require("./routes/booking");
const completeRouter = require("./routes/complete");
const confirmRouter = require("./routes/confirm");
const app          = express();
const PORT         = process.env.PORT || 8080;
const { requireClient } = require("./middleware/MiddlewareAuth");


mongoose.Promise = global.Promise;

app.listen(PORT, (err)=>{
    console.log(err)
});

app.use(express.json());
app.use(cors());
app.use(logger("dev"));
// app.use(requireClient)
app.use("/api/v1", serviceRouter);
app.use("/api/v1", bookingRouter);
app.use("/api/v1", completeRouter);
app.use("/api/v1", confirmRouter);


mongoose.connect(dbconfig.dbUrl,
    {useNewUrlParser: true, useUnifiedTopology: true}
)
.then(()=>{
    console.log("connected to db")
})
.catch(err =>{
    console.log(err)
});

app.use((req,res,next)=>{
        return res.status(404).send({
        status: 404,
        message: "This API doesnt exist"
    })
})


