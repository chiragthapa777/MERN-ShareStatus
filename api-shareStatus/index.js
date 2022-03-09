const express= require("express")
const app=express()
const connectDB=require("./connectDB")
const cors= require("cors")

app.use(cors())

const port=2000;
connectDB();


//routes
app.use(express.json())
app.use("/api/auth",require("./routes/auth"))
app.use("/api/post",require("./routes/post"))
app.use("/api/users",require("./routes/users"))


app.get("/",(req, res)=>{
    res.send("welcome to share status api")
})

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);
})