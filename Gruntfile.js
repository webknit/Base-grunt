module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            // 2. Configuration for concatinating files goes here.
            dist: {
		      src: ['assets/js/libs/*.js','assets/js/*.js'],
		      dest: 'assets/js/deployment.js'
		    }
        },
        
        uglify: {
		    build: {
		        src: 'assets/js/deployment.js',
		        dest: 'assets/js/deployment.min.js'
		    }
		},
		
		imagemin: {
		    dynamic: {
		        files: [{
		            expand: true,
		            cwd: 'assets/img/',
		            src: ['**/*.{png,jpg,gif}'],
		            dest: 'assets/img/'
		        }]
		    }
		},
		
		sass: {
		    dist: {
		        options: {
		            style: 'compressed'
		        },
		        files: {
		            'style.css': 'assets/SASS/style.scss',
		            'assets/css/min-30.css': 'assets/SASS/min-30.scss',
		            'assets/css/min-48.css': 'assets/SASS/min-48.scss',
		            'assets/css/desktop.css': 'assets/SASS/desktop.scss',
		            'assets/css/high-res.css': 'assets/SASS/high-res.scss',
		        }
		    } 
		},
		
			// Minify css - please note you can minify different files using multiple configurations
        cssmin: {
			min30: {
                src: 'assets/css/min-30.css',
                dest: 'assets/css/min-30.min.css'
            },
			min48: {
                src: 'assets/css/min-48.css',
                dest: 'assets/css/min-48.min.css'
            },
			desktop: {
                src: 'assets/css/desktop.css',
                dest: 'assets/css/desktop.min.css'
            },	
			hires: {
                src: 'assets/css/high-res.css',
                dest: 'assets/css/high-res.min.css'
            }      
        },
		
		watch: {
			options: {
		        livereload: true,
		    },
		    scripts: {
		        files: ['assets/js/*.js', 'assets/js/**/*.js'],
		        tasks: ['concat'],
		        options: {
		            spawn: false,
		        },
		    },
		    sass: {
			    files: ['assets/SASS/*.scss'],
			    tasks: ['sass'],
			    options: {
			        spawn: false,
			    }
			}/*
			css: {
			    files: ['assets/css/*.css', 'style.css'],
			    tasks: ['cssmin'],
			    options: {
			        spawn: false,
			    }
			}*/
		}

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    //grunt.registerTask('default', ['watch', 'uglify', 'imagemin']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['concat', 'uglify', 'imagemin', 'sass']);

};
