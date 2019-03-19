class Images {
    constructor() {
        const {Docker: Index} = require('node-docker-api');
        const docker = new Index({ socketPath: '/var/run/docker.sock' });
        this.docker = docker;
    }

    getImages() {
        return new Promise((resolve, reject) => {
            let resImages = [];
            this.docker.image.list().then(images => {
                for (const key in images) {
                    resImages.push(images[key].data);
                }
                resolve(resImages);
            })
        })
    }

    setImages() {
        const tar = require('tar-fs');

        const promisifyStream = stream => new Promise((resolve, reject) => {
            stream.on('data', data => console.log(data.toString()))
            stream.on('end', resolve)
            stream.on('error', reject)
        });

        const docker = new Docker({ socketPath: '/var/run/docker.sock' });

        var tarStream = tar.pack('/path/to/Dockerfile')
        docker.image.build(tarStream, {
            t: 'testimg'
        })
            .then(stream => promisifyStream(stream))
            .then(() => docker.image.get('testimg').status())
            .then(image => image.remove())
            .catch(error => console.log(error));
    }
}


module.exports = Images;