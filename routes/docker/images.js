class Images {
    constructor() {
        this.cmd = require('node-cmd');
    }

    /*
       return array
       [0]REPOSITORY
       [1]TAG
       [2]IMAGE ID
       [3]CREATED
       [4]SIZE -- MB

    */

    getImages() {
        return new Promise((resolve, reject) => {
            const format = `"{{.Repository}}={{.Tag}}={{.ID}}={{.CreatedAt}}={{.Size}}"`;

            this.cmd.get(`sudo docker images --format ${format}`, (err, data, stderr) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(
                        data.split('\n')
                            .filter(v => v)
                            .map(image => image.split('='))
                            .map(item => {
                                return {
                                    name: item[0],
                                    tag: item[1],
                                    imageId: item[2],
                                    createAt: item[3],
                                    size: item[4]
                                }
                            })
                    )
                }
            );
        })
    }
}


module.exports = Images;