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
    `SELECT * FROM Actor a
    NATURAL LEFT JOIN Customer c 
    NATURAL LEFT JOIN DeliveryRider dr
    NATURAL LEFT JOIN FDSManager fm 
    NATURAL LEFT JOIN RestaurantStaff rs 
    WHERE a.username = $1 
    AND a.password = $2`,
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
      let response = await client.query(
        `SELECT count(*) FROM Restaurant WHERE rid = $1`,
        [req.body.restaurantId]
      );
      let count = response.rows[0].count;
      console.log(count);
      if (count !== "0") {
        await client.query(
          `INSERT into RestaurantStaff(uid, rsName, rid) VALUES ($1, $2, $3)`,
          [retrievedUser.rows[0].uid, req.body.username, req.body.restaurantId],
          (q_err, q_res) => {
            if (q_err) console.log(q_err);
          }
        );
      } else {
        throw "Restaurant does not exist!";
      }
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
    res.json(error);
    console.log("rollbacked");
  }
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
  console.log("orderlist");
  const uid = [req.query[0]];
  // console.log(req);
  client.query(
    `SELECT * from orderplaced op where op.uid = $1 ORDER BY timestamp DESC LIMIT 10;`,
    uid,
    (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
      }
      //console.log(q_res);
      res.json(q_res);
    }
  );
});

