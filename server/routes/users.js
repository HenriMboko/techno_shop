var express = require('express');
var usersRouter = express.Router();

var { loginUser, registerUser, profile_User, all_user, update_User } = require('../controllers/userController')

var { protect } = require('../middlewares/authMiddleWare')


//Create User

usersRouter.post('/', registerUser)

usersRouter.post('/login', loginUser)

usersRouter.get('/', protect, profile_User)

usersRouter.get('/all_user', all_user)

usersRouter.put('/update_user', protect, update_User)

module.exports = usersRouter;
