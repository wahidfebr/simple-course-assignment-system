const router = require('express').Router()
const Controller = require('../controller/controller')

router.get('/', Controller.home)
router.get('/login', )
router.get('/register', )
router.get('/student', Controller.getAllStudent)
router.get('/teacher', Controller.getAllTeacher)

module.exports = router
