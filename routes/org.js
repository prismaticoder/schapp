var express = require('express');
var router = express.Router();
var { checkOrg } = require('../middlewares')
var { Op } = require('sequelize');
var models = require('../models'); // loads index.js
var { Scholarship,Application,Student,Org } = models;       // the model keyed by its name
var { states } = require('./states-and-locals');


router.get('/login', async (req, res) => {
    return res.render('org/login', {title: "Organizational Login", page_name:"org-login"})
})

router.post('/login', async (req, res) => {
    let { username, password} = req.body
    try {
      let check = await Org.findOne({
        where: {
          username,password
        }
      })
  
      if (check) {
        req.session.org = check.username;
        res.redirect('/org')
      }
      else {
        res.redirect('/org/login')
      }
    } catch (error) {
      console.log(error)
    }
  })

  //Delete a user session
router.get('/logout', checkOrg, (req, res)=> {
    delete req.session.org;
    res.redirect('/')
})

router.get('/', checkOrg, async (req, res) => {
    let { org } = res.locals;

    return res.render('org/index', {title: `${org.name} Scholarships`, page_name:"home", org})
})

router.get('/scholarships', checkOrg, async (req, res) => {
    let { org } = res.locals;

    let scholarships = await org.getScholarships();
    return res.render('org/scholarships', {title: `${org.name} Scholarships`, page_name: "scholarships", org, scholarships})
})

router.get('/scholarships/:id/edit', checkOrg, async (req, res) => {
    let { org } = res.locals;
    let { id } = req.params;

    let scholarship = await Scholarship.findByPk(id);

    return res.render('org/edit-scholarship', {title: `Edit ${scholarship.name}`, page_name: "scholarships", org, scholarship, states})
})


router.get('/scholarships/:id/applications', checkOrg, async (req, res) => {
    let { org } = res.locals;
    let { id } = req.params;

    let scholarship = await Scholarship.findByPk(id);

    let applications = await scholarship.getStudents()

    return res.render('org/application', {title: `${scholarship.name} Applications`, page_name: "scholarships", org, scholarship, applications})
})


router.get('/scholarships/new', checkOrg, async (req, res) => {
    return res.render('org/add-scholarship', {title: "Add New Scholarship", page_name: "new-scholarship", states})
})

router.get('/states/:state/locals', checkOrg, async (req, res) => {
    let { state } = req.params;

    let [ stateObj ] = states.filter(element => element.state.title == state);

    let { locals }= stateObj.state;

    return res.json(locals)
})

router.get('/scholarships/:id', checkOrg, async (req, res) => {
    let { id } = req.params;
    let { org } = res.locals;

    let scholarship = await scholarship.findOne({
        where: {
            id
        }
    })

    let students = await scholarship.getStudents();
    return res.render('org/single-scholarship', {title: `${org.name} Scholarships | ${scholarship.name} Scholarship`, org, scholarship, students})
})

router.post('/scholarships', checkOrg, async (req, res) => {
    let { org } = res.locals;
    let { name, details, deadline, cgpa, level, state, lga } = req.body;

    try {
        let restrictions = {cgpa,level,state,lga}
        let scholarship = await org.createScholarship({
            name,
            details,
            deadline,
            restrictions: JSON.stringify(restrictions)
        })
        
        if (scholarship) {
            return res.status(200).json({message: "Scholarship Added Successfully", scholarship})
        }
    } catch (error) {
        console.log(error)
    }
})

router.put('/scholarships/:id', checkOrg, async (req, res) => {
    let { org } = res.locals;
    let { id } = req.params;
    let { name, details, deadline, restrictions } = req.body;

    try {
        let scholarship = await scholarship.findOne({
            where: {
                id
            }
        })
    
        scholarship.name = name; scholarship.details = details; scholarship.deadline = deadline; scholarship.restrictions = JSON.stringify(restrictions);
    
        await scholarship.save()
        
        return res.status(200).json({message: "Scholarship Updated Successfully", scholarship})
    } catch (error) {
        console.log(error)
    }
})





module.exports = router