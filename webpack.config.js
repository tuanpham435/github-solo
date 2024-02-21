const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Exporting webpack configuration
module.exports = {
    // Entry point of the application
    entry: "./app/index.jsx",

    // Output configuration
    output: {
        // Output directory for bundled files
        path: path.resolve(__dirname, "dist"),

        // Output filename for the bundled JavaScript file
        filename: "index_bundle.js"
    },

    // Module configuration
    module: {
        // Rules for different file types
        rules: [
            // Rule for handling JavaScript and JSX files using babel-loader
            {test: /\.(js|jsx)$/, use: "babel-loader"},

            // Rule for handling CSS files using style-loader and css-loader
            {test: /\.css$/, use: ["style-loader", "css-loader"]}
        ]
    },

    /*
    Trong webpack configuration, "..." không phải là một cú pháp hợp
    lệ. Đối với phần resolve, mục đích chính là liệt kê các phần mở
    rộng của tệp tin mà webpack sẽ cố gắng tìm khi import một module.
    Trong trường hợp này, nếu bạn muốn bao gồm cả các tệp có phần mở
    rộng .jsx, .js, và bất kỳ phần mở rộng nào khác
     */
    resolve: {
        extensions: [".jsx", "..."]
    },

    // Set the mode based on the NODE_ENV environment variable
    mode: process.env.NODE_ENV === 'production'
        ? 'production'
        : 'development',

    // Plugins configuration
    plugins: [
        // Use HtmlWebpackPlugin to simplify the creation of an HTML file to include the bundled script
        new HtmlWebpackPlugin({
            template: "app/index.html", // Specify the HTML template
        }),
    ],
};
