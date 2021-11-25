const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookieParser = require("cookie-parser");

// Create Express Server
const app = express();

app.use(cookieParser());
// Configuration
const PORT = 3000;
const HOST = "0.0.0.0";
// const API_SERVICE_URL = "https://jsonplaceholder.typicode.com";
const AUTHOKAY = "https://www.google.com";

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to JSONPlaceholder API.');
});

// Authorization
// app.use('', (req, res, next) => {
//     if (req.headers.authorization) {
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// });

app.use('/login', (req, res) => {
    
    const x = createProxyMiddleware({
        target: 'http://garvit9000.me', // target host
        changeOrigin: true
    })

    x(req, res)
})

app.use((req, res, next) => {
    if (req.query && req.query.pass && req.query.pass === 'MFA') return next();
    res.redirect('/login');
});


// Proxy endpoints
app.use('/', createProxyMiddleware({
    target: 'http://www.example.org', // target host
    changeOrigin: true,
    router: {
        'app1.localhost:3000': 'https://www.google.com',  // host only
        'harsh.localhost:3000': 'https://harshsinghvi.com',  // host only
    }
}));

// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});