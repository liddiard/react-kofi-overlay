const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader', // Injects styles into DOM
          {
            loader: 'css-loader',
            options: {
              modules: true, // Enables CSS Modules and exports class names as JS objects
            },
          },
          'sass-loader', // Compiles Sass to CSS
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            // preserve "use client" directive (inserted below w/ BannerPlugin)
            // https://github.com/terser/terser?tab=readme-ov-file#compress-options
            directives: false
          }
        }
      }),
    ],
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
    libraryTarget: 'umd',
    library: 'KofiDonate',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  plugins: [
    // Inject a "use client" at the top of the bundle so frameworks like
    // Next.js see it as a boundary between client and server.
    // This feels a little hacky so hopefully this can be improved with better
    // webpack support in the future.
    new webpack.BannerPlugin({
      // https://webpack.js.org/plugins/banner-plugin/#options
      banner: "'use client';",
      raw: true,
      include: [/\.(ts|tsx|js)$/]
    }),
  ],
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
};