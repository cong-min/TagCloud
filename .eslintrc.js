module.exports = {
    extends: ['soda-works'],
    parser: 'babel-eslint',
    globals: {
        // [key] 填入项目内需要的全局变量
        // [value] Boolean 表示这个全局变量是否允许被重新赋值
        window: false,
        document: false,
    },
};
