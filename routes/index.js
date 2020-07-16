var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('index', {
    title: 'Home',
    pagename: 'Home'
  })
})

router.get('/profile', function(req, res, next){
  res.render('profile', {
    title: 'Profile',
    style: 'styleProfile.css',
    pagename: 'Thông tin cá nhân'
  })
})

router.get('/studenttable', function(req, res, next){
  res.render('studentTable', {
    title: 'Student Table',
    style: 'styleTable.css',
    pagename: 'Danh sách học sinh'
  })
})
router.get('/classtable', function(req, res, next){
  res.render('classTable', {
    title: 'Class Table',
    style: 'styleTable.css',
    pagename: 'Danh sách lớp học'
  })
})

router.get('/examtable', function(req, res, next){
  res.render('examTable', {
    title: 'Exam Table',
    style: 'styleTable.css',
    pagename: 'Lịch thi'
  })
})
router.get('/resulttable', function(req, res, next){
  res.render('resultTable', {
    title: 'Kết quả học tập',
    style: 'styleTable.css',
    pagename: 'Kết quả học tập'
  })
})

router.get('/schedule', function(req, res, next){
  res.render('schedule', {
    title: 'Schedule',
    style: 'styleSchedule.css',
    pagename: 'Thời khoá biểu'
  })
})

router.get('/login', function(req, res, next) {
  res.render('login', { 
    title: 'Login',
    layout: false
  })
});

router.post('/submit', function(req, res, next){
  
})

module.exports = router;
