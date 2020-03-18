var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  return res.render('index', {title: "Welcome to Schapp", page_name: "home"})
});

router.get('/login', async(req, res) => {
  return res.render('student-login', {title: "Student Login", page_name: "login"})
})

module.exports = router;
