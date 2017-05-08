var express = require('express');
var router = express.Router();

const controllers = require('../controllers/blog');

/* GET home page. */
router.get('/api/blog', controllers.findAll);
router.post('/blog', controllers.create);
router.delete('/delete/:id', controllers.delete);
router.put('/edit/:id', controllers.update);

module.exports = router;
