const path = require("path");

module.exports = {
    entry: "./agoraLogic.js",
    output: {
        filename: "bundledAgoraLogic.js",
        path: path.resolve(__dirname, "./dist"),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './'),
        },
        compress: true,
        port: 9000,
    },
};
