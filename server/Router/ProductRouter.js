const express = require('express');
const router = express.Router();
const productController = require('../controller/ProductController');
const productvariantController = require('../controller/ProductVariantController');


router.post('/addProduct', productController.addProduct);
router.post('/addProductvariant/:id', productvariantController.addProductVariant);
router.get('/getIdByBrand/:brandId', productController.getProductByBrandId);
router.get('/getProductsByCategoryAndBrand/:categoryId/:brandId', productController.getProductsByCategoryAndBrand);
router.get('/getIdByCategory/:categoryId', productController.getProductsByCategory);
router.put('/editProduct/:id', productController.editProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.get('/searchProduct', productController.searchProducts);
router.delete('/deleteVariant/:id', productvariantController.deleteProductVariant);
router.put('/editProductVariant/:id', productvariantController.updateProductVariant);
router.post('/addAttributes/:id', productvariantController.addAttributes);
router.delete('/deleteAttributes/:id/:attributeIdToRemove', productvariantController.deleteAttributes);
router.get('/getAll',productController.getAllProduct)
router.get('/getDetails/:name/:memory', productController.detailsProduct);
router.get('/filter/:categoryId', productController.filterProductsByCategory);
router.get('/filter/highToLow/:categoryId', (req, res) => {
  req.query.sort = 'highToLow';
  productController.filterProductsByCategory(req, res);
});
router.get('/filter/:categoryId/:brandId', productController.filterProductsByCategoryandBrand);
router.get('/filter/highToLow/:categoryId/:brandId', (req, res) => {
  req.query.sort = 'highToLow';
  productController.filterProductsByCategoryandBrand(req, res);
});
module.exports = router;