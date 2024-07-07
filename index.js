const express =require("express");
// const collection= require("./mongo");
const dashboardRoute=require("./controller/dashboardRoute");
const cors =require("cors");
const bodyParser=require("body-parser");
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
const mongoose= require("mongoose");

mongoose.set("strictQuery",true)

mongoose.connect("mongodb+srv://scurd1311:test123@cluster0.djurl1z.mongodb.net/user")
.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("failed");
})

var db=mongoose.connection;
// db.on("open",()=>console.log("connected to DB"));
// db.on("error",()=>console.log("error occured"));

const newSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

const collection= mongoose.model("collection",newSchema);

app.get("/",cors(),(req,res)=>{

})


app.post("/",async(req,res)=>{
    const {username,password}=req.body

    try {
        const check=await collection.findOne({username:username})
        const checkPassword=await collection.findOne({password:password})

        if(check && checkPassword){
            res.json("exist")
        }else{
            res.json("not exist")
        }
    } catch (error) {
        console.log(error);
        res.json("not exist")
    }
})



app.post("/register",async(req,res)=>{
    const {username, password}=req.body

    const data={
        username:username,
        password:password
    }

    try {
        const check=await collection.findOne({username:username})

        if(check){
            res.json("exist")
        }else{
            res.json("not exist")
            await collection.insertMany([data])
        }
    } catch (error) {
        console.log(error);
        res.json("not exist")
    }
})

app.use("/dashboardRoute",dashboardRoute);


app.listen(3000,()=>{
    console.log("port connected");
})