const mongoose = require("mongoose");
const express=require("express")
const cors=require("cors");

const app=express();
app.use(cors());

app.get("/students",async(req,res)=>{
    let studentsData=await Student.find();
    res.json(studentsData);
})


app.listen(2120,()=>{
    console.log("Listening to port 2120")
})
let studentSchema=new mongoose.Schema({
    firstName:{
        type: String,
        validate: {
          validator: function(v) {
            return /^[A-Za-z ]{2,20}$/.test(v);
          },
          message: props => `${props.value} is not a valid firstName!`,
        },
        required: [true, 'User firstName required'],
      },
      lastName:{
        type: String,
        validate: {
          validator: function(v) {
            return /^[A-Za-z ]{2,20}$/. test(v);
          },
          message: props => `${props.value} is not a valid lastName!`,
        },
        required: [true, 'User lastName required'],
      },
          
    gender:{
        type:String,
        required:[true,"Gender is Mandatory"],
        lowercase:true,
        enum:["male","female"]
    },
    age:{
        type:Number,
        min:[1,"too early to create account"],
        max:[100,"too late to create account"],
        req:[true,"age is mandatory"],
    },
    email:{
        type: String,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
          },
          message: props => `${props.value} is not a valid email!`,
        },
        required: [true, 'User phone number required'],
      },

    batchId:String,
});

let Student=new mongoose.model("student",studentSchema);

let getDataFromDB=async()=>{
    let studentsData=Student.find();
    console.log(studentsData);
}

let saveDataToDB=async()=>{
try{
    let hari=new Student({
        firstName:"Hari",
        lastName:"basineni",
        gender:"male",
        age:26,
        email:"haribasineni08@gmail.com",
        batchId:"MERN 2404",
        })
        //await hari.save();

    let mahesh=new Student({
        firstName:"mahesh",
        lastName:"kumar",
        gender:"male",
        age:27,
        email:"mahesh@gmail.com",
        batchId:"MERN 2404",
        })
        //await mahesh.save();

    let pawan=new Student({
        firstName:"pawan",
        lastName:"babu",
        gender:"male",
        age:25,
        email:"pawan@gmail.com",
        batchId:"MERN 2404",
        })
       // await pawan.save();

    let aadhya=new Student({
        firstName:"aadhya",
        lastName:"karanam",
        gender:"female",
        age:25,
        email:"aadhya@gmail.com",
        batchId:"MERN 2404",
        })
       // await aadhya.save();
    
Student.insertMany([hari,mahesh,pawan,aadhya])

console.log("Saved Successfully");    
}catch(err){
console.log("Unable to save data")
console.log(err)
}
}
 

let connectToMDB=async()=>{
try{    
await  mongoose.connect("mongodb+srv://bsaihari08:bsaihari08@cluster0.zdkdgld.mongodb.net/Batch2404?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Successfully connected to MDB");
    //saveDataToDB();
    //getDataFromDB();
}catch(err){
    console.log("Unable to connected to MDB");
    console.log(err);
}
};

connectToMDB();