const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
    //模式:生产环境
    // mode:'production',
    //入口
    entry: {
        app: path.resolve(__dirname, 'src/index.js') //在当前目录的
    },
    //出口(打包生成JS)
    output: {
        filename: 'static/js/[name].bundle.js', //输出到'dist'文件夹下指定的filename位置,其中[name]为entry对象的key(app)
        path: path.resolve(__dirname, 'dist'),//__dirname：代表当前文件所在目录的绝对路径
        publicPath: "/"  //引入打包文件时，路径以 / 开头
    },
    //模块加载器
    module: {
        rules: [
            //将ES6 -->转为ES5
            {
                test: /\.js$/, //用于匹配文件（对哪些文件进行处理）
                exclude: /(node_modules|bower_components)/, //不针对这些文件进行处理
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env',{
                                useBuiltIns:'usage',
                                'corejs':2 //处理新语法的实现
                            }]
                        ]
                    }
                }
            },
            //配置CSS
            {
                test: /\.css$/, //  vue-style-loader:不生效
                use: ['style-loader', 'css-loader']
            },
            //处理图片
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'static/img/[name].[hash:7].[ext]'
                        }
                    }
                ]
            },
            //配置处理.vue文件
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    // 配置开发服务器
    devServer: {
        open: true,//自动打开浏览器
        quiet: true,//不做太多日志输出
        proxy: { //解决ajax跨域
            "/api": {
              target: "http://localhost:3000",
              pathRewrite: {"^/api" : ""}
            }
        },
        historyApiFallback: true//当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    },
    // 配置开启source-map调试
    devtool: 'cheap-module-eval-source-map',
    //插件
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html', //将哪个页面作为模版页面进行解析处理(在根目录进行查找)
            filename: 'index.html'//生成的页面(在output指定的path下)
        }),
        new VueLoaderPlugin()
    ],
    //引入模块解析
    resolve:{
        extensions:['.js','.vue','.json'],//可以省略的后缀
        alias:{ //模块路径别名
            'vue$':'vue/dist/vue.esm.js',  //表示精准匹配， 带vue的编译器
            '@':path.resolve(__dirname,'src'),
            '@components':path.resolve(__dirname,'src/components')
        }
    } 
}