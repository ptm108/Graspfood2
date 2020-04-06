var express = require("express");
var router = express.Router();
var client = require("../main/elephantsql");

// var Router = require("express-promise-router");
// const router = new Router();

router.get("/api/get/test", (req, res) => {
  client.query(`SELECT * FROM actor`, (q_err, q_res) => {
    console.log(q_res);
    console.log(q_err);
  });
});

router.get("/api/get/loginUser", (req, res, next) => {
  const creds = [req.query.username, req.query.password];
  //console.log(req.query);
  client.query(
    `SELECT * FROM Actor WHERE username = $1 AND password = $2`,
    creds,
    (q_err, q_res) => {
      if (q_err) {
        return next(q_err);
      }
      if (q_res.rows[0]) {
        res.json(q_res);
      }
      //console.log(q_res);
      return next(q_err);
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
        console.log(q_err);
        res.send(q_err.detail);
      } else {
        console.log(q_res);
        res.json(user);
      }
    }
  );
});

router.put("/api/put/updateUser", (req, res, next) => {
  const user = [
    req.body.username,
    req.body.password,
    req.body.accessRight,
    req.body.userid,
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

router.put("/api/put/changePassword", (req, res, next) => {
  const user = [req.body.uid, req.body.password];
  console.log(req.body);
  client.query(
    `UPDATE actor SET password=$2 WHERE uid=$1`,
    user,
    (q_err, q_res) => {
      if (q_err) {
        return next(q_err);
      } else {
        res.json(q_res);
      }
    }
  );
});

router.get("/api/get/orderList", (req, res, next) => {
  client.query(`SELECT * from contains;`, (q_err, q_res) => {
    if (q_err) {
      return next(q_err);
    }
    //console.log(q_res);
    res.send(q_res);
  });
});

router.get("/api/get/restaurantList", (req, res, next) => {
  client.query(`SELECT * from restaurant;`, (q_err, q_res) => {
    if (q_err) {
      return next(q_err);
    }
    console.log(q_res);
    res.send(q_res);
  });
});

router.get("/api/get/creditcard", (req, res, next) => {
  const creds = [req.query.uid];
  console.log(req.query);
  console.log(req.query.uid);
  client.query(
    `SELECT * FROM creditcard WHERE uid = $1`,
    creds,
    (q_err, q_res) => {
      if (q_err) {
        return next(q_err);
      }
      if (q_res.rows[0]) {
        res.json(q_res);
      }
      console.log(q_res);
      return next(q_err);
      //console.log(q_res);
      //res.send(q_res);
    }
  );
});

router.post("/api/post/addCreditCard", (req, res, next) => {
  const creditcard = [
    req.body.uid,
    req.body.cardnumber,
    req.body.cardholdername,
    req.body.expirydate,
  ];
  console.log(req.body);
  client.query(
    `INSERT into creditcard(uid, ccnumber, cardholdername, expirydate)
          VALUES($1, $2, $3, $4)`,
    creditcard,
    (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        res.send(q_err.detail);
      } else {
        console.log(q_res);
        res.json(creditcard);
      }
    }
  );
});

router.delete("/api/delete/deleteCreditCard", (req, res, next) => {
  const user = [req.body.uid];
  console.log(req.body);
  client.query(`DELETE FROM creditcard WHERE uid=$1`, user, (q_err, q_res) => {
    if (q_err) {
      return next(q_err);
    } else {
      res.json(q_res);
    }
  });
});

router.get("/api/get/fetchFoodItemsByRid", (req, res, next) => {
  // console.log(req.query);
  const rid = [req.query.rid];
  client.query(`SELECT * FROM fooditem WHERE rid=$1 `, rid, (q_err, q_res) => {
    if (q_err) {
      return next(q_err);
    }
    if (q_res.rows[0]) {
      res.json(q_res);
    }
    return next(q_err);
  });
});

router.get("/api/get/customerDetails", (req, res, next) => {
  console.log(req.query);
  const uid = [req.query.uid];
  client.query(
    `SELECT cname, rewardpoints FROM customer WHERE uid=$1`,
    uid,
    (q_err, q_res) => {
      if (q_err) {
        return next(q_err);
      }
      if (q_res.rows[0]) {
        res.json(q_res);
      }
      return next(q_err);
    }
  );
});

router.get("/api/get/riderDetails", (req, res, next) => {
  console.log(req.query);
  const uid = [req.query.uid];
  client.query(
    `SELECT * FROM deliveryrider WHERE uid=$1`,
    uid,
    (q_err, q_res) => {
      if (q_err) {
        return next(q_err);
      }
      if (q_res.rows[0]) {
        res.json(q_res);
      }
      return next(q_err);
    }
  );
});

router.get("/api/get/riderSalary", (req, res, next) => {
  //console.log(req.query);
  const uid = [req.query.uid];
  client.query(
    `WITH main AS (SELECT uid, monthlybasesalary, null as weeklybasesalary, null as totalworkhours FROM fulltime
    union SELECT uid, null as monthlybasesalary, weeklybasesalary, totalworkhours FROM parttime)
    SELECT * from main natural join deliveryrider where uid=$1`,
    uid,
    (q_err, q_res) => {
      if (q_err) {
        return next(q_err);
      }
      if (q_res.rows[0]) {
        res.json(q_res);
      }
      return next(q_err);
    }
  );
});

router.get("/api/get/deliverOrders", (req, res, next) => {
  console.log(req.query);
  const uid = [req.query.uid];
  client.query(
    `select * from orderplaced o full join delivers d on o.oid = d.oid where d.uid=$1`,
    uid,
    (q_err, q_res) => {
      if (q_err) {
        return next(q_err);
      }
      if (q_res.rows[0]) {
        res.json(q_res);
      }
      return next(q_err);
    }
  );
});

module.exports = router;
