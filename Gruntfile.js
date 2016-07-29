module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('default', ['sass']);

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

		watch: {
			scss: {
				files: ['scss/**/*.scss'],
				tasks: ['sass'],
			},
		},
	});
};
