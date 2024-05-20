// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// // export default nextConfig;
// export function webpack(config, options) {
//     const { isServer } = options;
//     config.module.rules.push({
//         test: /\.(ogg|mp3|wav|mpe?g)$/i,
//         exclude: config.exclude,
//         use: [
//             {
//                 loader: require.resolve('url-loader'),
//                 options: {
//                     limit: config.inlineImageLimit,
//                     fallback: require.resolve('file-loader'),
//                     publicPath: `${config.assetPrefix}/_next/static/images/`,
//                     outputPath: `${isServer ? '../' : ''}static/images/`,
//                     name: '[name]-[hash].[ext]',
//                     esModule: config.esModule || false,
//                 },
//             },
//         ],
//     });

//     return config;
// }
//const withCSS = require('@zeit/next-css');
import compose from 'next-compose';
//cssConfig = {};
export default compose([
//[withCSS, cssConfig],
{
webpack(config, options) {
config.module.rules.push({
test: /.mp3$/,
use: {
loader: 'file-loader',
},
});
return config;
},
},
]);