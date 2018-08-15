let express = require('express');
let router = express.Router();

const query = require('../utils/utils');

router.get('/book', (req, res) => {
  let id = req.query.id;
  let name = req.query.name;
  let sql = `SELECT bk_id,bk_name,bk_author,bk_pic FROM bk_list WHERE bk_id=${id} OR bk_name='${name}'`;
  if (!id) {
    res.send({
      code: 201,
      msg: 'id 不能为空'
    });
    return;
  }
  query(sql, (err, result) => {
    if (err) console.log(err);
    res.send({
      code: 200,
      data: result
    })
  })
});

router.post('/search', (req, res) => {
  let name = req.body.name;
  let sql = `SELECT bk_id,bk_name,bk_author,bk_pic FROM bk_list WHERE bk_name LIKE '%${name}%'`;
  query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        code: 200,
        data: result
      })
    }
  })
});

router.post('/add', (req, res) => {
  let bk_name = req.body.bk_name;
  let bk_author = req.body.bk_author;
  let bk_pic = req.body.bk_pic;
  if (!bk_name || !bk_author) {
    res.send({
      code: 200,
      msg: '填写的信息不完整'
    });
    return;
  }
  let sql_num = `SELECT COUNT(*) AS num FROM bk_list WHERE bk_name='${bk_name}'`;
  query(sql_num, (err, result) => {
    if (err) console.log(err);
    if (result[0].num > 0) {
      res.send({
        code: 200,
        msg: '该条信息已存在'
      });
    } else {
      let sql = `INSERT INTO bk_list(bk_name, bk_author, bk_pic) SELECT '${bk_name}', '${bk_author}', '${bk_pic}' FROM DUAL WHERE NOT EXISTS(SELECT bk_name FROM bk_list WHERE bk_name='${bk_name}')`;
      query(sql, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.send({
            code: 200,
            msg: '添加成功'
          })
        }
      })
    }
  });
});

module.exports = router;
