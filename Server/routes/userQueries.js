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
  // console.log(req.query);
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

router.post("/api/post/registerUser", async (req, res, next) => {
  const user = [req.body.username, req.body.password, req.body.accessRight];
  console.log(user);

  try {
    await client.query("BEGIN");
    console.log("begun");
    await client.query(
      `INSERT into Actor(username, password, accessRight)
            VALUES($1, $2, $3)`,
      user,
      (q_err, q_res) => {
        if (q_err) {
          // console.log(q_err);
          res.send(q_err.detail);
        } else {
          // console.log(q_res);
        }
      }
    );

    const retrievedUser = await client.query(
      "SELECT * FROM Actor where username=$1",
      [req.body.username]
    );
    console.log(retrievedUser.rows[0].uid);

    if (req.body.accessRight === "1") {
      console.log("inserting restaurant staff");
      await client.query(
        `INSERT into RestaurantStaff(uid, rsName) VALUES ($1, $2)`,
        [retrievedUser.rows[0].uid, req.body.username],
        (q_err, q_res) => {
          if (q_err) console.log(q_err);
        }
      );
    }
    if (req.body.accessRight === "2") {
      console.log("inserting fds manager");
      await client.query(
        `INSERT into FDSManager(uid, fdsmName) VALUES ($1, $2)`,
        [retrievedUser.rows[0].uid, req.body.username],
        (q_err, q_res) => {
          if (q_err) console.log(q_err);
        }
      );
    }
    if (req.body.accessRight === "3") {
      console.log("inserting delivery rider");
      await client.query(
        `INSERT into DeliveryRider(uid, drname, isIdle, deliveryRiderRating, joinDate) VALUES ($1, $2, $3, $4, current_date)`,
        [retrievedUser.rows[0].uid, req.body.username, true, 0],
        (q_err, q_res) => {
          if (q_err) console.log(q_err);
        }
      );

      if (req.body.deliveryRiderType === "fulltime") {
        await client.query(
          `INSERT INTO FullTime(uid) VALUES ($1)`,
          [retrievedUser.rows[0].uid],
          (q_err, q_res) => {
            if (q_err) console.log(q_err);
          }
        );
      }

      if (req.body.deliveryRiderType === "parttime") {
        await client.query(
          `INSERT INTO PartTime(uid, totalWorkHours) VALUES ($1, $2)`,
          [retrievedUser.rows[0].uid, 0],
          (q_err, q_res) => {
            if (q_err) console.log(q_err);
          }
        );
      }
    }
    if (req.body.accessRight === "4") {
      console.log("inserting customer");
      await client.query(
        `INSERT into Customer(uid, cname, rewardPoints) VALUES($1, $2, $3)`,
        [retrievedUser.rows[0].uid, req.body.username, 0],
        (q_err, q_res) => {
          if (q_err) console.log(q_err);
        }
      );
    }

    await client.query("COMMIT", (q_err, q_res) => {
      if (q_res) {
        res.json(user);
      }
    });
    console.log("commited");
  } catch (error) {
    client.query("ROLLBACK", (q_err, q_res) => {
      console.log(q_res);
    });
    console.log("rollbacked");
  }
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
    req.body.expirydate
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

// order related
router.post("/api/post/postNewOrder", async (req, res, next) => {
  // console.log(req.body);
  const createNewOrderParams = [
    req.body.uid,
    req.body.rid,
    req.body.totalPrice,
    req.body.paymentMethod,
    req.body.address
  ];
  const addedFoodItems = req.body.addedFoodItems;
  // console.log(createNewOrderParams);
  console.log(addedFoodItems);

  try {
    await client.query("BEGIN");
    console.log("begun");
    const createNewOrderQuery = `INSERT INTO OrderPlaced(uid, rid, totalPrice, paymentMethod, address, timestamp, deliveryFee) VALUES ($1, $2, $3, $4, $5, NOW(), 4.50) RETURNING oid`;
    const response = await client.query(createNewOrderQuery, createNewOrderParams);

    const oid = response.rows[0].oid;
    const propagateContainsQuery = `INSERT INTO Contains(fid, oid, qty) VALUES ($1, $2, $3)`;

    addedFoodItems.forEach(async fooditem => {
      const containsParams = [fooditem.fooditem.fid, oid, fooditem.quantity];
      console.log(containsParams);
      await client.query(propagateContainsQuery, containsParams);
    });

    const findAvailRiderQuery = `SELECT * FROM DeliveryRider dr WHERE dr.isIdle = true LIMIT 1`;
    const result = await client.query(findAvailRiderQuery, []);
    // console.log(response);
    const dr = result.rows[0];

    const insertIntoDeliversQuery = `INSERT INTO Delivers(oid, uid, riderLeaveForRestaurantTime) VALUES ($1, $2, NOW())`;
    const deliversParams = [oid, dr.uid];
    await client.query(insertIntoDeliversQuery, deliversParams);

    await client.query("COMMIT", (q_err, q_res) => {
      if (q_res) {
        res.json({
          status: "SUCCESS",
          dr: dr,
          oid: oid
        });
      } else {
        res.json(q_err);
      }
    });
    console.log("commited");
  } catch (e) {
    await client.query("ROLLBACK", (q_err, q_res) => {
      res.json({
        status: "Problem sia"
      });
    });
    console.log("rollbacked");
    console.log(e);
  }
});

// fds info 1 (get new customers)
router.get("/api/get/newCustomers", (req, res, next) => {
  client.query(`SELECT * FROM customer c `, (q_err, q_res) => {
    if (q_err) {
      return next(q_err);
    }
    //console.log(q_res);
    res.send(q_res);
  });
});

// fds info 1 (get orders by month)
router.get("/api/get/ordersByMonth", (req, res, next) => {
  client.query(
    `SELECT oid, uid, rid, totalprice, deliveryfee, rewardpointsused, paymentmethod, address, 
      (SELECT EXTRACT(MONTH FROM orderplaced.timestamp)) as month from orderplaced`,
    (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        return next(q_err);
      }
      console.log(q_res);
      res.send(q_res);
    }
  );
});

module.exports = router;
