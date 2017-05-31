const fs = require('fs');
const express = require('express');
const LRU = require('lru-cache');
const router = express.Router();
const db = require('../dbModel/db.js');
const crypto = require('../utils/crypto.js');
const checkAPIToken = require('../middlewares/check_api_token.js');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);

const {createBundleRenderer} = require('vue-server-renderer');

const isProd = process.enc.NODE_ENV === 'production';
const useMicroCache = process.env.MICRO_CACHE !== 'false';
const serverInfo = 
    `express/${(require('express/package.json').version)}` +
    `vue-server-renderer/${require('vue-server-renderer/package.json').version}`;

// vue SSR
const template = fs.readFileSync('../views/index.template.html', 'utf-8');

function createRenderer(bundle, options){
    // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
    return createBundleRenderer(bundle, Object.assign(options, {
        template,
        cache: LRU({
            max: 1000,
            maxAge: 1000 * 60 * 15
        }),
        // this is only needed when vue-server-renderer is npm-linked
        basedir: resolve('./dist'),
        // recommended for performance
        runInNewContext: false
    }))
}

let renderer;
let readyPromise;
if(isProd){
    
}

router.get('/', (req, res) => {
    const app = new Vue({
        data: {
            
        }
        
    });

    renderer.renderToString(app, (err, html) => {
        console.log(html);
    });
});



router.get('/api', checkAPIToken);

module.exports = router;