
/**
 * fucntionality to handle error '404'
 */
exports.get404 = (req, res, next) => {
  res.status(404).render('404', {
    pageTitle: 'Page Not Found',
    path: '/404',
    isAuthenticated: req.session.isLoggedIn
  });
};

/**
 * fucntionality to handle error '500'
 */
exports.get500 = (req, res, next) => {
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    user:req.user,
    isAuthenticated: req.session.isLoggedIn
  });
};
