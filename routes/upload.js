let express = require('express');
let router = express.Router();

let fs = require('fs');
let path = require('path');

const utils = require('../utils/utils');

let formidable = require('formidable');

router.post('/image', (req, res) => {

  // ***** 注意 form 实例化位置（踩了很长时间的坑）*****
  // 上传第一张图片时成功，接着上传第二张图片时报错
  // Error: Can't set headers after they are sent.
  let form = new formidable.IncomingForm();
  // 临时存放地址
  form.uploadDir = './uploads';
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    console.log(files);
    let _date = new Date();
    let _t = utils.dateFtt(_date, 'yyyyMMdd') + _date.getTime();
    let extname = path.extname(files.modal_file.name);

    let oldPath = path.normalize(files.modal_file.path);
    let newPath = './uploads/' + _t + extname;
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        throw err;
      } else {
        res.send({
          code: 200,
          msg: 'chenggong'
        })
      }
    })
  })
})

module.exports = router;