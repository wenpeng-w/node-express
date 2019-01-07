let express = require('express');
let router = express.Router();

const utils = require('../utils/utils');

router.post('/info', (req, res) => {
  let name = req.body.name;
  let sql = `SELECT bk_id,bk_name,bk_author,bk_pic FROM bk_list WHERE bk_name='${name}'`;
  if (!name) {
    sql = `SELECT bk_id,bk_name,bk_author,bk_pic FROM bk_list`;
  }
  utils.query(sql, (err, result) => {
    if (err) {
      throw err
    } else {
      res.send({
        code: 200,
        data: result
      })
    }
  })
});

module.exports = router;
