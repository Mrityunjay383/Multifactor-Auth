const { createProxyMiddleware } = require('http-proxy-middleware');
const { proxyRouter } = require('./config')

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

    const HOST = req.get('host')
    if (!proxyRouter[HOST]) return res.redirect(`/404`);

    let auth;
    if (req.cookies && req.cookies.auth) auth = req.cookies.auth
    if (req.signedCookies && req.signedCookies.auth) auth = req.signedCookies.auth
    
    // TODO need OKTA AUTH logic here 
    if (auth) return next()

    // if (req.query && req.query.pass && req.query.pass === 'MFA') return next();
    
    const URL = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.redirect(`/login?CB_URL=${URL}`);
}