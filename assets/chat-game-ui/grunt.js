/*global module:false*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-rigger');

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.2.0',
      banner: '// chat-game-ui, v<%= meta.version %>\n' +
        '// Copyright (c)<%= grunt.template.today("yyyy") %> Stephan Wallentin, EF Labs\n' + 
        '// http://github.com/englishtown/chat-game-ui'
    },

    lint: {
      files: ['src/**/*.js']
    },

    concat: {
      dist: {
        src: [
          "src/collections/**/*.js",
          "src/models/**/*.js",
          "src/routers/**/*.js",
          "src/views/**/*.js",
          "src/app.js",
          "src/main.js",
          "src/dev.js",
        ],
        dest: "lib/chat-game-ui.js"
      }
    },

    rig: {
      amd: {
        src: ['<banner:meta.banner>', 'src/amd.js'],
        dest: 'lib/chat-game-ui.amd.js'
      }
    },

    min: {
      standard: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'lib/chat-game-ui.min.js'
      },
      amd: {
        src: ['<banner:meta.banner>', '<config:rig.amd.dest>'],
        dest: 'lib/chat-game-ui.amd.min.js'
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: false,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true,
        Backbone: true,
        _: true
      }
    },
    uglify: {}
  });

  // Default task.
  // grunt.registerTask('default', 'lint concat rig min');
  grunt.registerTask('default', 'concat rig min');

};