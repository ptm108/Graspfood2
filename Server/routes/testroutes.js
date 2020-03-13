var express = require('express')
var router = express.Router()
var client = require('../main/elephantsql')

router.get('/api/get/test', (req, res) => {
    client.query(`SELECT * FROM test`, 
              (q_err, q_res) => {
                    res.json(q_res)
    })
  })


module.exports = router;