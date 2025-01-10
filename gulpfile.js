const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');

// Compile LESS to CSS
function compileCss() {
    return gulp.src([
            './src/css/style.less',  // Regular CSS file first
            './src/css/adaptive.less', // Adaptive files for different screen sizes
        ])
        .pipe(less())  // Compile LESS to CSS
        .pipe(concat('styles.css'))  // Concatenate into one file
        .pipe(gulp.dest('./dist/css'));  // Save to dist/css
}

// Watch LESS files for changes
function watchFiles() {
    gulp.watch('./src/css/**/*.less', compileCss);  // Watch for changes in any LESS file in the src folder
}

// Default task
exports.default = gulp.series(compileCss, watchFiles); // Compile CSS and start watching for changes
