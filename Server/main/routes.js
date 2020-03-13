var express = require('express')
var router = express.Router()
var client = require('./elephantsql')

router.get('/api/get/test', (req, res) => {
    client.query(`SELECT * FROM test`, 
              (q_err, q_res) => {
                    console.log(q_res.rows)
                    res.send(q_res.rows)
    })
  })


module.exports = router;