const mongoose = require('mongoose');

const resumeInformation = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    social: [{
        name: String,
        url: String
    }],
    resume: {
        education: [{
            school:String,
            degree:String,
            graduated:String
        }],
        courses: [{
            university:String,
            courseTitle:String,
            date:String
        }],
        skills: [{
            name: String,
            level: String
        }]
    },
    portfolio: {
        projects: [{
            title:String,
            category:String,
            imageUrl: String,
            url: String,
            repositoryUrl:String
        }]
    }
})

module.exports = mongoose.model('resumeInformation', resumeInformation );