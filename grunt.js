/*global module:false*/
module.exports = function(grunt) {

  var pathToUI = "assets/chat-game-ui/";
  grunt.loadNpmTasks('grunt-rigger');

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.2.0',
      banner: '// chat-game-ui, v<%= meta.version %>\n' +
        '// Copyright (c)<%= grunt.template.today("yyyy") %> Stephan Wallentin, EF Labs\n' + 
        '// http://github.com/englishtown/chat-game'
    },

    lint: {
      files: ['src/**/*.js']
    },

    concat: {
      dist: {
        src: [
          pathToUI + "src/models/**/*.js",
          pathToUI + "src/collections/**/*.js",
          pathToUI + "src/routers/**/*.js",
          pathToUI + "src/views/**/*.js",
          pathToUI + "src/app.js",
          pathToUI + "src/main.js"
        ],
        dest: pathToUI + "lib/chat-game-ui.js"
      },
      dev: {
        src: [
          pathToUI + "src/models/**/*.js",
          pathToUI + "src/collections/**/*.js",
          pathToUI + "src/routers/**/*.js",
          pathToUI + "src/views/**/*.js",
          pathToUI + "src/dev.js",
          pathToUI + "src/main.js"
        ],
        dest: pathToUI + "lib/chat-game-ui-dev.js"
      }
    },

    rig: {
      amd: {
        src: ['<banner:meta.banner>', 'src/amd.js'],
        dest: pathToUI + 'lib/chat-game-ui.amd.js'
      }
    },

    min: {
      standard: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: pathToUI + 'lib/chat-game-ui.min.js'
      },
      amd: {
        src: ['<banner:meta.banner>', '<config:rig.amd.dest>'],
        dest: pathToUI + 'lib/chat-game-ui.amd.min.js'
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