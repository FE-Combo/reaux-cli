const path = require("path");

const config = {
    port:8080,
    entry:path.join(process.cwd(),"src/index.tsx"),
    contentBase: path.join(process.cwd(),"src/static"),
    htmlTemplate:path.join(process.cwd(),"src/index.html") || path.resolve(__dirname,"../src/index.html")
}

module.exports = config;