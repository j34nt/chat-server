/**
 * path: api/messages
 */

 const { Router } = require('express');
 const { validateJWT } = require('../middlewares/validate-jwt');
 const {getMessagesById} = require('../controllers/messages');
 
 const router = Router();
 //
 router.get('/:from', validateJWT, getMessagesById)
 
 
 module.exports = router;