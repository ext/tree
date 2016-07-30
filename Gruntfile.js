module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('default', ['sass', 'uglify', 'preprocess']);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			options: {
				outputStyle: "compressed",
				includePaths: [
					'node_modules/font-awesome/scss/',
				],
			},
			dist: {
				files: {
					'temp/tree.min.css': 'scss/tree.scss',
				},
			},
		},

		uglify: {
			dist: {
				files: {
					'temp/tree.min.js': ['tree.js'],
				},
			},
		},

		preprocess : {
			dist: {
				src: 'index.html',
				dest : 'public/tree.html'
			},
		},

		watch: {
			scss: {
				files: ['scss/**/*.scss'],
				tasks: ['sass', 'preprocess'],
			},
			js: {
				files: ['tree.js'],
				tasks: ['uglify', 'preprocess'],
			},
			html: {
				files: ['index.html'],
				tasks: ['preprocess'],
			},
		},
	});
};
