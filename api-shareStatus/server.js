const express= require("express")
const app=express()
const connectDB=require("./utils/connectDB")
const cors= require("cors")
app.use(cors())
const fileUpload=require("express-fileupload")
var bodyParser = require('body-parser')

app.use(fileUpload({
    useTempFiles:true
}))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
const port=2000;
connectDB();
app.use(express.json())

//routes
app.use("/api/auth",require("./app/routes/auth"))
app.use("/api/post",require("./app/routes/post"))
app.use("/api/users",require("./app/routes/users"))
app.use("/api/image",require("./app/routes/upload"))


app.get("/",(req, res)=>{
    res.send("welcome to share status api")
})

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
})