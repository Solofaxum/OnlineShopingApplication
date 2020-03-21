
/**
 * requiring core module, third party module and own module 
 */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const errorController = require('./controllers/error');
const User = require('./models/user');
const dotenv = require('dotenv');

/** initializing the local host  */
// const MONGODB_URL =  'mongodb://127.0.0.1:27017/TechOnlineShoping';
  // const MONGODB_URL = 'mongodb+srv://solo:solo@cluster0-a8kor.mongodb.net/test?retryWrites=true';
  // lodad invironmental variables
  dotenv.config({path: './util/config.env'});

  console.log('process.env.MONGODB_URL.................',process.env.MONGODB_URL)
/**
 * Instantiating app
 */
const app = express();


app.use(helmet());
app.use(compression());
app.use(morgan('combined'));


const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: 'sessions'
});

const csrfProtection = csrf();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});


const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


/**
 * set the view engine to ejs
 */
app.set('view engine', 'ejs');
app.set('views', 'views');

/** requiring routes */
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

/** utilizing modules and middle wares  */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(csrfProtection);
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }


  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});

/** utilizing the modules and middlewares  */
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.get('/500', errorController.get500);
app.use(errorController.get404);
app.use((error, req, res, next) => {
 
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    user:req.user,
    isAuthenticated: req.session.isLoggedIn
  });
});


/**
 * connecting to server 
 * 
 */
mongoose
  .connect(process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  .then(result => {
    app.listen(process.env.PORT || 3000, () => { console.log('Your Code is Running at port of 3000') });
  })
  .catch(err => {
    console.log(err);
  });


