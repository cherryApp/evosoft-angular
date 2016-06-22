module.exports = grunt => {
	require('load-grunt-tasks')(grunt);
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> */\n',
            sourceMap: true
          },
          build: {
            src: [
                'node_modules/jquery/dist/jquery.min.js',
                'node_modules/angular/angular.min.js',
                'node_modules/bootstrap/dist/js/bootstrap.min.js',
                'temp/babel.js'
            ],
            dest: 'build/js/<%= pkg.name %>.min.js'
          }
        },
        copy: {
            files: {
                src: 'src/index.html',
                dest: 'build/index.html'
            },
            css: {
                src: 'node_modules/bootstrap/**',
                dest: 'build/'
            },
            html: {
                expand: true,
                cwd: 'src/',
                src: 'template/**/*.html',
                dest: 'build/'
            } 
        },
        concat: {
            options: {
              separator: ';',
            },
            dist: {
              src: [
                  'src/js/app.js',
                  'src/js/factory/**/*.js',
                  'src/js/directive/**/*.js',
                  'src/js/controller/**/*.js'
              ],
              dest: 'temp/built.js',
            }
          },
        "babel": {
            options: {
              sourceMap: true,
              presets: ['babel-preset-es2015']
            },
            dist: {
              files: {
                'temp/babel.js': 'temp/built.js'
              }
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
  grunt.registerTask('dev', ['concat', 'babel', 'uglify', 'copy']);
  grunt.registerTask('default', ['watch']);
 
	
};
