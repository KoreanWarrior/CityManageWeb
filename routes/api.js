var express = require('express');
var mysql_dbc = require('../config/db_con')();
var connection = mysql_dbc.init();
mysql_dbc.test_open(connection);

function Result (resultCode, resultMessage, memberId, memberName) {
    this.resultCode = resultCode;
    this.resultMessage = resultMessage;
}

Result.prototype.getInfo = function() {
    return this.resultCode + ' ' + this.resultMessage + ' result';
};

var router = express.Router();

/* 완료 */
router.get('/memberLogin.app', function(req, res, next) {
	//http://192.168.0.155:3000/memberRegister.app?memberId=test4&memberPwd=test4

  var reqParam = req.query;

  var sqlQueryParam = [reqParam.memberId, reqParam.memberPwd];
  var sqlQuery = "select count(*) as count from member where member_id = ? and member_pwd = ? and member_delete_code='N'";
  connection.query(sqlQuery, sqlQueryParam, function (err, row, fields) {
    if(err){
      res.send('error');
    } else {

      var result = new Result();

      if(row[0].count === 1) {
        result.resultCode = '200';
        result.resultMessage = '로그인을 환영합니다.';

      } else {
        result.resultCode = '500';
        result.resultMessage = '회원정보가 없습니다.';
      }
      res.statusCode = "200";
  		//res.setHeader('Content-Type', 'application/json;');
  		//res.end(JSON.stringify(result, null, 3));

		//console.log(JSON.parse(result));
		res.json(result);
    }
  });
});

/* 완료 */
router.get('/cityInfo.app', function(req, res, next) {
	//http://192.168.0.155:3000/cityInfo.app

  var reqParam = req.query;

  var sqlQueryParam = [reqParam.memberId, reqParam.memberPwd];
  var sqlQuery = 'select city_code cityCode, city_name cityName from address_city';
  connection.query(sqlQuery, sqlQueryParam, function (err, row, fields) {
    if(err){
      res.send('error');
    } else {

  		var result = new Result();
  		var dataLength = row.length;

      if(dataLength > 0) {
        res.statusCode = "200";
        res.setHeader('Content-Type', 'application/json; charset=utf-8');

        var cityStr = {"resultCode":"200", "resultMessage":"조회", "city":row};
        res.json(cityStr);


        } else {
          result.resultCode = '500';
          result.resultMessage = '시/도 정보 조회 실패 하였습니다.';
          res.json(result);
        }
    }
  });
});

/* 완료 */
router.get('/stateInfo.app', function(req, res, next) {
	//http://192.168.0.155:3000/stateInfo.app?cityCode=11

	var reqParam = req.query;

	var sqlQueryParam = [reqParam.cityCode];
	var sqlQuery = 'select state_code stateCode, state_name stateName from address_state where city_code = ?';
	connection.query(sqlQuery, sqlQueryParam, function (err, row, fields) {
	if(err){
	  res.send('error');
	} else {

		var result = new Result();

		res.statusCode = "200";
		res.setHeader('Content-Type', 'application/json; charset=utf-8');

		var stateStr = {"resultCode":"200", "resultMessage":"조회", "state":row};
		res.json(stateStr);
	}
  });
});

