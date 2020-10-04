## 1.初始化项目
    1). 生成package.json
        yarn init -y
    2).创建入口js:src/index.js
        console.log('Hello Webpack!')
        document.getElementById('root').innerHTML = '<h1>你好</h1>'
    3).创建页面文件:index.html
        <div id= 'root'></div>

## 2. webpack基本使用
    1).下载依赖包
        yarn add -D webpack webpack-cli
        yarn add -D html-webpack-plugin

    2).创建webpack配置: webpack.config.js
        const path = require('path')
        const HtmlWebpackPlugin =require('html-webpack-plugin')

        module.exports = {
            //模式:生产环境
            mode:'production',
            //入口
            entry:{
                app:path.resolve(__dirname,'src/index.js')
            },
            //出口(打包生成JS)
            output:{
                filename:'static/js/[name].bundle.js',
                path:path.resolve(__dirname,'dist')
            },
            //模块加载器
            module:{
                rules:[

                ]
            },
            //插件
            plugins:[
                new HtmlWebpackPlugin({
                    template:'index.html',
                    filename:'index.html'
                })
            ]
        }
    3).生成环境打包并运行
        配置打包命令: 'build':'webpack --mode production'
        打包项目:yarn build 
        运行打包项目:serve dist

## 3. 开发环境运行
    1).问题:每次修改项目代码后，必须重新打包，重新运行

    2).下载依赖包
       yarn add -D webpack-dev-server

    3).配置开发服务器
        devServer:{
            open:true,//自动打开浏览器
            quiet:true ,//不做太多日志输出
        }

    4).配置开启source-map调试
    devtool:'cheap-module-eval-source-map'

    5).开发环境运行
        配置命令:'dev':'webpack-dev-server --mode development'
        执行命令: yarn dev

## 搭建Vue的开发环境
    1).配置处理.Vue组件文件的loader和plugin
    2).配置使用vue-style-loader替换style-loader
    3).解决无法编译vue模版的错误
        原因:默认引入的vue是不带编译器的版本，无法对template配置指定模版进行编译
        解决:配置模块别名来指定引入vue带编译器的版本
            //引入模块解析
    resolve:{
        extensions:['.js','.vue','.json'],//可以省略的后缀
        alias:{ //路径别名
            'vue$':'vue/dist/vue.esm.js' 
        }
    }
    4).配置省略模块后缀名(.js/.vue/.json)
## 解决开发环境ajax请求跨域问题
    1）利用webpack-dev-server进行请求代理转发
        webpack-dev-server内部利用http-proxy-middle包对特点的请求进行转发操作
    2)    
    webpack文档中的配置的devServer的proxy

## 解决async/await的编译环境
    1）下载包 
        yarn add @babel/runtime-corejs2
    2)配置
        presets:[
            ['@babel/preset-env',{
                useBuiltIns:'usage',
                'corejs':2 //处理新语法的实现
            }]
        ]

## 8.解决mint-ui按需引入配置异常的问题
    1)文档的配置
        "plugins":[
            ["component",[
                {
                    "libraryName":"mint-ui",
                    "style":true
                }
            ]]
        ]

    2)异常信息：
      Error:.plugins[0][1] must be an Object，false or undefined
    3)原因:
        文档编写时，是根据老的babel版本编写的，新版本的babel配置变化了
    4)修正:
        "plugins":[
            ["component",{
                {
                    "libraryName":"mint-ui",
                    "style":true
                }
            }]
        ]