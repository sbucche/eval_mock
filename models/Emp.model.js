const mongoose = require("mongoose");

const empSchema = mongoose.Schema({
    First_Name : {type: String , required: true},
    Last_Name : {type: String , required: true},
    Email : {type: String , required: true},
    Department : {type: String , required: true},
    Salary : {type: Number , required: true},
    emp_id: {type: String , required: true}
})

const Empmodel = mongoose.model("emp", empSchema);

module.exports = {Empmodel};