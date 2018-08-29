const express = require('express');
const router = express.Router();
const checkauth=require('../../middleware/auth');
const UserController=require('../../controllers/admin/user');


/* GET home page. */
// router.get('/users', function (req, res, next) {
//     res.json({
//         text: 'admin user!!'
//     });
// });

// router.get('/userlist',UserController.user_list);
//
router.post('/signup', UserController.user_signup);
router.post('/signin',UserController.user_signin);
router.post('/postoken',checkauth,UserController.post_token);
router.get('/users', checkauth, UserController.user_list);

module.exports = router;
