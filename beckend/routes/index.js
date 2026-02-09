const express = require('express');
const contactRoutes = require('./contactRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use('/contact', contactRoutes);
router.use('/user', userRoutes);

module.exports = router;