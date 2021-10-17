module.exports = {
    devServer: {
        proxy: 'https://api.artic.edu/'
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-artworks/'
    : '/'
}