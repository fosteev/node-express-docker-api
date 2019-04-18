const Images = require('./images');
const Containers = require('./containers');

const Handler = require('../../handler');

const getErrorStatusCode = code => {
    const notFoundCode = 1;
    const objectDublicateCode = 125;
    const codes = {};
    codes[notFoundCode] = 404;
    codes[objectDublicateCode] = 400;
    return codes[code] ? codes[code] : 500
}

const hanlder = new Handler([{
    method: 'get',
    path: '/',
    params: [],
    handler(headers) {
        headers.responseText('images');
    }
}, {
    method: 'get',
    path: '/images',
    params: [],
    handler(headers) {
        const images = new Images();
        images.getImages().then(images => {
            headers.responseJson(images);
        })
    }
}, {
    method: 'post',
    path: '/images',
    params: ['path', 'name', 'tag'],
    handler(headers) {
        const {path, name, tag} = headers.getFormParams();
        const images = new Images();

        images.buildImage(
            path.replaceAll('-', '/')
                .replaceAll('=', '-'),
            name,
            tag
        ).then(data => {
            headers.responseJson(data);
        })
    }
}, {
    method: 'get',
    path: '/containers',
    params: [],
    handler(headers) {
        const containers = new Containers();
        containers.getContainers()
            .then(containers => headers.responseJson(containers))
    }
}, {
    method: 'post',
    path: '/containers',
    params: [],
    handler(headers) {
        const {image, name, inPort, outPort} = headers.getFormParams();
        const containers = new Containers();

        containers.setContainer(String(image), String(name), Number(inPort), Number(outPort))
            .then(resp => headers.responseJson(resp))
            .catch(err => {
                headers.responseStatus(getErrorStatusCode(err.code));
                headers.responseJson(err);
            })
    }
}, {
    method: 'put',
    path: '/containers/:id',
    params: [],
    handler(headers) {
        const {id} = headers.getParams();
        const containers = new Containers();
        containers.stopContainer(id)
            .then(resp => headers.responseJson(resp))
            .catch(err => {
                headers.responseStatus(getErrorStatusCode(err.code));
                headers.responseJson(err);
            })
    }
}, {
    method: 'delete',
    path: '/containers/:id',
    params: [],
    handler(headers) {
        const {id} = headers.getParams();
        const containers = new Containers();

        containers.removeContainer(id)
            .then(resp => headers.responseJson(resp))
            .catch(err => {
                headers.responseStatus(getErrorStatusCode(err.code));
                headers.responseJson(err);
            })
    }
}]);


module.exports = hanlder.initRouters();