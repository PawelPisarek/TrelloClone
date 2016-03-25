/* globals require, __dirname */
var browserSync = require('browser-sync'),
    del = require('del'),
    concat = require('gulp-concat'),
    gulp = require('gulp'),
    merge = require('merge-stream'),
    nodemon = require('gulp-nodemon'),
    path = require('path'),
    sass = require('gulp-sass'),
    sequence = require('gulp-sequence'),
    sourcemaps = require('gulp-sourcemaps'),
    ts = require('gulp-typescript');

var cfg = require('./gulp.config.js'),
    tasks = require('./gulp.tasks.js');

gulp.task('clean:server', function (done) {
    del([cfg.server.build], done);
});

gulp.task('clean:frontend', function(done) {
    del([cfg.frontend.build.app], done);
});

gulp.task('build:server', ['clean:server'], function() {
    var tsProject = ts('./tsconfig.json', cfg.server.tsOverwrites);

    return gulp.src(cfg.server.src)
           .pipe(tsProject)
           .js
           .pipe(gulp.dest(cfg.server.build));
});

gulp.task('copy:frontend:resources', function() {
    return gulp.src(cfg.frontend.src.resources)
           .pipe(gulp.dest(cfg.frontend.build.styles));
});

gulp.task('build:frontend:vendors', function() {
    var js = gulp.src(cfg.frontend.src.vendor.js)
             .pipe(concat('vendor.js'))
             .pipe(gulp.dest(cfg.frontend.build.app));

    var styles = tasks.buildStyles(cfg.frontend.src.vendor.sass,
                                   'vendor.css',
                                   cfg.frontend.build.styles);

    return merge([js, styles]);
});

gulp.task('build:frontend:sass', function() {
    return tasks.buildStyles(cfg.frontend.src.sass,
                             'styles.css',
                             cfg.frontend.build.styles);
});

gulp.task('build:frontend:sass:src', function() {
    var resources = gulp.src(cfg.frontend.src.resources)
                           .pipe(gulp.dest(cfg.frontend.src.styles));
    var styles = tasks.buildStyles(cfg.frontend.src.sass,
                                   'styles.css',
                                   cfg.frontend.src.styles);
    var vendorStyles = tasks.buildStyles(cfg.frontend.src.vendor.sass,
                                         'vendor.css',
                                         cfg.frontend.src.styles);

    return merge([resources, vendorStyles, styles]);
});

gulp.task('build:frontend:ts', function() {
    var tsProject = ts('./tsconfig.json', cfg.frontend.tsOverwrites);

    return gulp.src(cfg.frontend.src.ts)
           .pipe(tsProject)
           .js
           .pipe(concat('app.js'))
           .pipe(gulp.dest(cfg.frontend.build.app));
});

gulp.task('build:frontend:index', function() {
    return gulp.src(cfg.frontend.src.index)
           .pipe(gulp.dest(cfg.frontend.build.app));
});

gulp.task('build:frontend', sequence(
    'clean:frontend',
    'copy:frontend:resources',
    'build:frontend:vendors',
    [
        'build:frontend:sass',
        'build:frontend:ts',
        'build:frontend:index'
    ]
));

gulp.task('build', ['build:server', 'build:frontend']);

gulp.task('server', function() {
    nodemon(path.join(cfg.server.build, 'server.js'));
});

gulp.task('server:src', function() {
    nodemon(path.join(cfg.server.build, 'server.js') + ' --src');
});

function browserSyncOn(files) {
    browserSync.init(null, {
        proxy: 'http://localhost:' + cfg.server.port,
        files: files,
        browser: 'google chrome',
        port: cfg.frontend.port,
    });
}

gulp.task('browser-sync', function() {
    browserSyncOn([
        path.join(cfg.frontend.build.app, '/**/*.*'),
        path.join(cfg.server.build, '/**/*.*')
    ]);
});

gulp.task('browser-sync:src', function() {
    browserSyncOn([
        path.join(cfg.frontend.src.app + '/**/*.{ts,js,css,html}'),
        path.join(cfg.server.build, '/**/*.*')
    ]);
});

gulp.task('watch:frontend', function() {
    gulp.watch(cfg.frontend.src.sass, ['build:frontend:sass']);
    gulp.watch(cfg.frontend.src.ts, ['build:frontend:ts']);
    gulp.watch(cfg.frontend.src.resources, ['copy:frontend:resources']);
    gulp.watch(cfg.frontend.src.index, ['build:frontend']);
});

gulp.task('watch:frontend:styles', function() {
    gulp.watch(cfg.frontend.src.sass, ['build:frontend:sass:src']);
});

gulp.task('watch:server', function() {
    gulp.watch(cfg.server.src, ['build:server']);
});
