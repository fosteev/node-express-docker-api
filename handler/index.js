class Handler {
    constructor(routers) {
        this.express = require('express');
        this.router = this.express.Router();
        this.route = require('./route.js');

        if (!(routers && routers.length)) {
            throw new Error('Error use class handler');
        }

        this.routers = routers;
    }

    getRoute(options) {
        const route = require('./route.js');
        return new route(options);
    }

    initRouters() {
        this.routers.forEach(options => {
            const route = this.getRoute(options);
            const method = route.getMethod();
            const path = route.getPath();
            this.router[method](path, (req, res) => {
                route.getHandler(req, res);
            });
        });

        return this.router;
    }

}

module.exports = Handler;