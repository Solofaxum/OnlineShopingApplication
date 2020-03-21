
/**
 * requiring third party modules and own modules
 */
const express = require('express');
const { body } = require('express-validator');
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

/** initializing router  */
const router = express.Router();

/** setting router to get add product form  */
router.get('/add-product', isAuth, adminController.getAddProduct);

/** setting router to get products  */
router.get('/products', isAuth, adminController.getProducts);

/** setting router to post product  */
router.post(
  '/add-product',
  [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  isAuth,
  adminController.postAddProduct
);

/** setting router to get product edit form  */
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
  '/edit-product',
  [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  isAuth,
  adminController.postEditProduct
);

/** setting router to edit product  */
router.delete('/product/:productId', isAuth, adminController.deleteProduct);

/**
 * exporting router 
 */
module.exports = router;
