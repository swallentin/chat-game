module.exports = function(grunt) {

  // Projecet configuration
  grunt.initConfig({
    lint: {
      all: [
          "grunt.js", 
          "assets/js/app.js", 
          "assets/js/main.js", 
          "assets/js/collections/**.js", 
          "assets/js/models/**.js", 
          "assets/js/routers/**.js", 
          "assets/js/views/**.js",
          "assets/js/views/**/**.js",
          "assets/js/views/game/**/**.js"
        ]
    },
    // jshint: {
    //  options: {
    //    browser: true
    //  }
    // }
    concat: {
      dist: {
        src: [
          "assets/js/app.js", 
          "assets/js/main.js", 
          "assets/js/collections/**.js", 
          "assets/js/models/**.js", 
          "assets/js/routers/**.js", 
          "assets/js/views/**.js",
          "assets/js/views/**/**.js",
          "assets/js/views/game/**/**.js"
        ],
        dest: "assets/js/chat-game.js"
      }
    }
  });
};