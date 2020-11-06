const chalk = require("chalk");
const webpack = require("webpack");
const DevServer = require("webpack-dev-server");
const createConfig = require("./config")

function start() {
    const config = createConfig();
    const compiler = webpack(config.webpackDevConfig);
    const server = new DevServer(compiler,config.devServerConfig)
    server.listen(config.baseConfig.port, "0.0.0.0", (error) => {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        console.info(chalk`starting dev server on {green http://localhost:${config.baseConfig.port}/} \n`);
        return null;
    });

    ["SIGINT", "SIGTERM"].forEach((signal) => {
        process.on(signal, () => {
            server.close();
            process.exit();
        });
    });
}

start();
