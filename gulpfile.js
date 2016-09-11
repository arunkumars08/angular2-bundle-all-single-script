var gulp = require('gulp');
var concat = require('gulp-concat');
var Builder = require('systemjs-builder');
var embedTemplates = require('gulp-angular-embed-templates');
var embedSass = require('gulp-angular2-embed-sass');
var ts = require('gulp-typescript');


gulp.task('bundle:vendor:js', function(){
    var bundleOptions = { minify: true, mangle: false, normalize: true };
    var builder = new Builder();
    builder.config({
      packageConfigPaths: ['node_modules/*/package.json', 'node_modules/@angular/*/package.json'],
      paths: {
        '*': 'node_modules/*'
      },
      packages: {
        '@angular/core': { main: 'index.js', defaultExtension: 'js' },
        '@angular/compiler': { main: 'index.js', defaultExtension: 'js' },
        '@angular/common': { main: 'index.js', defaultExtension: 'js' },
        '@angular/http': { main: 'index.js', defaultExtension: 'js' },
        '@angular/platform-browser': { main: 'index.js', defaultExtension: 'js' },
        '@angular/platform-browser-dynamic': { main: 'index.js', defaultExtension: 'js' },
        '@angular/router': { main: 'index.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' }
      }
    });
    return builder.bundle('dist/tmp/dependencies.js', bundleOptions)
                  .catch(function(err) {
                    console.error(err);
                  });
});

gulp.task('tsNextTask', function() {
    var builder = new Builder('buil/js/app', {
        paths: {
            '*': '*.js'
        },
        meta: {
            '@angular/*': {
                build: false
            },
            'rxjs/*': {
                build: false
            },
            'd3': {
                build: false
            },
            'topojson': {
                build: false
            }
        }
    });
    return builder.bundle('main', 'buil/js/app.bundle.js');
});

gulp.task('tsTask', function() {
	var tsProject = ts.createProject('tsconfig.json', {
		
	});
	var tsResult = gulp.src('src/**/*.ts', {base: './src'})
        .pipe(embedTemplates())
        .pipe(embedSass())
		.pipe(ts(tsProject));

	return tsResult.js
		.pipe(gulp.dest('buil/js'));
});

gulp.task('default', ['tsTask', 'tsNextTask']);
