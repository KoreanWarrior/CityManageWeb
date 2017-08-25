var express = require('express');
var mysql_dbc = require('../config/db_con')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);
var router = express.Router();

function Result (resultCode, resultMessage) {
    this.resultCode = resultCode;
    this.resultMessage = resultMessage;
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', function(req, res, next) {
  var memberId = req.body.memberId;
  var memberPwd = req.body.memberPwd;

  var sqlQueryParam = [memberId,memberPwd];
  var sqlQuery = "select count(*) as count from member where member_id = ? and member_pwd = ? and member_delete_code='N'";
  connection.query(sqlQuery, sqlQueryParam, function (err, row, fields) {
    if(err){
      res.send('error');
    } else {

      var result = new Result();

      if(row[0].count === 1) {
        result.resultCode = '200';
        result.resultMessage = '로그인을 환영합니다.';
        console.log("test1");
        res.render('member/member_list');
      } else {
        result.resultCode = '500';
        result.resultMessage = '회원정보가 없습니다.';
        console.log("test2");
        res.render('index');
      }

    }
  });
});

router.get('/memberList', function(req, res, next) {
console.log("memberList list");
  var sqlQuery = "select * from member where member_delete_code='N'";
  connection.query(sqlQuery, function (err, row, fields) {

    console.log(row);
    if(err){
      res.render('error');
    } else {
      res.render('member/member_list',{"memberList":row});
    }
  });
});

router.get('/gmList', function(req, res, next) {
console.log("gm list");
  var sqlQuery = "select * from member where member_delete_code='N'";
  connection.query(sqlQuery, function (err, row, fields) {
    if(err){
      console.log(err);
      res.render('error');
    } else {
      console.log("Gm List Go");
      res.render('gm/gm_list');
    }
  });
});

router.get('/smList', function(req, res, next) {
console.log("sm list");
  var sqlQuery = "select * from member where member_delete_code='N'";
  connection.query(sqlQuery, function (err, row, fields) {
    if(err){
      res.render('error');
    } else {
      res.render('sm/sm_list');
    }
  });
});

router.get('/tmList', function(req, res, next) {
console.log("tm list");
  var sqlQuery = "select * from member where member_delete_code='N'";
  connection.query(sqlQuery, function (err, row, fields) {
    if(err){
      res.render('error');
    } else {
      res.render('tm/tm_list');
    }
  });
});

router.get('/wmList', function(req, res, next) {
console.log("wm list");
  var sqlQuery = "select * from member where member_delete_code='N'";
  connection.query(sqlQuery, function (err, row, fields) {
    if(err){
      res.render('error');
    } else {
      res.render('wm/wm_list');
    }
  });
});

router.get('/pushList', function(req, res, next) {
console.log("push list");
  var sqlQuery = "select * from member where member_delete_code='N'";
  connection.query(sqlQuery, function (err, row, fields) {
    if(err){
      res.render('error');
    } else {
      res.render('push/push_list');
    }
  });
});

module.exports = router;
