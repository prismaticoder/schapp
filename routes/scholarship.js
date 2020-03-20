var express = require('express');
var router = express.Router();
var { checkStudent } = require('../middlewares')
var { Op } = require('sequelize');
var models = require('../models'); // loads index.js
var { Scholarship,Application,Student } = models;       // the model keyed by its name

router.get('/', async (req,res) => {

    try {
        let scholarships = await Scholarship.findAll({
            where: {
                deadline: {
                    [Op.gt] : new Date()
                }
            }
        })
        let student;
        if (req.session.student) {
            student = await Student.findOne({
                where: {
                    matric: req.session.student
                }
            })
        }
        else {
            student = null
        }



        return res.render('scholarships', {page_name: "scholarships", title: "All Scholarships", scholarships, student})
    } catch (error) {
        console.log(error)
    }

})

router.get('/:id', async (req,res) => {
    let { id } = req.params;
    try {
        let scholarship = await Scholarship.findOne({
            where: {
                id
            }
        })

        if (scholarship) {
            let student;
            if (req.session.student) {
                student = await Student.findOne({
                    where: {
                        matric: req.session.student
                    }
                })
            }
            else {
                student = null
            }
            return res.render('single-scholarship', {title: `${scholarship.name} Scholarship`, page_name: "scholarships", scholarship, student})
        }
        else {
            return res.status(404).json("Invalid ID")
        }
    } catch (error) {
        console.log(error)
    }

})

router.get('/:id/apply', checkStudent, async (req, res) => {
    let { student } = res.locals;
    let { id } = req.params;

    try {
        let scholarship = await Scholarship.findByPk(id);

        if (scholarship) {
            let restrictions = JSON.parse(scholarship.restrictions);

            let { cgpa, level, state, lga } = restrictions;

            //Check for all necessary conditions
            if ((student.cgpa >= cgpa || cgpa == "Any") && (student.level >= level || level == "Any") && (student.state == state || state == "Any") && (student.lga == lga || lga == "Any")) {
                await student.createApplication({
                    ScholarshipId: id,
                    status: "ongoing"
                })

                return res.json({message: "You have successfully applied for this scholarship"})
            }
            else {
                return res.json({message: "Sorry, you are ineligible to apply for this scholarship based on the given requirements"})
            }
        }
    } catch (error) {
        console.log(error)
    }

})





module.exports = router