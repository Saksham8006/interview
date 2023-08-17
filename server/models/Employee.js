const mongoose = require('mongoose')

const employeeData = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    joiningDate: {
        type:String,
      required:true,
        
    },
    gender: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    designationExperience: {
        type: String,
        required: true,
    },
    timePeriod: {
        type: String,
        required: true,
    },
  

})

const model = mongoose.model('EmployeeData', employeeData)

module.exports = model;