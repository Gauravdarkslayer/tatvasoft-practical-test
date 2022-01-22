const router = require('express').Router();
const userController = require('../controllers/userController');
const blogController = require('../controllers/blogController');
const auth = require('../middlewares/auth').auth;

// You can require and use your routes here ;)
router.post('/api/v1/signup',userController.signup);
router.post('/api/v1/login',userController.login);


router.post('/api/v1/createBlog',auth,blogController.createBlog);
// router.get('/api/v1/editBlog');
router.delete('/api/v1/deleteBlog',auth,blogController.deleteBlog);
module.exports = router;