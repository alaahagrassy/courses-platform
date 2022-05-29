const express = require('express')
const router = express.Router();
const {checkAdmin} = require('../../Middlewares/authorizeAdmin')

const {addCategoty , getOne , Edit,deleteCategory} = require('../Controllers/CategoryController')

router.post('/' ,checkAdmin,addCategoty);
router.get('/' ,checkAdmin, get);
router.get('/:id' ,checkAdmin ,getOne);
router.patch('/:id' ,checkAdmin, Edit);
router.delete('/:id' ,checkAdmin, deleteCategory);

module.exports = router