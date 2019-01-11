class Configuration {
    constructor() {
        const fs = require("fs");
        const jsonContent = JSON.parse(fs.readFileSync("configuration.json"));
        this.headers = jsonContent.headers;
        this.port = jsonContent.port;
    }

    getHedaers() {
        return this.headers;
    }

    getPort() {
        return this.port;
    }
}

module.exports = Configuration;