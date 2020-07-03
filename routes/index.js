var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('index', {
    title: 'Home'
  })
})

router.get('/login', function(req, res, next) {
  res.render('login', { 
    title: 'Login',
    style: 'sb-admin-2.min.css'
  })
});

router.post('/submit', function(req, res, next){
  
})

module.exports = router;
