var gulp = require('gulp');

var sass = require('gulp-sass');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var del = require('del');

var browserSync = require('browser-sync').create();

gulp.task('html', function(){
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('sass', function(){
  return gulp.src(['app/scss/style.scss', 'app/scss/8_pasos.scss'])
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js', function(){
  return gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('scripts', function () {
  return gulp.src([
      'bower_components/jquery/dist/jquery.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/html5shiv/dist/html5shiv.js',
      'bower_components/Respond/dest/respond.src.js',
      'bower_components/owl.carousel/dist/owl.carousel.js',
      'bower_components/toastr/toastr.js',
      'bower_components/jquery-easing-original/jquery.easing.js',
      'bower_components/FitText.js/jquery.fittext.js',
      'bower_components/WOW/dist/wow.js',
      'bower_components/magnific-popup/dist/jquery.magnific-popup.js'
    ])
  .pipe(gulp.dest('dist/js'))
});

gulp.task('styles', function () {
  return gulp.src([
      'bower_components/bootstrap/dist/css/bootstrap.css',
      'bower_components/fontawesome/css/font-awesome.css',
      'bower_components/owl.carousel/dist/assets/owl.carousel.css',
      'bower_components/owl.carousel/dist/assets/owl.theme.default.css',
      'bower_components/bootstrap-vertical-tabs/bootstrap.vertical-tabs.css',
      'bower_components/toastr/toastr.css',
      'bower_components/animate.css/animate.css',
      'bower_components/magnific-popup/dist/magnific-popup.css'
    ])
  .pipe(gulp.dest('dist/css'))
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function () {
    return gulp.src([
      'bower_components/fontawesome/fonts/*.{eot,svg,ttf,woff,woff2}',
      'bower_components/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}',
      'app/fonts/*.{eot,svg,ttf,woff,woff2}'
    ])
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
})

gulp.task('default', ['clean:dist', 'sass', 'styles', 'js', 'scripts', 'html', 'images', 'fonts', 'browserSync'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/js/**/*.js', ['js']);
  gulp.watch('app/**/*.html', ['html']);
  gulp.watch('app/**/*.+(png|jpg|jpeg|gif|svg)', ['images']);
});

gulp.task('dist', ['clean:dist', 'sass', 'styles', 'js', 'scripts', 'html', 'images', 'fonts'], function (){
  console.log('App built')
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
});
