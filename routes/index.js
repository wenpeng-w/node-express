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
    if (err) {
      console.log(err);
      return;
    }
    res.send({
      code: 200,
      data: result
    })
  })
});

router.post('/search', (req, res) => {
  let name = req.body.name;
  let sql = `SELECT bk_id,bk_name,bk_author,bk_pic FROM bk_list WHERE bk_name LIKE '%${name}%' ORDER BY bk_id DESC`;
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
    if (err) {
      console.log(err);
      return;
    }
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

router.post('/update', (req, res) => {
  let bk_id = req.body.bk_id;
  let bk_name = req.body.bk_name;
  let bk_author = req.body.bk_author;
  let bk_pic = req.body.bk_pic;

  let sql_bkId = `SELECT bk_id FROM bk_list WHERE bk_id=${bk_id}`;
  query(sql_bkId, (err, result) => {
    if (err) {
      console.log(err);
    } else if (!result.length) {
      res.send({
        code: 200,
        msg: '信息不存在'
      })
    } else {
      let sql = `UPDATE bk_list SET bk_name='${bk_name}', bk_author='${bk_author}', bk_pic='${bk_pic}' WHERE bk_id=${bk_id}`;
      query(sql, (err) => {
        if (err) {
          console.log(err)
        } else {
          res.send({
            code: 200,
            msg: '更新成功'
          })
        }
      });
    }
  });
});

router.post('/delete', (req, res) => {
  let bk_id = req.body.bk_id;
  let sql = `DELETE FROM bk_list WHERE bk_id=${bk_id}`;
  query(sql, (err) => {
    if (err) {
      console.log(err)
    } else {
      res.send({
        code: 200,
        msg: '删除成功'
      })
    }
  })
});

module.exports = router;
