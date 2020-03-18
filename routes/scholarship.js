var express = require('express');
var router = express.Router();
var { Op } = require('sequelize');
var models = require('../models'); // loads index.js
var { Scholarship } = models;       // the model keyed by its name

router.get('/', async (req,res) => {

    try {
        let scholarships = await Scholarship.findAll({
            where: {
                deadline: {
                    [Op.gt] : new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0,10)
                }
            }
        })

        return res.json(scholarships)
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
            return res.json(scholarship)
        }
        else {
            return res.status(404).json("Invalid ID")
        }
    } catch (error) {
        console.log(error)
    }

})





module.exports = router