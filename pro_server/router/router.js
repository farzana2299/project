const express=require('express')
const user=require('../controllers/userControles')
const upload=require('../middlewares/multerMiddleware')
const jwtMiddleware = require('../middlewares/jwtMiddleware')


// create an object for Router class in express
const router=new express.Router()
 //register
 router.post('/user/register',user.register)

 //login
 router.post('/user/login',user.login)

//add project
 router.post('user/add-project',jwtMiddleware,upload.single('proImg'),user.addProject)

//userProjects
router.get('/user/get-user-projects',jwtMiddleware,user.userProjects)

//3 of all projects
router.get('/user/get-limited-projects',user.allLimitProjects)

//all projects
router.get('/user/get-all-projects',user.allProjects)

//edit projects
router.get('/user/edit-projects',jwtMiddleware,upload.single('proImg'),user.editProject)

//edit profile
router.get('/user/edit-profile',jwtMiddleware,upload.single('profile'),user.editProfile)



module.exports=router