class Repository {
    constructor() {
        this.cmd = require('node-cmd');
        const Configuration = require('../../configuration');
        this.configuration = new Configuration();
    }

    getDockerFiles(projectName) {
        return new Promise((resolve, reject) => {
            const path = `${this.configuration.getPath()}/${projectName}`;
            this.cmd.get(`find ${path} -name Dockerfile`, (err, data, stderr) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(
                        data
                            .split('\n')
                            .filter(v => v !== "")
                            .map(v => v.replace(path + '/', ""))
                    )
                }
            );
        })
    }

    getFileText(pathFile) {
        return new Promise((resolve, reject) => {

            const path = `${this.configuration.getPath()}/${pathFile
                .replaceAll('-', '/')
                .replaceAll('=', '-')}`;

            this.cmd.get(`cat ${path}`, (err, data, stderr) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(data)
                }
            );
        })

    }
}


module.exports = Repository;