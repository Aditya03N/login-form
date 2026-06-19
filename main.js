import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { User } from "./models/info.js";
import bcrypt from "bcrypt";


const app = express()
const port = 5000

await mongoose.connect("mongodb://localhost:27017/userinfo");

app.use(bodyParser.urlencoded({ extended: true }));
//it coverts unreadable data to objcts
app.use(bodyParser.json());

app.set("view engine","ejs")

app.get('/', (req, res) => {
  res.render('index')
})
app.get("/signup", (req, res) => {
  res.render("signup"); // renders signup form
});

app.get("/login", (req, res) => {
  res.render("login"); // renders login form
});

app.post("/signup", async(req, res) => {

const{username,password}=req.body;
 const newUser = new User({ username, password });

  try {
    await newUser.save();
    res.render("dashboard",{username:newUser.username});
  } catch (err) {
    res.send("❌ Error saving user: " + err.message);
  }
  
});

app.post("/login",async(req,res)=>{
    const{username,password}=req.body;

     const user = await User.findOne({ username });
  if (!user) return res.send("❌ User not found!");
  else{
    res.render("dashboard",{username:User.username});
  }

})


//   const username = req.body.username;
// const password = req.body.password;
 
//   // Dummy credentials (practice ke liye)
//   const validUser = "aditya";
//   const validPass = "12345";

//   if (username === validUser && password === validPass) {
//     res.send("✅ Login successful!");
//   } else {
//     res.send("❌ Invalid credentials!");
//   }



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});