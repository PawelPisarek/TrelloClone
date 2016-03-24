/* globals require, module */
var concat = require('gulp-concat'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

/**
 * Build SASS files
 * @param   {Array}  styles
 * @param   {string} concatName
 * @param   {string} dest
 * @returns {pipe}
 */
function buildStyles(styles, concatName, dest) {
    return gulp.src(styles)
           .pipe(sourcemaps.init())
           .pipe(sass().on('error', sass.logError))
           .pipe(concat(concatName))
           .pipe(sourcemaps.write('.'))
           .pipe(gulp.dest(dest));
}


module.exports = {
    buildStyles: buildStyles
};
