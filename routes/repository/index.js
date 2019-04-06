const Repository = require('./repository');

const Handler = require('../../handler');

const hanlder = new Handler([{
    method: 'get',
    path: '/dockerfiles',
    params: [],
    handler(headers) {
        headers.responseText('images');
    }
}, {
    method: 'get',
    path: '/dockerfiles/:name',
    params: [],
    handler(headers) {
        const {name} = headers.getParams();
        const repository = new Repository();

        repository.getDockerFiles(name).then(files => {
           headers.responseJson(files);
        }).catch(err => {
            headers.responseStatus(404);
            headers.responseText('Not found');
        });
    }
}, {
    method: 'get',
    path: '/dockerfiles/file/:path',
    params: [],
    handler(headers) {
        const {path} = headers.getParams();
        const repository = new Repository();
        repository.getFileText(path).then(text => {
            headers.responseJson(text)
        }).catch(err => {
            headers.responseStatus(404);
            headers.responseJson('Not found');
        })
    }
}]);


module.exports = hanlder.initRouters();