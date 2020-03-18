// var express = require("express");
// var router = express.Router();
var Router = require("express-promise-router");
var client = require("./elephantsql");

const router = new Router();

router.get("/api/get/test", (req, res) => {
  client.query(`SELECT * FROM test`, (q_err, q_res) => {
    console.log(q_res.rows);
    res.send(q_res.rows);
  });
});

router.get("/api/get/loginUser", (req, res, next) => {
  const creds = [req.query.username, req.query.password];
  client.query(
    `SELECT * FROM Actor WHERE username=$1 AND password=$2`,
    creds,
    (q_err, q_res) => {
      if (q_err) {
        return next(q_err);
      }
      res.json(q_res);
    }
  );
});

router.post("/api/post/registerUser", (req, res, next) => {
  const user = [req.body.username, req.body.password, req.body.accessRight];
  client.query(
    `INSERT into Actor(username, password, accessRight)
        VALUES($1, $2, $3)`,
    user,
    (q_err, q_res) => {
      if (q_err) {
        return next(q_err);
      }
      res.send(q_res);
    }
  );
});

router.put("/api/put/updateUser", (req, res, next) => {
  const user = [
    req.body.username,
    req.body.password,
    req.body.accessRight,
    req.body.userid
  ];
  client.query(
    `UPDATE Actor SET(username=$1, password=$2, accessRight=$3) WHERE userid=$4`,
    user,
    (q_err, q_res) => {
      if (q_err) {
        return next(q_err);
      }
      res.send(q_res);
    }
  );
});

module.exports = router;
