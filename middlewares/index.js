var { Op } = require('sequelize');
var models = require('../models'); // loads index.js
var { Student } = models;       // the model keyed by its name

exports.checkStudent = async (req, res, next) => {
    if (req.session.student) {
        let student = await Student.findOne({
            where: {
                matric: req.session.student
            }
        })

        res.locals.student = student
        return next()
    }
    else {
        res.redirect('/login')
    }
}

exports.getStudent = async (req, res) => {
    
    try {
        let student = await Student.findOne({
            where: {
                matric: req.session.student
            }
        })
    
        return student   
    } catch (error) {
        console.log(error)
    }
}

exports.checkOrg = async (req, res, next) => {
    if (req.session.org) {
        let username = req.session.org 

        try {
            let org = await Org.findOne({
              where: {
                username
              }
            }) 
            res.locals.org = org;
            return next()
          } catch (error) {
            console.log(error)
          }
    }
    else {
        res.redirect('/organization/login')
    }
}