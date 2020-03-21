

/**
 * requiring third party modules and own modules
 */
const express = require('express');
const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');
/** intializing router  */
const router = express.Router();
/** setting router to get index  */
router.get('/', shopController.getIndex);
/** setting router to get products  */
router.get('/products', shopController.getProducts);
/** setting router to get product  */
router.get('/products/:productId', shopController.getProduct);
/** setting router to get cart products */
router.get('/cart', isAuth, shopController.getCart);
/** setting router to post cart product  */
router.post('/cart', isAuth, shopController.postCart);
/** setting router to post delete cart product  */
router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);
/** setting router to get check out product  */
router.get('/checkout', isAuth, shopController.getCheckout);
/** setting router to validate successful check out of product  */
router.get('/checkout/success', shopController.getCheckoutSuccess);
/** setting router to get check out product  */
router.get('/checkout/cancel', shopController.getCheckout);
/** setting router to get order */
router.get('/orders', isAuth, shopController.getOrders);
/** setting router to post order  */
router.post('/create-order', isAuth, shopController.postOrder);
/** setting router to get invoice  */
router.get('/orders/:orderId', isAuth, shopController.getInvoice);
/** exporting router  */
module.exports = router;
