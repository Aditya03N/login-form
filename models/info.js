import mongoose from "mongoose";

const infoschema = new mongoose.Schema({
    username: {type: String, required: true, default: "Hey"},
    password: String,
  
});

export const User = mongoose.model('User', infoschema);