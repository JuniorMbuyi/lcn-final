const express = require('express');
const path = require('path');
const compression = require('compression');
const morgan = require("morgan");
const fs = require('fs');

app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	next();
});

app.use(morgan("tiny"));
app.use(compression());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/:filename', (req, res) => {
    const file = `${__dirname}/public/${req.params.filename}`
    if(fs.existsSync(file)){
        res.sendFile(file);
    }else {
        res.sendFile(`${__dirname}/public/index.html`)
    }
});

module.exports = app;