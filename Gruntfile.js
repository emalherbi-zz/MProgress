module.exports = function(grunt) {
  'use strict';

  // Load the plugin that clean files and directories.
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Load the plugin that concatenate files.
  grunt.loadNpmTasks('grunt-contrib-concat');
  // Load the plugin that minify and concatenate ".js" files.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin that copy files and directories.
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Publish to GitHub Pages with Grunt
  grunt.loadNpmTasks('grunt-gh-pages');
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
          'dist/<%= pkg.name %>.js': ['<%= pkg.name %>.js'],
        },
      },
    },

    /* js file minification */
    uglify: {
      options: {
        preserveComments: false
      },
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },

    /* put files not handled in other tasks here */
    copy: {
      site: {
        files: [{
          expand: true,
          dot: true,
          cwd : 'dist',
          src: ['*.js'],
          dest: 'docs/js'
        }]
      }
    },

    /* commit on gh-pages github */
    'gh-pages': {
      options: {
        base: 'docs/',
        message: 'auto-generated commit'
      },
      src: ['**/*']
    }

  });

  // tasks
  grunt.registerTask('build', [
    'clean',
    'concat',
    'uglify',
    'copy'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'gh-pages'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
