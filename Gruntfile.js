module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('default', ['sass', 'preprocess']);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			options: {
				sourceMap: true,
				style: "expanded",
				includePaths: [
					'node_modules/font-awesome/scss/',
				],
			},
			build: {
				files: {
					'public/static/tree.min.css': 'scss/tree.scss',
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
				tasks: ['sass'],
			},
			html: {
				files: ['index.html'],
				tasks: ['preprocess'],
			},
		},
	});
};
