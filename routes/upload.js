let express = require('express');
let router = express.Router();
const query = require('../utils/utils');

let formidable = require('formidable');
let form = new formidable.IncomingForm();

router.post('/image', (req, res) => {
  // 临时存放地址
  form.uploadDir = './uploads';
  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err;
    }
    console.log(files.modal_file);
    res.send({
      code: 200,
      data: []
    });
  })
})

module.exports = router;