/* 준비중 */
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
      if(row.affectedRows === 1) {
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


/* 완료 */
router.get('/cityStateInfoRegister.app', function(req, res, next) {
  // http://192.168.0.155:3000/api/cityStateInfoRegister.app?memberId=test4&memberPwd=test4&cityGeoCode=01&stateGeoCode=02
  var reqParam = req.query;

  var memberId = reqParam.memberId;
  var memberPwd = reqParam.memberPwd;
  var cityCode = reqParam.cityCode;
  var stateCode = reqParam.stateCode;

  var sqlQueryParam = [cityCode, stateCode, memberId, memberPwd];
  var sqlQuery = "update member set"
                +" city_code=?, state_code=? where member_id=? and member_pwd=? ";
  connection.query(sqlQuery, sqlQueryParam, function (err, row, fields) {
    var result = new Result();

    if(err){
      result.resultCode = '500';
      result.resultMessage = '시스템 관리자에게 문의 하세요';
    } else {
      if(row.affectedRows === 1) {
        result.resultCode = '200';
        result.resultMessage = '회원 정보가 변경 되었습니다.';

      } else {
        result.resultCode = '400';
        result.resultMessage = '회원 정보 변경이 실패하였습니다.';
      }
    }
    res.statusCode = "200";
	res.setHeader('Content-Type', 'application/json; charset=utf-8');
	res.end(JSON.stringify(result, null, 3));
  });
});

router.get('/memberPwdConfirm.app', function(req, res, next) {
  var reqParam = req.query;

  var memberId = reqParam.memberId;
  var memberPwd = reqParam.memberPwd;
  
  var sqlQueryParam = [memberId, memberPwd];
  var sqlQuery = "select count(*) from where member_id=? and member_pwd=?";
  connection.query(sqlQuery, sqlQueryParam, function (err, row, fields) {
    var result = new Result();

    if(err){
      result.resultCode = '500';
      result.resultMessage = '시스템 관리자에게 문의 하세요';
    } else {
      if(row[0].count === 1) {
        result.resultCode = '200';
        result.resultMessage = '회원 정보가 확인 되었습니다.';

      } else {
        result.resultCode = '400';
        result.resultMessage = '회원 정보 확인이 실패하였습니다.';
      }
    }
    res.statusCode = "200";
	res.setHeader('Content-Type', 'application/json; charset=utf-8');
	res.end(JSON.stringify(result, null, 3));
  });
});

router.get('/memberPwdChange.app', function(req, res, next) {
  var reqParam = req.query;

  var memberId = reqParam.memberId;
  var memberPwd = reqParam.memberPwd;
  var memberChangePwd = reqParam.memberChangePwd;
  
  var sqlQueryParam = [memberChangePwd, memberId, memberPwd];
  var sqlQuery = "update member set member_pwd=? where member_id=? and member_pwd=? ";
  connection.query(sqlQuery, sqlQueryParam, function (err, row, fields) {
    var result = new Result();

    if(err){
      result.resultCode = '500';
      result.resultMessage = '시스템 관리자에게 문의 하세요';
    } else {
      if(row.affectedRows === 1) {
        result.resultCode = '200';
        result.resultMessage = '회원 정보가 변경 되었습니다.';

      } else {
        result.resultCode = '400';
        result.resultMessage = '회원 정보 변경이 실패하였습니다.';
      }
    }
    res.statusCode = "200";
	res.setHeader('Content-Type', 'application/json; charset=utf-8');
	res.end(JSON.stringify(result, null, 3));
  });
});

/* 미정 */
router.get('/memberProfileImageChange.app', function(req, res, next) {
  res.send('memberProfileImageChange.app');
});

/* 완료 */
router.get('/favoritesRegister.app', function(req, res, next) {
  	var reqParam = req.query;
	
	var memberId = reqParam.memberId;
	var manageId = reqParam.manageId;
	
	console.log(memberId);
	console.log(manageId);

	var sqlQueryParam = [manageId,memberId];
	var sqlQuery = "insert into favorites_info(manage_id, bookmark, member_id ) values(?, 'Y', ?)";
	connection.query(sqlQuery, sqlQueryParam, function (err, row, fields) {
		
	var result = new Result();
		
	if(err){
	  result.resultCode = '500';
      result.resultMessage = '시스템 관리자에게 문의 하세요';
	  console.log(err);
	  res.json(result);
	} else {

		var result = new Result();
		
		
		if(row.affectedRows === 1) {
			
			res.setHeader('Content-Type', 'application/json; charset=utf-8');
			result.resultCode = '200';
			result.resultMessage = '즐겨찾기 등록 되었습니다.';
			console.log(result);
			res.json(result);
		} else {
			result.resultCode = '500';
			result.resultMessage = '즐겨 찾기 등록에 실패 했습니다.';
			console.log(result);
			res.json(result);
		}
	}
  });
});

/* 완료 */
router.get('/favoritesList.app', function(req, res, next) {
  	var reqParam = req.query;
	
	var memberId = reqParam.memberId;
	var manageType = reqParam.manageType;
	
	var sqlQueryParam = [memberId,manageType];
	var sqlQuery = "select lm.manage_id manageId, " + 
	"(select city_name from address_city where city_code=lm.city_code) cityName , " + 
	"(select state_name from address_state where state_code=lm.state_code) stateName " +
	" from favorites_info fi right join location_management lm on fi.manage_id = lm.manage_id where fi.member_id=?";

	if(manageType !== "all") {
		sqlQuery += "and lm.manage_type=?";
	}
	
	connection.query(sqlQuery, sqlQueryParam, function (err, row, fields) {
				
	var result = new Result();
		
	if(err){
	  result.resultCode = '500';
      result.resultMessage = '시스템 관리자에게 문의 하세요';
	  res.json(result);
	} else {

		var result = new Result();
		var dataLength = row.length;
		
		res.statusCode = "200";
		res.setHeader('Content-Type', 'application/json; charset=utf-8');

		var stateStr = {"resultCode":"200", "resultMessage":"조회", "favoritesList":row};
		res.json(stateStr);
	}
  });
});

router.get('/pushRecordList.app', function(req, res, next) {
	
	
    var reqParam = req.query;
	
	var memberId = reqParam.memberId;
	
	var sqlQueryParam = [memberId];
	var sqlQuery = "select phi.sensor_id,phi.push_contents, phi.push_send_time, si.city_code, si.state_code "
				+ "from push_history_info phi "
				+ "join sensor_info si on phi.sensor_id = si.sensor_id "
				+ "join member m on si.city_code = m.city_code "
				+ "where m.member_id = ? ";
	
	connection.query(sqlQuery, sqlQueryParam, function (err, row, fields) {
				
	var result = new Result();
		
	if(err){
	  result.resultCode = '500';
      result.resultMessage = '시스템 관리자에게 문의 하세요';
	  res.json(result);
	} else {

		var result = new Result();
		
		res.statusCode = "200";
		res.setHeader('Content-Type', 'application/json; charset=utf-8');

		var stateStr = {"resultCode":"200", "resultMessage":"조회", "pushList":row};
		res.json(stateStr);
	}
  });
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
