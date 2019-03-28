const Images = require('./images');
const Containers = require('./containers');

const Handler = require('../../handler');

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
        headers.responseJson({image, name, inPort, outPort});
    }
}]);


module.exports = hanlder.initRouters();