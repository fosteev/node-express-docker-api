class Server {
    constructor(headers, port) {
        this.routes = [{
            route: '/',
            file: require('./routes/index')
        }, {
            route: '/config',
            file: require('./routes/index')
        }, {
            route: '/docker',
            file: require('./routes/docker')
        }, {
            route: '/git',
            file: require('./routes/git')
        }];

        const express = require('express');
        this.app = express();

        this.port = port;

        this.headers = headers;
    }

    setHeaders() {
        this.app.use((req, res, next) => {

            for (const key in this.headers) {
                const value = this.headers[key];
                res.header(key, value);
            }

            next();
        });
    }

    initRoutes() {
        this.routes.forEach(route => {
            this.app.use(route.route, route.file);
        });
    }

    cookieParser() {
        const cookieParser = require('cookie-parser');
        this.app.use(cookieParser());
        const bodyParser = require('body-parser');
        this.app.use(bodyParser.json({
            extended: true
        }))
    }

    start() {
        this.cookieParser();
        this.setHeaders();
        this.initRoutes();
        this.app.listen(this.port, () => {
            console.log(`Server has been start on port: ${this.port}`)
        });
    }
}

module.exports = Server;