/* global module */
module.exports = {
    server: {
        src: [
            './src/server/**/*.ts',
            './typings/main/ambient/node/index.d.ts',
            './typings/main/ambient/mime/index.d.ts',
            './typings/main/ambient/serve-static/index.d.ts',
            './typings/main/ambient/express/index.d.ts',
            './typings/main/ambient/express-serve-static-core/index.d.ts'
        ],
        build: './dist/server',
        port: 8081,
        tsOverwrites: {
            module: 'commonjs'
        }
    },
    frontend: {
        src: {
            app: './src/frontend',
            vendor: {
                js: [
                    './node_modules/systemjs/dist/system.js',
                    './node_modules/angular2/bundles/angular2-polyfills.js',
                    './node_modules/es6-shim/es6-shim.min.js',
                    './node_modules/rxjs/bundles/Rx.js',
                    './node_modules/angular2/bundles/angular2.min.js'
                ],
                sass: [
                    './node_modules/ng2-material/source/*.scss',
                    './node_modules/ng2-material/font/*.scss'
                ]
            },
            ts: [
                './src/frontend/**/*.ts',
                './node_modules/angular2/typings/browser.d.ts'
            ],
            sass: [
                './src/frontend/**/*.scss'
            ],
            resources: [
                './node_modules/ng2-material/font/*.{eot,woff2,woff,ttf}',
                './src/frontend/**/*.{jpg,jpg,gif,png}'
            ],
            index: './src/frontend/index.html'
        },
        build: {
            app: './dist/frontend',
            styles: './dist/frontend/styles'
        },
        port: 8080
    }
};
