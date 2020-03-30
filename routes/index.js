var express = require('express');
var router = express.Router();
var { checkStudent } = require('../middlewares')
var { Op } = require('sequelize');
var models = require('../models'); // loads index.js
var { Scholarship,Application,Student } = models;       // the model keyed by its name

/* GET home page. */
router.get('/', async (req, res) => {
  if (req.session.student) {
    let matric = req.session.student;

    try {
      let student = await Student.findOne({
        where: {
          matric
        }
      }) 
      res.locals.student = req.session.student
      return res.render('student-index', {title: "Dashboard", page_name: "home", student})
    } catch (error) {
      console.log(error)
    }
  }
  
  else {
    return res.render('index', {title: "Welcome to schAppp", page_name: "home", student: null})
  }
  
});

router.get('/login', async(req, res) => {
  let { matric } = req.query;

  return res.render('student-login', {title: "Student Login", page_name: "login", matric})
})

router.post('/login', async (req, res) => {
  let { matric, email} = req.body
  try {
    let check = await Student.findOne({
      where: {
        matric,email
      }
    })

    if (check) {
      req.session.student = check.matric;
      res.redirect('/')
    }
    else {
      res.redirect('/login')
    }
  } catch (error) {
    console.log(error)
  }
})

router.get('/logout', checkStudent, (req, res)=> {
  delete req.session.student;
  res.redirect('/')
})

router.post('/profile/modifyAccount/:id', checkStudent, async (req, res) => {
  let { nuban, bank } = req.body;
  let { id } = req.params;

  try {
    let student = await Student.findByPk(id)

    student.nuban = nuban;
    student.bank = bank

    await student.save()

    return res.json({message: "Account Details modified successfully!"})
  } catch (error) {
    console.error(error)
  }
})

router.get('/notifications', checkStudent, async (req, res) => {
  let { student } = res.locals;

  let scholarships = await Scholarship.findAll();

  scholarships = scholarships.filter(element => {
    restrictions = JSON.parse(element.restrictions);
    if ((student.cgpa >= restrictions.cgpa || restrictions.cgpa == "Any") && (student.level >= restrictions.level || restrictions.level == "Any") && (student.state == restrictions.state || restrictions.state == "Any") && (student.lga == restrictions.lga || restrictions.lga == "Any")) {
      return element
    }
  })

  scholarships.sort((a,b) => {
    if (a.createdAt < b.createdAt) {
      return -1
    }
    else if (a.createdAt > b.createdAt) {
      return 1
    }
    else {
      return 0
    }
  })

  return res.render('notifications', {title: "Notifications", page_name: "notifications", notifications: scholarships})
})


router.get('/profile', checkStudent, async (req, res) => {
  let { student } = res.locals;

  return res.render('student-profile', {title: "Student Profile", page_name: "profile", student})
})





module.exports = router;
