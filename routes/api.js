var express = require('express');
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "192.168.0.155",
  user: "citymanage",
  password: "sjj",
  database:"citymanage"
});



var router = express.Router();

/* GET users listing. */
router.get('/memberLogin.app', function(req, res, next) {
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var sql = "select * from member";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
      res.json(result);
    });
  });
});

router.get('/memberRegister.app', function(req, res, next) {
  res.send('memberRegister.app');
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

router.get('/generousRegister.app', function(req, res, next) {
  res.send('generousRegister.app');
});

router.get('/stinkRegister.app', function(req, res, next) {
  res.send('stinkRegister.app');
});

router.get('/generousRegister.app', function(req, res, next) {
  res.send('generousRegister.app');
});

router.get('/flameDetectionRegister.app', function(req, res, next) {
  res.send('flameDetectionRegister.app');
});


router.get('/lockRegister.app', function(req, res, next) {
  res.send('lockRegister.app');
});

router.get('/flameDetectionRegister.app', function(req, res, next) {
  res.send('flameDetectionRegister.app');
});

router.get('/waterLevelRegister.app', function(req, res, next) {
  res.send('waterLevelRegister.app');
});

router.get('/waterQualityRegister.app', function(req, res, next) {
  res.send('waterQualityRegister.app');
});

router.get('/gasDensityRegister.app', function(req, res, next) {
  res.send('gasDensityRegister.app');
});

router.get('/shockDetectionNotice.app', function(req, res, next) {
  res.send('shockDetectionNotice.app');
});

router.get('/smokeDetectionNotice.app', function(req, res, next) {
  res.send('smokeDetectionNotice.app');
});

router.get('/operationStatusRegister.app', function(req, res, next) {
  res.send('operationStatusRegister.app');
});

router.get('/dangerRegister.app', function(req, res, next) {
  res.send('dangerRegister.app');
});

router.get('/pushActionRegister.app', function(req, res, next) {
  res.send('pushActionRegister.app');
});

router.get('/pushTokenRegister.app', function(req, res, next) {
  res.send('pushTokenRegister.app');
});

module.exports = router;
