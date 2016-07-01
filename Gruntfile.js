// 包装函数
module.exports = function(grunt) {

  // 任务配置,所有插件的配置信息
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // uglify插件的配置信息
    uglify: {
        options: {
          banner: '/*! This is uglify test - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        app_task: {
          files: {
            'index.min.js': ['vimwiki.js', 'jquery-1.4.2.min.js']
          }
        }
    },


    // watch插件的配置信息
    watch: {
        another: {
            files: ['*.js'],
            tasks: ['uglify'],
            options: {
                // Start another live reload server on port 1337
                livereload: 1337
            }
        }
    },

 //压缩css
    cssmin: {
            //文件头部输出信息
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                //美化代码
                beautify: {
                    //中文ascii化，非常有用！防止中文乱码的神配置
                    ascii_only: true
                },
		        keepSpecialComments:0
            },
	        compress:{
		    files:{
		        'style.min.css':['style.css']
		          }
	        }
        }
    }


  );

  // 告诉grunt我们将使用插件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // 告诉grunt当我们在终端中输入grunt时需要做些什么
  grunt.registerTask('default', ['uglify','cssmin']);

};
