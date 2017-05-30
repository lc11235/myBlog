const fs = require('fs');
const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./dbModel/model.js');
const resolve = file => path.resolve(__dirname, file);
const api = require('./api');
const app = express();
const config = require('./config/config.js');
const cryptoMd5 = require('./tool/cryptoMd5.js');

app.set('port', (process.env.port || config.devPort));
app.use(compression());
app.use(favicon(resolve('../dist/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/dist', express.static(resolve('../dist')));
app.use(api);

app.post('/api/setup', (req, res) => {
    let {name, pwd} = req.body;
    pwd = cryptoMd5(pwd);
    new db.User({name, pwd})
    .save()
    .then(() => {
        res.status(200).end();
        db.initialized = true;
    })
    .catch(() => res.status(500).end());
});

app.get('*', (req, res) => {
    const html = fs.readFileSync(resolve('../index.html'), 'utf-8');
    res.send(html);
});

app.listen(app.get('port'), () => {
    console.log('Visit http://localhost:' + app.get('port'));
});