module.exports = {
    presets: [
        ['@babel/env', {
            modules: false,
        }],
    ],
    plugins: [
        ['@babel/plugin-transform-object-assign'],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
};
