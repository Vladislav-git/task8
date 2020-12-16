const controller = require('../controller/users.controller.js');
const multerMiddleware = require('../middlewares/multer.middleware');
const validate = require('../middlewares/validation.middleware'); 
const express = require('express');
const auth = require('../middlewares/auth.middleware.js');
const router = express.Router();

router
	.get('/me', auth, controller.me)
	.get('/users/:id', auth, controller.getById)
	.get('/users', auth, controller.get)
	.post('/login', validate, controller.login)
	.post('/users', validate,multerMiddleware, controller.add)
	.put('/users/:id', auth, controller.change)
	.delete('/users/:id', auth, controller.delete)

module.exports = router;