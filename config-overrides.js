const rewireCssModules = require('react-app-rewire-css-modules');
module.exports = function override(config, env){
    config = rewireCssModules(config, env);
    return config;
};



// const CopyWebpackPlugin = require('copy-webpack-plugin');
//
// module.exports = function override(config, env) {
//     /*if (!config.plugins) {
//         config.plugins = [];
//     }
//
//     config.plugins.push(
//         (process.env.NODE_ENV === 'production') ?
//             new CopyWebpackPlugin([{from: 'src/lib/legacyLib.js'}]) :
//             new CopyWebpackPlugin([{from: 'src/lib/legacyLib.js', to: 'dist'}])
//     );
// */
//     const path = require('path');
//
//
//     if (!config.resolve) {
//         config.resolve = {};
//     }
//     if (!config.resolve.extensions) {
//         config.resolve.extensions = [];
//     }
//     config.resolve.extensions.push('.scss');
//     if (!config.module) {
//         config.module = {};
//     }
//     if (!config.module.rules) {
//         config.module.rules = [];
//     }
//     config.module.rules.push(
//         { test: /\.tsx?$/, loader: 'awesome-typescript-loader' }
//     )
//     config.module.rules.push(
//         {
//             test: /\.scss$/,
//             include: [
//                 path.resolve(__dirname, 'src/components')
//             ],
//             exclude: [path.resolve(__dirname, 'node_modules')],
//             use: [
//                 {
//                     loader: 'style-loader'
//                 },
//                 {
//                     loader: 'typings-for-css-modules-loader',
//                     options: {
//                         modules: true,
//                         namedExport: true,
//                         camelCase: true,
//                         sourceMap: true
//                     }
//                 },
//                 {
//                     loader: 'sass-loader',
//                     options: {
//                         sourceMap: true,
//                         namedExport: true
//                     }
//                 }
//             ]
//         }
//     );
//     return config;
// };