const express = require('express');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require('path');
const ejs = require('ejs');

const { loginMiddleware, authMiddleware } = require('./middleware');
const { reverseProxyRouter } = require('./proxy');

// Create Express Server
const app = express();

// ejs
app.set('view engine', 'ejs');
//Static Folder
app.use(express.static("public"));

// Configuration
const PORT = 3000;
const HOST = "0.0.0.0";

// Cookie Parser
app.use(cookieParser());

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service.');
});

// app.use('/login', express.static(path.join(__dirname, 'authpage')))
// app.use('/404', express.static(path.join(__dirname, '404')))
app.get("/login", (req, res) => {
  res.render("index");
});
app.get("/404", (req, res) => {
  res.render("404");
});

app.use(authMiddleware);

// REVERSE PROXY
app.use('/', reverseProxyRouter);

// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
