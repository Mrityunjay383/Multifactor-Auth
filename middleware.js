const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports.loginMiddleware = createProxyMiddleware({
    target: 'http://garvit9000.me', // target host
    changeOrigin: true
})

module.exports.authMiddleware = (req, res, next) => {
   
    // TODO Set Cookies which is needed at login page to store token
    // res.cookie('auth', 'sss', { maxAge: 900000, httpOnly: true })

    // TODO Read Cookies to verify tokens 
    // console.log(req.cookies)
    // console.log(req.signedCookies)

    if (req.query && req.query.pass && req.query.pass === 'MFA') return next();
    res.redirect('/login');
}