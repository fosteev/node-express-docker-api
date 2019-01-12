class Configuration {
    constructor() {
        const fs = require("fs");
        const jsonContent = JSON.parse(fs.readFileSync("configuration.json"));
        this.headers = jsonContent.headers;
        this.port = jsonContent.port;
        this.path  = jsonContent.path;
    }

    getHedaers() {
        return this.headers;
    }

    getPort() {
        return this.port;
    }

    getPath() {
        return this.path;
    }
}

module.exports = Configuration;