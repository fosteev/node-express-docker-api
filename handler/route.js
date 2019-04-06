const Headers = require('./headers');

class Route {
    constructor(options) {
        if (!options) {
            throw new Error('Error constructor route');
        }
        const {method, path, handler, params} = options;
        if (!(method && path && handler)) {
            throw new Error('Error constructor settings params');
        }

        this.method = method;
        this.path = path;
        this.handler = handler;
        this.params = params;

    }

    getHandler(request, response) {
        const headers = new Headers(request, response);
        headers.checkParams(this.params);
        return this.handler(headers);
    }

    getMethod() {
        return this.method;
    }

    getPath() {
        return this.path;
    }
}

module.exports = Route;