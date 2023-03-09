const router = require('express').Router()
const Controller = require('../controller')

router.get('/', Controller.home)
router.get('/login', )
router.get('/register', )
router.get('/student', )
router.get('/teacher', )

module.exports = router
