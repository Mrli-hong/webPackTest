const path = require('path');
// 引入htmlWebpackPlugin
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env, argv) => {
    if (argv.mode === 'development' || !argv.mode) {
        return {
            // 多入口多输出
            entry: { name: './src/index.js', index: './src/index2.js' },

            // 多入口单输出
            //entry: ['./src/index.js', './src/index2.js'],
            mode: 'development', // mode: 'production',
            output: {
                path: path.resolve(__dirname, 'dist'),
                filename: 'src/[name]-[contenthash:6].js',
                // 设置静态bundle文件的名称,限制为webpack5
                assetModuleFilename: 'assets/[name]-[hash:6][ext]'
            },
            devtool: "source-map",
            // resolve: {
            //     alias: {
            //         // 配置style路径的别名
            //         style: path.resolve(__dirname, 'src/style/')
            //     },
            // },
            devServer: {
                open: true,
                proxy: {
                    '/api': {
                        target: 'http://localhost:3000',  // 代理地址
                        pathRewrite: { '^/api': '' },   // 重写路径
                        secure: false,  // 使用https
                        changeOrigin: true   // 覆盖主机源
                    },
                },
            },
            module: {
                noParse: /jquery|lodash/, // 不解析jquery和lodash
                rules: [
                    {
                        test: /\.js$/,
                        use: 'babel-loader',
                    },
                    // {
                    //     test: /\.js$/,
                    //     exclude: /node_modules/,
                    //     // loader 对象写法传递配置参数
                    //     use: {
                    //         loader: 'babel-loader',
                    //         options: {
                    //             presets: ['@babel/preset-env']
                    //         }
                    //     }
                    // },
                    // {
                    //     test: /\.css$/,
                    //     // loader 数组写法传递配置参数
                    //     use: ['style-loader', 'css-loader']
                    // },
                    {
                        test: /\.css$/,
                        // loader 数组写法传递配置参数
                        use: [miniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
                        //include: [path.resolve(__dirname, 'src')]  // 只解析src路径下的css
                    },
                    {
                        test: /\.(scss|sass)$/,
                        use: [miniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
                    },

                    {
                        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                        type: "asset/resource", // 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
                    }

                    // {
                    //     test: /\.(png|je?pg|gif|webp)$/,
                    //     use: [{
                    //         loader: 'url-loader',
                    //         options: {
                    //             name: '[name].[ext]',// 使用占位符设置导出名称
                    //             limit: 1024 * 10, // 设置转成base64阈值，大于10k不转成base64(即不适用data URL)
                    //         }
                    //     }]
                    // },
                    // {
                    //     test: /\.(png|je?pg|gif|webp)$/,
                    //     use: [{
                    //         loader: 'file-loader',
                    //         // options: {
                    //         //     name: '[name].[ext]',   // 使用占位符设置导出名称,导出单独文件，命名默认hash值，为URL形式
                    //         // }
                    //     }],
                    // },

                ]
            },
            plugins: [
                new BundleAnalyzerPlugin({
                    analyzerMode: 'disabled',
                    generateStatsFile: true
                }),
                new miniCssExtractPlugin({
                    filename: 'assets/[name]-[chunkhash:6].css'
                }),
                new CleanWebpackPlugin({
                    // dry: true   // 打开可测试，不会真正执行删除动作
                    cleanOnceBeforeBuildPatterns: [
                        '**/*',  // 删除dist路径下所有文件
                        `!package.json`,  // 不删除dist/package.json文件
                    ],

                }),
                new htmlWebpackPlugin({
                    template: './index.html',
                    filename: 'index.html',
                    chunks: ["name"]
                })
                , new htmlWebpackPlugin({
                    template: './index.html',
                    filename: 'aa2.html',
                    chunks: ["index"]
                })
            ]
        }
    };
}
