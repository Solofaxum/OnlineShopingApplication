/**
 * requiring third party moudle and own module 
 */

const express = require('express');
const { check, body } = require('express-validator');
const authController = require('../controllers/auth');
const User = require('../models/user');
/**
 * initializing router 
 */
const router = express.Router();
/** setting router to get login page   */
router.get('/login', authController.getLogin);

/** setting router to get sign up  */
router.get('/signup', authController.getSignup);

/** setting router to post email  */
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim()
  ],
  authController.postLogin
);

/** setting router to post email   */
router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
       
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              'E-Mail exists already, please pick a different one.'
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      'password',
      'Please enter a password with only numbers and text and at least 5 characters.'
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }
        return true;
      })
  ],
  authController.postSignup
);

/** setting router for posting logout  */
router.post('/logout', authController.postLogout);

/** setting router for get reseat   */
router.get('/reset', authController.getReset);

/** setting router for post reseat   */
router.post('/reset', authController.postReset);

/** setting router for get new password   */
router.get('/reset/:token', authController.getNewPassword);

/** setting router for post new password   */
router.post('/new-password', authController.postNewPassword);

/** exporting router */
module.exports = router;
