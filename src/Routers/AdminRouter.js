const express = require('express')
const router = express.Router();

const {newAdmin , updatedUser } = require('../Controllers/AdminController')

router.post("/" , newAdmin);
router.patch("/:id" , updatedUser);


module.exports = router