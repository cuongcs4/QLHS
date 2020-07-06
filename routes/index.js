var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('index', {
    title: 'Home'
  })
})

router.get('/profile', function(req, res, next){
  res.render('profile', {
    title: 'Profile'
  })
})

router.get('/table', function(req, res, next){
  res.render('table', {
    title: 'Table'
  })
})

router.get('/schedule', function(req, res, next){
  res.render('schedule', {
    title: 'Schedule'
  })
})

router.get('/login', function(req, res, next) {
  res.render('login', { 
    title: 'Login',
    style: 'sb-admin-2.min.css',
    layout: false
  })
});

router.post('/submit', function(req, res, next){
  
})

module.exports = router;
