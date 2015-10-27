var gulp=require("gulp");
var babel=require("gulp-babel");
var webpack = require('webpack-stream');

gulp.task('default2', function () {
    return gulp.src('./jsx/app.js')
        .pipe(babel({blacklist:['useStrict']}))
        .pipe(gulp.dest('js/'));
});


gulp.task('jsx', function() {
  return gulp.src('jsx/app.js').pipe(
    	webpack({
    		output: {
			    filename: 'app.js'
			  },
 	        module: {
		      loaders: [
		      {
		        test: /\.css$/,
		        loader: 'style!css'
		      },
		       {
		        test: /\.js$/,
		        loader: 'babel-loader!jsx-loader',
		      },
	        ]
  }

    }))
    .pipe(gulp.dest('js/'));
});

gulp.task("default",["jsx"],function(){
	  gulp.watch('./jsx/**', ['jsx']);
});

