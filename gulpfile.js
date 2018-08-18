var gulp    = require('gulp'),
    rollup  = require('gulp-rollup'),
	  uglify  = require('rollup-plugin-uglify');

gulp.task('bundle', function() {
  gulp.src('./src/*.js').pipe(rollup({
    output: {
		format: "iife",
		name: "Triangular"
	  }, 
      plugins: [
        require("rollup-plugin-babel")({
          "presets": [["env", { "modules": false }]],
          "plugins": ["external-helpers"]
		}),
		uglify()
      ],
      input: './src/Triangular.js'
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('watch',function() {
	gulp.watch(['./src/*.js'],['bundle'])
});
 
gulp.task('default', ['bundle','watch']);