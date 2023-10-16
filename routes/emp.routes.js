const express = require("express");

const {Empmodel} = require("../models/Emp.model")
const empRouter = express.Router();

empRouter.get("/", async(req,res)=>{
     const emp = await Empmodel.find();
     res.send({"emp":emp})
})

empRouter.post("/create", async(req,res)=>{
     const {First_Name, Last_Name, Email , Department, Salary} = req.body;
     const emp_id = req.UserID;
     const emp = await Empmodel.create({First_Name, Last_Name, Email , Department, Salary, emp_id})
     res.send({"emp": emp})
})




module.exports = {empRouter}