class Headers {
    constructor(request, response) {
        if (!(request && response)) {
            throw new Error('Error constructor headers class');
        }
        this.request = request;
        this.response = response;
        this.multiparty = require('multiparty');
    }

    getFormParams() {
        return this.request.body;
    }

    getQueryParams() {
        return this.request.query;
    }

    responseText(text) {
        this.response.send(text);
    }

    responseJson(object) {
        this.response.json(object);
    }

    getRequest() {
        return this.request
    }

    getCookie() {
        return this.request.cookie
    }

    getParseFormData() {
        const form = new this.multiparty.Form();
        form.parse(this.request, function(err, fields, files) {
            console.log(err);
            console.log(fields);
        })
    }

    responseStatus(status) {
        if (typeof status !== 'number') {
            throw new Error('Status must be is number type.');
        }
        this.response.status(status);
    }

    checkParams(params) {
        const formParams = this.getFormParams();
        params.forEach(name => {
            if (!formParams[name]) {
                this.responseStatus(400);
                this.responseText(`Not have param: ${name}`);
            }
        })
    }
}

module.exports = Headers;