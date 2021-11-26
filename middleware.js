const { createProxyMiddleware } = require('http-proxy-middleware');
const { proxyRouter } = require('./config')
const { verifyToken } = require('./okta')

module.exports.loginMiddleware = createProxyMiddleware({
    target: 'http://garvit9000.me', // target host
    changeOrigin: true
})

module.exports.authMiddleware = async (req, res, next) => {

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

    let authRes;
    if (req.cookies && req.cookies['authRes']) authRes = req.cookies["authRes"]
    if (req.signedCookies && req.signedCookies['authRes']) authRes = req.signedCookies['authRes']
    if (authRes) authRes = JSON.parse(authRes)

    console.log(authRes)

    console.log(verifyToken(authRes.value).catch())

    // TODO need OKTA AUTH logic here 
    if (auth) return next()

    // if (req.query && req.query.pass && req.query.pass === 'MFA') return next();

    const URL = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.redirect(`/login?CB_URL=${URL}`);
}
