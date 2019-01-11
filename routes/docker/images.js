class Images {
    constructor(docker) {
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
}


module.exports = Images;