const express = require('express');
const router = express.Router();
const db = require('../dbModel/db.js');
const crypto = require('../utils/crypto.js');
const checkAPIToken = require('../middlewares/check_api_token.js');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);

// vue SSR
const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync(resolve('./index.template.html'), { encoding: 'utf-8' })
});

router.get('/', (req, res) => {
    const app = new Vue({
        data: {
            
        }
        
    });



    renderer.renderToString(app, (err, html) => {
        if (err) {
            res.status(500).end(err);
            return;
        }

        res.end(html);
    });
});



router.get('/api', checkAPIToken);

module.exports = router;