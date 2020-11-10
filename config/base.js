const path = require("path");
const fs = require("fs-extra");
const customHtmlTemplatePath = path.join(process.cwd(),"src/index.html")

const config = {
    port:8080,
    entry:path.join(process.cwd(),"src/index.tsx"),
    contentBase: path.join(process.cwd(),"src/static"),
    htmlTemplate:fs.pathExistsSync(customHtmlTemplatePath) ? customHtmlTemplatePath : path.resolve(__dirname,"../src/index.html")
}

module.exports = config;