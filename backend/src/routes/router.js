const router = require('express').Router();
const userController = require('../controllers/userController');
const blogController = require('../controllers/blogController');
const auth = require('../middlewares/auth').auth;
const userValidator = require('../validators/userValidator');
const blogValidator = require('../validators/blogValidator');

// You can require and use your routes here ;)
router.post('/api/v1/signup',userValidator.register,userController.signup);
router.post('/api/v1/login',userValidator.login,userController.login);


router.post('/api/v1/createBlog',auth,blogValidator.createBlog,blogController.createBlog);
router.get('/api/v1/blogs',auth,blogController.getBlogs);
router.delete('/api/v1/deleteBlog',auth,blogValidator.deleteBlog, blogController.deleteBlog);
module.exports = router;