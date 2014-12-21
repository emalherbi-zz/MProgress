module.exports = function(grunt) {
  'use strict';

	// Load the plugin that clean files and directories.
	grunt.loadNpmTasks('grunt-contrib-clean');
  // Load the plugin that concatenate files.
  grunt.loadNpmTasks('grunt-contrib-concat');
	// Load the plugin that minify and concatenate ".js" files.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// Automatic notifications when tasks fail.
	grunt.loadNpmTasks('grunt-notify');

  grunt.initConfig({
	  pkg: grunt.file.readJSON('package.json'),

    banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2010-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',

    /* clean directories */
    clean: ['dist'],

    /* concat files */
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      basic_and_extras: {
        files: {
          'dist/mprogress.js': ['mprogress.js'],
        },
      },
    },

    /* js file minification */
    uglify: {
      options: {
        preserveComments: false
      },
			build: {
				src: 'dist/mprogress.js',
				dest: 'dist/mprogress.min.js'
			}
    }

	});

	// tasks
  grunt.registerTask('build', [
      'clean',
      'concat',
      'uglify'
  ]);

  grunt.registerTask('deploy', [
      'build'
  ]);

  grunt.registerTask('default', [
      'build'
  ]);
};
