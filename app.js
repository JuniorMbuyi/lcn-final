const express = require('express');
const path = require('path');
const compression = require('compression');
const morgan = require("morgan");
const fs = require('fs');
const nodemailer = require('nodemailer');

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

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    },
    tls: {
      rejectUnauthorized: false
  }
});
transporter.verify((error, success) => {
    if(error){
      console.log(error);
    }
    else{
      console.log('Connexion au serveur SMTP réussie!')
    }
});

app.use('/public', express.static(path.join(__dirname, 'public')));

app.post('/contact', (req, res) => {
    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL,
        subject: req.body.subject,
        html:
        `<div>
        <h3>Email: ${req.body.email}</h3>
        <h3>Nom: ${req.body.name}</h3>
        <h3 style="margin-top: 5em; width: 100%; max-width: 80%; text-align: center; margin-left: 6em;">${req.body.message}</h3>
        </div>`
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if(error){
          console.error(error);
          res.redirect(`/contact.html`);
        }else{
          res.redirect(`/contact.html`);
        }
    })
});

app.post('/engage', (req, res) => {
    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL,
        subject: `Je veux m'engager !`,
        text:`Mon Email: ${req.body.email}`
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if(error){
          console.error(error);
          res.redirect(`/index.html`);
        }else{
          res.redirect(`/index.html`);
        }
    })
});

app.use('/:filename', (req, res) => {
    const file = `${__dirname}/public/${req.params.filename}`;
    if(fs.existsSync(file)){
        res.sendFile(file);
    }else {
        res.sendFile(`${__dirname}/public/index.html`)
    }
});

app.use('/', (req, res) => {
    const file = `${__dirname}/public/index.html`;
    res.redirect(file);
});

module.exports = app;