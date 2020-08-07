const express      = require("express");
const logger       = require("morgan");
const cors         = require("cors");
const mongoose     = require("mongoose");
const dbconfig     = require("./configs/dbconfig");
const serviceRouter = require("./routes/service");
const bookingRouter = require("./routes/booking")
const app          = express();
const PORT         = process.env.PORT || 8080;


mongoose.Promise = global.Promise;

app.listen(PORT, (err)=>{
    console.log(err)
});

app.use(express.json());
app.use(cors())
app.use(logger("dev"));
app.use("/api/v1", serviceRouter);
app.use("/api/v1", bookingRouter);


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
        return res.status(500).send({
        status: 500,
        message: "Server Error"
    })
})


