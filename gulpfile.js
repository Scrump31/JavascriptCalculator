var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

//Compile SASS to CSS
gulp.task('sass', function(){
  return gulp.src('app/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
});

//Watch the SASS file for chages
gulp.task('watch', function(){
  gulp.watch('app/scss/style.scss', ['sass']);
});

gulp.task('default',['watch']);
