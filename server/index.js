// 基本服务器的引用，包括文件操作模块，路径处理模块
// express框架，favicon处理模块，html文件的解析模块
// 和cookie解析模块
const fs = require('fs');
const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// api的路由
const cmsAPI = require('./api/cmsAPI.js');
//const frontAPI = require('./api/frontAPI.js');

// 主页面的路由
const mainPageRouter = require('./router/router.js');

// 配置以及工具函数的引用
const config = require('./config/config.js');
const crypto = require('./utils/crypto.js');

// 引入express框架
const app = express();

// 构造一个小的函数，来取得文件的实际路径
const resolve = file => path.resolve(__dirname, file);

app.set('port', (process.env.port || config.devPort));
app.use(compression());
app.use(favicon(resolve('../dist/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/dist', express.static(resolve('../dist')));
app.use(cmsAPI);
//app.use(frontAPI);
app.use(mainPageRouter);

app.get('*', (req, res) => {
    const html = fs.readFileSync(resolve('../index.html'), 'utf-8');
    res.send(html);
});

app.listen(app.get('port'), () => {
    console.log('Visit http://localhost:' + app.get('port'));
});