module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-datauri');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('default', ['datauri', 'sass', 'uglify', 'preprocess']);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		datauri: {
      dist: {
        options: {
          classPrefix: 'data-'
        },
        src: [
          "scss/sprites.png",
        ],
        dest: [
          "temp/sprites.scss",
        ],
      },
    },

		sass: {
			options: {
				outputStyle: "compressed",
				includePaths: [
					'temp',
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
				dest : 'dist/tree.html'
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
