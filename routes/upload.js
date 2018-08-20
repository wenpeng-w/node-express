let express = require('express');
let router = express.Router();

// let fs = require('fs');
// let path = require('path');

const query = require('../utils/utils');

let formidable = require('formidable');

router.post('/image', (req, res) => {

  // ***** 注意 form 实例化位置（踩了很长时间的坑）
  // 上传第一张图片时成功，接着上传第二张图片时报错
  // Error: Can't set headers after they are sent.
  let form = new formidable.IncomingForm();

  // 临时存放地址
  form.uploadDir = './uploads';
  // console.log(!fs.existsSync(targetDir));
  // if (!fs.existsSync(targetDir)) {
  //   fs.mkdir(targetDir);
  // }
  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err;
      res.send({
        code: 201,
        msg: 'shibai'
      })
    } else {
      res.send({
        code: 200,
        msg: 'chenggong'
      })
    }
  })
})

module.exports = router;