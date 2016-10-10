module.exports = {
    entry: './client/app.js',
    output: {
        path: __dirname,
        filename: './server/public/js/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: { presets: [ 'es2015', 'react' ] }
            }
        ]
    }
};
