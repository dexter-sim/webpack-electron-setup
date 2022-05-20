const HtmlWebpackPlugin = require('html-webpack-plugin');
const { spawn } = require('child_process');
const path = require("path")

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean:true
    },
    plugins: [ 
        new HtmlWebpackPlugin( { 
            template: path.resolve(__dirname, './src/template.html') 
        } )
    ],
    devServer: {
        onBeforeSetupMiddleware: function (devServer) {
            if (!devServer) {
                throw new Error('webpack-dev-server is not defined');    
            }
            
            spawn(
                'electron',
                ['.'],
                { shell: true, env: process.env, stdio: 'inherit' }
            )
            .on('close', code => process.exit(0))
            .on('error', spawnError => console.error(spawnError))
        },    
    }
}