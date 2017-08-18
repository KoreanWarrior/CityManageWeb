var express = require('express');
var mysql_dbc = require('../config/db_con')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);

function Result (resultCode, resultMessage) {
    this.resultCode = resultCode;
    this.resultMessage = resultMessage;
}

Result.prototype.getInfo = function() {
    return this.resultCode + ' ' + this.resultMessage + ' result';
};

var router = express.Router();

/* GET users listing. */
router.get('/memberLogin.app', function(req, res, next) {

  var reqParam = req.query;

  var sqlQueryParam = [reqParam.memberId, reqParam.memberPwd];
  var sqlQuery = 'select count(*) as count from member where member_id = ? and member_pwd = ?';
  connection.query(sqlQuery, sqlQueryParam, function (err, row, fields) {
    if(err){
      res.send('error');
    } else {

      var result = new Result();

      console.log(row);
      console.log(row[0].count);

      if(row[0].count === 1) {
        result.resultCode = '200';
        result.resultMessage = '로그인을 환영합니다.';

      } else {
        result.resultCode = '500';
        result.resultMessage = '회원정보가 없습니다.';
      }
      res.statusCode = "200";
  		res.setHeader('Content-Type', 'application/json;');
  		res.end(JSON.stringify(result, null, 3));
    }
  });
});

router.get('/memberRegister.app', function(req, res, next) {
  // http://192.168.0.155:3000/memberRegister.app?memberId=test4&memberPwd=test4&memberPhone=01011111111&memberName=park&memberPhoto=jelly.jpg&memberEmail=bbcjswo@naver.com
  var reqParam = req.query;

  var memberId = reqParam.memberId;
  var memberPwd = reqParam.memberPwd;
  var memberName = reqParam.memberName;
  var memberPhone = reqParam.memberPhone;
  var memberPhoto = reqParam.memberPhoto;
  var memberEmail = reqParam.memberEmail;

  var sqlQueryParam = [memberId, memberPwd, memberName, memberPhone, memberPhoto, memberEmail];
  var sqlQuery = "insert into member("
                +"member_id,member_pwd,member_name,member_phone,member_email,member_photo,member_authorization) "
                +"values(?,?,?,?,?,?,'app_user')";
  connection.query(sqlQuery, sqlQueryParam, function (err, row, fields) {

    var result = new Result();
    if(err){
      result.resultCode = '500';
      result.resultMessage = '회원 가입이 실패하였습니다.';
    } else {
      if(row.insertId === 0) {
        result.resultCode = '200';
        result.resultMessage = '회원 가입이 되었습니다.';

      } else {
        result.resultCode = '500';
        result.resultMessage = '회원 가입이 실패하였습니다.';
      }
    }
    res.json(result);
  });
});

router.get('/cityStateInfoRegister.app', function(req, res, next) {
  // http://192.168.0.155:3000/api/cityStateInfoRegister.app?memberId=test4&memberPwd=test4&cityGeoCode=01&stateGeoCode=02
  var reqParam = req.query;

  var memberId = reqParam.memberId;
  var memberPwd = reqParam.memberPwd;
  var cityGeoCode = reqParam.cityGeoCode;
  var stateGeoCode = reqParam.stateGeoCode;

  var sqlQueryParam = [cityGeoCode, stateGeoCode, memberId, memberPwd  ];
  var sqlQuery = "update member set"
                +" city_geocode=?, state_geocode=? where member_id=? and member_pwd=? ";
  connection.query(sqlQuery, sqlQueryParam, function (err, row, fields) {
    var result = new Result();

    if(err){
      result.resultCode = '500';
      result.resultMessage = '시스템 관리자에게 문의 하세요';
    } else {
      if(row.insertId === 0) {
        result.resultCode = '200';
        result.resultMessage = '회원 가입이 되었습니다.';

      } else {
        result.resultCode = '400';
        result.resultMessage = '회원 가입이 실패하였습니다.';
      }
    }
    res.statusCode = "200";
		res.setHeader('Content-Type', 'application/json;');
		res.end(JSON.stringify(result, null, 3));
  });
});

router.get('/memberPwdConfirm.app', function(req, res, next) {
  res.send('memberPwdConfirm.app');
});

router.get('/memberPwdChange.app', function(req, res, next) {
  res.send('memberPwdChange.app');
});

router.get('/memberProfileImageChange.app', function(req, res, next) {
  res.send('memberProfileImageChange.app');
});

router.get('/favoritesList.app', function(req, res, next) {
  res.send('favoritesList.app');
});

router.get('/pushRecordList.app', function(req, res, next) {
  res.send('pushRecordList.app');
});

router.get('/wmList.app', function(req, res, next) {
  res.send('wmList.app');
});

router.get('/wmInfo.app', function(req, res, next) {
  res.send('wmInfo.app');
});

router.get('/tmList.app', function(req, res, next) {
  res.send('tmList.app');
});

router.get('/tmInfo.app', function(req, res, next) {
  res.send('tmInfo.app');
});

router.get('/gmList.app', function(req, res, next) {
  res.send('gmList.app');
});

router.get('/gmInfo.app', function(req, res, next) {
  res.send('gmInfo.app');
});

router.get('/smList.app', function(req, res, next) {
  res.send('smList.app');
});

router.get('/smInfo.app', function(req, res, next) {
  res.send('smInfo.app');
});

router.get('/smList.app', function(req, res, next) {
  res.send('smList.app');
});

router.get('/favoritesRegister.app', function(req, res, next) {
  res.send('favoritesRegister.app');
});

router.get('/sensorInfoRegister.app', function(req, res, next) {
  res.send('sensorInfoRegister.app');
});

router.get('/operationStatusRegister.app', function(req, res, next) {
  res.send('operationStatusRegister.app');
});

router.get('/pushActionRegister.app', function(req, res, next) {
  res.send('pushActionRegister.app');
});

router.get('/pushTokenRegister.app', function(req, res, next) {
  res.send('pushTokenRegister.app');
});

module.exports = router;
