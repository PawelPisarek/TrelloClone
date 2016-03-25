/* global module */
var path = require('path');

module.exports = {
    server: {
        src: [
            path.resolve('./src/server/**/*.ts'),
            path.resolve('./typings/main/ambient/node/index.d.ts'),
            path.resolve('./typings/main/ambient/mime/index.d.ts'),
            path.resolve('./typings/main/ambient/serve-static/index.d.ts'),
            path.resolve('./typings/main/ambient/express/index.d.ts'),
            path.resolve('./typings/main/ambient/express-serve-static-core/index.d.ts')
        ],
        build: path.resolve('./dist/server'),
        port: 8081,
        tsOverwrites: {
            module: 'commonjs'
        }
    },
    frontend: {
        src: {
            app: path.resolve('./src/frontend'),
            vendor: {
                js: [
                    path.resolve('./node_modules/systemjs/dist/system.js'),
                    path.resolve('./node_modules/angular2/bundles/angular2-polyfills.js'),
                    path.resolve('./node_modules/es6-shim/es6-shim.min.js'),
                    path.resolve('./node_modules/rxjs/bundles/Rx.js'),
                    path.resolve('./node_modules/angular2/bundles/angular2.min.js')
                ],
                sass: [
                    path.resolve('./node_modules/ng2-material/source/*.scss'),
                    path.resolve('./node_modules/ng2-material/font/*.scss')
                ]
            },
            ts: [
                path.resolve('./src/frontend/**/*.ts'),
                path.resolve('./node_modules/angular2/typings/browser.d.ts')
            ],
            sass: [
                path.resolve('./src/frontend/**/*.scss')
            ],
            resources: [
                path.resolve('./node_modules/ng2-material/font/*.{eot,woff2,woff,ttf}'),
                path.resolve('./src/frontend/**/*.{jpg,jpg,gif,png}')
            ],
            styles: path.resolve('./src/frontend/styles'),
            index: path.resolve('./src/frontend/index.html')
        },
        build: {
            app: path.resolve('./dist/frontend'),
            styles: path.resolve('./dist/frontend/styles'),
            index: path.resolve('./dist/frontend/index.html')
        },
        port: 8080
    }
};
