const express = require('express');
const router = express.Router();
const getCityData = require('./../Controllers/Controller')
router.get('/', getCityData);
module.exports=router;
