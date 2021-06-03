const path = require('path')
module.exports = {
    configureWebpack: {
        externals: {
            echarts: "echarts" // 配置使用CDN
        },

    },
    configureWebpack: config => {
        config.resolve = {
            // 配置解析别名
            extensions: [".js", ".json", ".vue"],
            alias: {
                "@": path.resolve(__dirname, "./src"),
                "@c": path.resolve(__dirname, "./src/components")
            }
        };
    },
    lintOnSave:false,
    devServer: {
        port: 8090,
        proxy: {
            '/': {
                target: 'http://41.246.168.57:9090',
                ws: false,
                changeOrigin: true
            }
        }
    },
    publicPath: '/'
}