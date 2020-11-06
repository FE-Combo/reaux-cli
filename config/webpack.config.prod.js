const webpack = require("webpack");
const path = require("path");
const ForkTSCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

function resolve(relativePath) {
    return path.resolve(__dirname, `./${relativePath}`);
}

function createConfig (config){
    return  [
        {
            mode: "production",
            entry: {
                index: path.join(process.cwd(),config.entry),
            },
            output: {
                path: resolve("dist"),
                filename: "[name].js",
            },
            resolve: {
                extensions: [".ts", ".tsx", ".js", ".jsx", ".less", ".scss"],
                modules: [resolve("src"), "node_modules"],
            },
            optimization: {
                minimizer: [new TerserPlugin({include: /index\.min\.js$/})],
            },
            performance: {
                maxEntrypointSize: 720000,
                maxAssetSize: 1000000,
            },
            module: {
                rules: [],
            },
            plugins: [
                new ForkTSCheckerPlugin({
                    // TODO:
                    // tsconfig: resolve("tsconfig.json"),
                    // tslint: resolve("tslint.json"),
                    useTypescriptIncrementalApi: false,
                    workers: ForkTSCheckerPlugin.TWO_CPUS_FREE,
                }),
                new webpack.ProgressPlugin(),
            ],
        },
    ]   
}

module.exports = createConfig;
