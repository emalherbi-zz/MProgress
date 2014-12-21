module.exports = function(grunt) {
  'use strict';

	// Load the plugin that clean files and directories.
	grunt.loadNpmTasks('grunt-contrib-clean');
  // Load the plugin that concatenate files.
  grunt.loadNpmTasks('grunt-contrib-concat');
  // Load the plugin that copy files and directories.
  grunt.loadNpmTasks('grunt-contrib-copy');
	// Load the plugin that minify and concatenate ".js" files.
	grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin that compress CSS files.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
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
          'dist/js/mprogress.js': ['required/js/bootstrap.js', 'mprogress.js'],
          'dist/css/mprogress.css': ['required/css/bootstrap.css', 'required/css/bootstrap-theme.css'],
        },
      },
    },

    /* put files not handled in other tasks here */
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'required',
          src: ['**'],
          dest: 'dist'
        }]
      }
    },

    /* js file minification */
    uglify: {
      options: {
        preserveComments: false
      },
			build: {
				src: 'dist/js/mprogress.js',
				dest: 'dist/js/mprogress.min.js'
			}
    },

    /* css file minification */
    cssmin: {
      combine: {
        files: {
          'dist/css/mprogress.min.css': ['dist/css/mprogress.css']
        }
      }
    }

	});

	// tasks
  grunt.registerTask('build', [
      'clean',
      'concat',
      'uglify',
      'cssmin'
  ]);

  grunt.registerTask('deploy', [
      'build'
  ]);

  grunt.registerTask('default', [
      'build'
  ]);
};
