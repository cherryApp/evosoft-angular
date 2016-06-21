module.exports = grunt => {
	require('load-grunt-tasks')(grunt);
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> */\n'
          },
          build: {
            src: [
                'node_modules/jquery/dist/jquery.min.js',
                'node_modules/angular/angular.min.js',
                'node_modules/bootstrap/dist/js/bootstrap.min.js',
                'src/js/app.js'
            ],
            dest: 'build/js/<%= pkg.name %>.min.js'
          }
        },
        watch: {
          scripts: {
            files: [
                'src/js/**/*.js',
                'src/css/**/*.css',
                'src/**/*.html'
            ],
            tasks: ['dev'],
            options: {
                spawn: false,
                event: ['changed', 'added', 'deleted']
            }
          }
        }
    
    });

  // Load the plugin that provides the "uglify" task.
//  grunt.loadNpmTasks('grunt-contrib-uglify');
//  grunt.loadNpmTasks('grunt-contrib-watch');
//  grunt.loadNpmTasks('grunt-contrib-cssmin');
//  grunt.loadNpmTasks('grunt-contrib-copy');
//  grunt.loadNpmTasks('babel');

  // Default task(s).
  grunt.registerTask('dev', ['uglify']);
  grunt.registerTask('default', ['watch']);
 
	
};
