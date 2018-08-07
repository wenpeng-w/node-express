const query = require('../utils/utils');

const router = (req, res) => {
    let id = req.query.id;
    let name = req.query.name;
    if (!id) {
        res.send({
            code: 201,
            msg: 'id 不能为空'
        });
        return;
    }
    query(`select bk_id,bk_name,bk_author,bk_pic from bk_list where bk_id=${id} and bk_name=${name}`, [1], (err, results, fields) => {
        console.log(err);
        if (err) {
            throw err
        } else {
            res.send({
                code: 200,
                data: results
            })
        }
    })
};

module.exports = router;
