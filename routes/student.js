var express = require('express');
var router = express.Router();

router.get('/examtable', function(req, res, next){
  res.render('student/examTable', {
    title: 'Exam Table',
    style: 'styleTable.css',
    pagename: 'Lịch thi'
  })
})
router.get('/resulttable', function(req, res, next){
  res.render('student/resultTable', {
    title: 'Kết quả học tập',
    style: 'styleTable.css',
    pagename: 'Kết quả học tập'
  })
})

router.get('/schedule', function(req, res, next){
  res.render('student/schedule', {
    title: 'Schedule',
    style: 'styleSchedule.css',
    pagename: 'Thời khoá biểu'
  })
})


router.post('/submit', function(req, res, next){
  
})

module.exports = router;
