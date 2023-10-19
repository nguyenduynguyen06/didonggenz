const express = require('express');
const router = express.Router();
const categoryController = require('../controller/CategoryController');


router.post('/addCategory', categoryController.addCategory);
router.put('/updateCategory/:id', categoryController.updateCategory);
router.delete('/delete/:id',categoryController.deleteCategory)
router.get('/getAll',categoryController.getAllCategories)
module.exports = router;
