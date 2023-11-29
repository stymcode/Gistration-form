const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { Decimal128 } = require("mongodb");

const app = express();
dotenv.config();


const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect("mongodb+srv://satyam:o3MwqnpiwTLQL4EX@cluster0.bevdnwn.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser : true,
    useUnifiedTopology : true,
});

// registration schema
const registrationSchema = new mongoose.Schema({
     firstname: String, 
     lastnsme: String,
     college: String,
     branch: String,
     cgpa: Decimal128,
     skill: String,
     password: String

});
    
    // model of registration schema
    const Registration = mongoose.model("Registration", registrationSchema);
    
    app.use(bodyParser.urlencoded ({ extended: true })); 
    app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/index.html");
    })

    app.post("/register", async (req, res) => {
        try{
           const {firstname, lastnsme, college, branch, cgpa, email, password} = req.body;
        
           const existinguser = await Registration.findOne({email:email});
           if(!existinguser){
            const registrationData = new Registration({
                firstname,
                lastnsme,
                college,
                branch,
                cgpa,
                email,
                password
             });
        
              await registrationData.save();
              res.redirect("/success");
           }
           else{
            alert("User already exist");
            res.redirect("/error");
           }

           const registrationData = new Registration({
            firstname,
            lastnsme,
            college,
            branch,
            cgpa,
            skill,
            email,
            password
            });
        
        
             await registrationData.save();
        
             res.redirect("/success");
        }
        
        catch(error){
            console.log(error);
            res.redirect("error");
        }

    });
 
    app.get("/success", (req, res)=>{
        res.sendFile(__dirname+"/pages/success.html");
        
    })
        
    app.get("/error", (req, res)=>{
        res.sendFile(__dirname+"/pages/error.html");

    })


app.listen(port, ()=>{
console.log(`server is running on port ${port}`);

})