router.get("/api/get/restaurantList", (req, res, next) => {
  client.query(`SELECT * from restaurant ORDER BY rid;`, (q_err, q_res) => {
    if (q_err) {
      return next(q_err);
    }
    // console.log(q_res);
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
        // console.log(q_err);
        res.json({
          status: "ERROR",
          msg: q_err,
        });
      } else {
        // console.log(q_res);
        res.json({
          status: "SUCCESS",
          msg: q_res,
        });
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

router.get("/api/get/reviews", (req, res, next) => {
  const uid = [req.query.uid];
  client.query(
    `select * from reviews where uid=$1 order by timestamp desc`,
    uid,
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

router.post("/api/post/createFoodItem", (req, res, next) => {
  // console.log(req.body);
  const newFoodItemParams = [
    req.body.rid,
    req.body.fname,
    parseFloat(req.body.price),
    req.body.description,
    req.body.category,
    0,
    parseInt(req.body.dailylimit) || 1000,
  ];

  client.query(
    `INSERT INTO FoodItem (rid, fname, price, description, category, currentnumoforders, dailylimit)
  VALUES($1, $2, $3, $4, $5, $6, $7)`,
    newFoodItemParams,
    (q_err, q_res) => {
      if (q_err) {
        res.json({
          status: "ERROR",
          msg: q_err,
        });
      } else {
        res.json({
          status: "SUCCESS",
          msg: "Item created",
        });
      }
    }
  );
});

router.post("/api/post/createPromo", (req, res, next) => {
  console.log(req.body);
  const newPromoParams = [
    req.body.rid,
    parseFloat(req.body.minSpending) || 0,
    parseInt(req.body.percentagediscount),
    parseInt(req.body.maxcustomercount),
    req.body.startdate,
    req.body.enddate,
    req.body.promocode,
  ];
  console.log(newPromoParams);

  client.query(
    `INSERT INTO Promotion (rid, minspending, percentdiscount, maxcustomercount, startdate, enddate, promocode)
  VALUES($1, $2, $3, $4, $5, $6, $7)`,
    newPromoParams,
    (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        res.json({
          status: "ERROR",
          msg: q_err,
        });
      } else {
        res.json({
          status: "SUCCESS",
          msg: "Item created",
        });
      }
    }
  );
});

router.delete("/api/delete/deleteFoodItem", (req, res, next) => {
  console.log(req.query.fid);
  const fid = [req.query.fid];
  client.query(`DELETE FROM FoodItem WHERE fid = $1`, fid, (q_err, q_res) => {
    if (q_err) {
      res.json({
        status: "ERROR",
      });
    } else {
      res.json({
        status: "SUCCESS",
      });
    }
  });
});

router.delete("/api/delete/deletePromo", (req, res, next) => {
  console.log(req.query.pid);
  const pid = [req.query.pid];
  client.query(`DELETE FROM Promotion WHERE pid = $1`, pid, (q_err, q_res) => {
    if (q_err) {
      res.json({
        status: "ERROR",
      });
    } else {
      res.json({
        status: "SUCCESS",
      });
    }
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
    `WITH main AS (SELECT uid, monthlybasesalary, null as weeklybasesalary FROM fulltime
    union SELECT uid, null as monthlybasesalary, weeklybasesalary FROM parttime)
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

router.get("/api/get/weeklyWorkHours", (req, res, next) => {
  //console.log(req.query);
  const uid = [req.query.uid];
  client.query(
    `SELECT sum(hours), extract(month from timestamp) as month, extract(week from timestamp) as week 
    FROM works where uid=$1 group by extract(month from timestamp), extract(week from timestamp) order by month, week`,
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
    `select count(o.oid), sum(deliveryfeecommission), extract(month from timestamp) as month, extract(week from timestamp) as week, 
    extract(week from CURRENT_TIMESTAMP) as current from orderplaced o full join delivers d on o.oid = d.oid 
    where d.uid=$1 group by extract(month from timestamp), extract(week from timestamp) order by week`,
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

/*

Order Related


*/
// order related
router.post("/api/post/postNewOrder", async (req, res, next) => {
  // console.log(req.body);
  const createNewOrderParams = [
    req.body.uid,
    req.body.rid,
    req.body.totalPrice,
    req.body.paymentMethod,
    req.body.address,
    req.body.postalcode,
    parseInt(req.body.rewardpoints) || 0,
    req.body.promocode,
    4.5,
  ];
  const uid = req.body.uid;
  const rewardPointsUsed = parseInt(req.body.rewardpoints);
  const addedFoodItems = req.body.addedFoodItems;
  const promocode = req.body.promocode;
  console.log(createNewOrderParams);
  // console.log(addedFoodItems);

  try {
    await client.query("BEGIN");
    console.log("begun");

    // get user reward points
    const getUserRewardPoints = `SELECT * from customer c where c.uid = $1`;
    const response2 = await client.query(getUserRewardPoints, [uid]);
    // console.log(response2);
    const currRewardPoints = response2.rows[0].rewardpoints;
    const customer = response2.rows[0];
    console.log(currRewardPoints);
    console.log(customer);

    if (rewardPointsUsed !== "" && rewardPointsUsed > currRewardPoints) {
      throw "Not enough points";
    }

    let promotion = await client.query(
      `SELECT * FROM Promotion WHERE promocode = $1`,
      [promocode]
    );
    promotion = promotion.rows[0];
    console.log(promotion);

    if (promotion) {
      if (promotion.customertype === "OLD CUSTOMER") {
        let result = await client.query(
          `SELECT count(*) FROM OrderPlaced 
      WHERE uid = $1
      AND timestamp > current_date - integer '90'`,
          [uid]
        );
        let count = result.rows[0].count;
        if (count > 0) {
          throw "Promo Code does not apply!";
        }
      } else if (promotion.customertype === "NEW CUSTOMER") {
        let result = await client.query(
          `SELECT count(*) FROM OrderPlaced 
      WHERE uid = $1`,
          [uid]
        );
        let count = result.rows[0].count;
        if (count > 0) {
          throw "Promo Code does not apply!";
        }
      } else if (promotion.currcustomercount > promotion.maxcustomercount) {
        throw "Promo code sold out!";
      } else if (promotion.percentdiscount === null) {
        createNewOrderParams.pop();
        createNewOrderParams.push(0);
      }
    }

    const d = new Date();
    // console.log(d.getHours());
    if (d.getHours() < 10 || d.getHours() > 22) {
      throw "FDS is closed...";
    }

    // insert into orders placed
    const createNewOrderQuery = `INSERT INTO OrderPlaced(uid, rid, totalPrice, paymentMethod, address, timestamp, deliveryFee, postalcode, rewardpointsused, promocode) 
    VALUES ($1, $2, $3, $4, $5, NOW() + interval '8 hours', $9, $6, $7, $8) 
    RETURNING oid`;
    const response = await client.query(
      createNewOrderQuery,
      createNewOrderParams
    );

    const oid = response.rows[0].oid;
    const propagateContainsQuery = `INSERT INTO Contains(fid, oid, qty) VALUES ($1, $2, $3)`;

    addedFoodItems
      .filter((f) => f.fooditem.fid > 0)
      .forEach(async (fooditem) => {
        const containsParams = [fooditem.fooditem.fid, oid, fooditem.quantity];
        // console.log(containsParams);
        await client.query(propagateContainsQuery, containsParams);
      });

    const findAvailRiderQuery = `SELECT * FROM DeliveryRider dr 
    NATURAL JOIN Works w
    WHERE dr.isIdle = true 
    AND w.dayno = EXTRACT(DOW from NOW())
    AND $1 <= w.endno
    AND $1 >= w.startno
    LIMIT 1`;
    const result = await client.query(findAvailRiderQuery, [d.getHours()]);
    console.log(result);
    const dr = result.rows[0];

    // throw "Testing...";

    if (result.rows.length === 0) {
      throw "All our Riders are busy currently..";
    }

    const insertIntoDeliversQuery = `INSERT INTO Delivers(oid, uid, deliveryfeecommission, riderLeaveForRestaurantTime) VALUES ($1, $2, $3, NOW() + interval '8 hours')`;
    const deliversParams = [oid, dr.uid, req.body.totalPrice * 0.05];
    await client.query(insertIntoDeliversQuery, deliversParams);

    await client.query("COMMIT", (q_err, q_res) => {
      if (q_res) {
        res.json({
          status: "SUCCESS",
          dr: dr,
          oid: oid,
        });
      } else {
        res.json(q_err);
      }
    });
    console.log("commited");
  } catch (e) {
    await client.query("ROLLBACK", (q_err, q_res) => {
      res.json({
        status: "Problem sia",
        msg: e,
      });
    });
    console.log("rollbacked");
    console.log(e);
  }
});

router.get("/api/get/orderDetails", async (req, res, next) => {
  const oid = [parseInt(req.query[0])];
  console.log(oid[0]);

  try {
    await client.query("BEGIN");

    let response = await client.query(
      `SELECT * FROM OrderPlaced op 
      JOIN Delivers d ON op.oid = d.oid
      WHERE op.oid = $1`,
      oid
    );
    const order = response.rows[0];
    console.log(order);

    response = await client.query(
      `SELECT * FROM Contains c NATURAL JOIN Fooditem WHERE c.oid = $1`,
      oid
    );
    // console.log(response);
    const fooditems = response.rows;

    response = await client.query(`SELECT uid FROM Delivers WHERE oid=$1`, oid);
    const drId = response.rows[0].uid;
    // console.log(drId);

    response = await client.query(`SELECT * from DeliveryRider WHERE uid=$1`, [
      drId,
    ]);
    // console.log(response)
    const dr = response.rows[0];

    await client.query("COMMIT", (q_err, q_res) => {
      if (q_res) {
        res.json({
          status: "SUCCESS",
          order: order,
          fooditems: fooditems,
          deliveryRider: dr,
        });
      }
    });
    console.log("commited");
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK");
    res.json({
      status: "ERROR",
      msg: error,
    });
    console.log("rolled back");
  }
});

router.get("/api/get/retrievePromoCodes", async (req, res, next) => {
  // console.log(req);
  const rid = [req.query[0]];
  console.log(rid);
  await client.query(
    `SELECT * FROM Promotion 
  WHERE rid = $1
  OR rid is null
  AND startDate < current_date
  AND endDate > current_date`,
    rid,
    (q_err, q_res) => {
      if (q_err) {
        // console.log(q_err);
        res.json(q_err);
      } else {
        // console.log(q_res);
        res.json(q_res);
      }
    }
  );
});

router.get("/api/get/getCurrentOrderByDrid", async (req, res, next) => {
  // console.log(req);
  const drid = [req.query[0]];
  console.log(drid);

  let response = await client.query(
    `SELECT * FROM OrderPlaced op 
  JOIN Delivers d 
  ON op.oid = d.oid
  JOIN DeliveryRider dr
  ON dr.uid = d.uid
  WHERE d.uid = $1
  ORDER BY timestamp DESC
  LIMIT 1`,
    drid,
    (q_err, q_res) => {
      // console.log(q_res)
      res.json(q_res.rows[0]);
    }
  );
  // console.log(response.rows[0]);
});

router.put(
  "/api/put/updateDeliversArriveRestaurant",
  async (req, res, next) => {
    const oid = [req.body.params];
    console.log(oid);

    client.query(
      `UPDATE Delivers 
    SET riderarriveatrestauranttime = NOW() + interval '8 hours'
    WHERE oid = $1`,
      oid,
      (q_err, q_res) => {
        if (q_err) {
          res.json(q_err);
        } else {
          res.json(q_res);
        }
      }
    );
  }
);

router.put("/api/put/updateDeliversLeftRestaurant", async (req, res, next) => {
  const oid = [req.body.params];
  console.log(oid);

  client.query(
    `UPDATE Delivers 
  SET riderleaverestauranttime = NOW() + interval '8 hours'
  WHERE oid = $1`,
    oid,
    (q_err, q_res) => {
      if (q_err) {
        res.json(q_err);
      } else {
        res.json(q_res);
      }
    }
  );
});

router.put("/api/put/updateDeliveredTime", async (req, res, next) => {
  const oid = [req.body.params];
  console.log(oid);

  client.query(
    `UPDATE Delivers 
  SET riderdelivertime = NOW() + interval '8 hours'
  WHERE oid = $1`,
    oid,
    (q_err, q_res) => {
      if (q_err) {
        res.json(q_err);
      } else {
        res.json(q_res);
      }
    }
  );
});

/*


Review related Queries

*/

// create new review
router.post("/api/post/createReview", (req, res, next) => {
  const reviewValues = [
    req.body.oid,
    req.body.uid,
    req.body.reviewTitle,
    req.body.reviewDesc,
    req.body.rating,
  ];
  console.log(reviewValues);

  client.query(
    `INSERT INTO Reviews(oid, uid, title, description, rating, timestamp) 
          VALUES ($1, $2, $3, $4, $5, NOW() + interval '8 hours') 
          ON CONFLICT (oid, uid) DO 
          UPDATE SET 
          title = $3,
          description = $4,
          rating = $5`,
    reviewValues,
    (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        res.json({
          status: "ERROR",
        });
      } else {
        res.json({
          status: "SUCCESS",
        });
      }
    }
  );
});

router.put("/api/put/putRiderReview", (req, res, next) => {
  const reviewValues = [req.body.oid, req.body.drRating];
  console.log(reviewValues);

  client.query(
    `UPDATE Delivers
    SET deliveryServiceRating = $2
    WHERE oid = $1`,
    reviewValues,
    (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        res.json({
          status: "ERROR",
        });
      } else {
        res.json({
          status: "SUCCESS",
        });
      }
    }
  );
});

/*

FDS Summary related queries


*/
// fds info 1 (get all customers)
router.get("/api/get/allCustomers", (req, res, next) => {
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
    `SELECT oid, uid, rid, totalprice, deliveryfee,
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

// fds info 2 (get orders by customer)
router.get("/api/get/ordersByCustomer", (req, res, next) => {
  client.query(
    `SELECT uid, sum(totalprice + deliveryfee), count(*), 
      (SELECT EXTRACT(MONTH FROM orderplaced.timestamp)) as month, cname from orderplaced natural join customer group by uid, cname, month`,
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

// fds infor 3 (get all orders)
router.get("/api/get/allOrders", (req, res, next) => {
  client.query(
    `SELECT oid, uid, timestamp, EXTRACT(HOUR FROM orderplaced.timestamp) as hour, postalcode from orderplaced`,
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

// fds info 4 (get all riders' deliveries info)
router.get("/api/get/allRiderDeliveriesInfo", (req, res, next) => {
  client.query(
    `SELECT count(oid) as numorders, dr.uid, drname, sum(deliveryfeecommission) as fee, 
      avg(extract(minute from(riderdelivertime - riderleaveforrestauranttime))) as delivertime, count(deliveryservicerating) as numratings, 
      avg(deliveryservicerating) as avgrating, extract(month from riderleaveforrestauranttime) as month 
      from delivers d right join deliveryrider dr on d.uid = dr.uid group by dr.uid, month order by drname, month`,
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

// fds info 4 (get all riders work hours)
router.get("/api/get/allRiderWorkHours", (req, res, next) => {
  client.query(
    `SELECT uid, sum(hours), extract(month from timestamp) as month
    FROM works group by uid, extract(month from timestamp) order by month`,
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

// fds infor 4 (get all riders' details eg. base salary)
router.get("/api/get/allRiderDetails", (req, res, next) => {
  client.query(
    `WITH main AS (SELECT uid, monthlybasesalary, null as weeklybasesalary FROM fulltime
    union SELECT uid, null as monthlybasesalary, weeklybasesalary FROM parttime)
    SELECT * from main natural join deliveryrider`,
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

// restaurantStaff info 1 (get restaurant details)
router.get("/api/get/restaurantDetails", (req, res, next) => {
  const uid = [req.query.uid];
  //console.log(req.query);
  client.query(
    `SELECT * FROM restaurant natural join restaurantstaff where uid=$1`,
    uid,
    (q_err, q_res) => {
      if (q_err) {
        // console.log(q_err);
        return next(q_err);
      }
      // console.log(q_res);
      res.send(q_res);
    }
  );
});

// restaurantStaff info 1 (get restaurant total orders and cost)
router.get("/api/get/totalOrdersAndCost", (req, res, next) => {
  const rid = [req.query.rid];
  //console.log(req.query);
  client.query(
    `SELECT count(oid), extract(month from timestamp) as month, sum(totalprice) from orderplaced where rid=$1 
      group by extract(month from timestamp)`,
    rid,
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

// restaurantStaff info 1 (get restaurant top 5 food items)
router.get("/api/get/topFiveFood", (req, res, next) => {
  const rid = [req.query.rid];
  client.query(
    `select fname, count(fname), extract(month from timestamp) as month from contains natural join orderplaced natural join fooditem 
    where rid=$1 group by fname, extract(month from timestamp) order by count(fname) desc limit 5`,
    rid,
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

// restaurantStaff info 2 (get restaurant promo details)
router.get("/api/get/promoDetails", (req, res, next) => {
  const rid = [req.query.rid];
  console.log(req.query);
  client.query(
    `SELECT count(oid), pid, (enddate - startdate) as days, p.promocode FROM orderplaced o right join promotion p on o.promocode = p.promocode 
      where p.rid=$1 group by pid`,
    rid,
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

/*


WORKS TABLE Related!!


*/

router.get("/api/get/getDRSchedule", (req, res, next) => {
  // console.log(req.query);
  const uid = [req.query.uid];
  console.log(uid);

  client.query(
    `SELECT * FROM Works 
  WHERE uid = $1
  AND extract(week from timestamp) = extract(week from NOW())`,
    uid,
    (q_err, q_res) => {
      if (q_err) {
        res.json(q_err);
      } else {
        res.json(q_res);
      }
    }
  );
});

router.post("/api/post/addDRSchedule", async (req, res, next) => {
  // console.log(req.body);
  let newScheduleParams = [
    req.body.uid,
    parseInt(req.body.dayNo),
    parseInt(req.body.startNo),
    parseInt(req.body.endNo),
    // parseInt(req.body.endNo) - parseInt(req.body.startNo),
  ];
  console.log(newScheduleParams);

  let response = await client.query(
    `SELECT * FROM Works 
    WHERE $1 = uid
    AND $2 = dayno
    AND extract(week from timestamp) = extract(week from NOW())
    AND (($3 <= endno AND $4 >= startno) OR ($3 <= endno AND $4 >= startno)) 
    `,
    newScheduleParams
  );

  if (response.rows.length > 0) {
    res.json({
      status: "ERROR",
      msg: "Conflict",
    });
    return;
  }

  newScheduleParams = [
    ...newScheduleParams,
    parseInt(req.body.endNo) - parseInt(req.body.startNo),
  ];
  console.log(newScheduleParams);

  try {
    await client.query("BEGIN");
    await client.query(
      `INSERT INTO Works (uid, dayno, startno, endno, hours, timestamp)
    VALUES ($1, $2, $3, $4, $5, NOW() + interval '8 hours')`,
      newScheduleParams,
      (q_err, q_res) => {
        if (q_err) {
          throw q_err;
        } else {
          res.json({
            status: "SUCCESS",
          });
        }
      }
    );
    await client.query(`UPDATE DeliveryRider 
    SET timeforscheduleupdate = NOW() + interval '8 hours'
    WHERE uid = $1`,
      [req.body.uid]
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    res.json({
      status: "Rolled back",
      msg: error,
    });
  }
});

router.delete("/api/post/deleteDRSchedule", async (req, res, next) => {
  // console.log(req.query);

  let deleteParams = [
    parseInt(req.query.dayNo),
    parseInt(req.query.startNoDel),
    parseInt(req.query.endNoDel),
  ];
  console.log(deleteParams);

  let response = await client.query(
    `SELECT has_5_rider_per_hour($1, $2, $3)`,
    deleteParams
  );
  response = response.rows[0].has_5_rider_per_hour;
  console.log(response);

  if (!response) {
    res.json({
      status: "ERROR",
      msg: "There is not enough riders",
    });
    return;
  }

  deleteParams = [...deleteParams, req.query.uid];
  console.log(deleteParams);

  await client.query(
    `DELETE FROM Works 
  WHERE dayno = $1
  AND startno = $2
  AND endno = $3
  AND uid = $4
  AND EXTRACT(week from timestamp) = EXTRACT(week from NOW() + interval '8)`,
    deleteParams,
    (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
        res.json({
          status: "ERROR",
          msg: "Something went wrong",
        });
      } else {
        res.json({
          status: "SUCCESS",
        });
      }
    }
  );
});

module.exports = router;
