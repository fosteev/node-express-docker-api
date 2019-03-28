class Container {
    constructor() {
        this.cmd = require('node-cmd');
    }

    dataParsing(data) {
        return data.split('\n').filter(v => v).map(v => v.split('='))
    }

    /*
       return array
       [0]ID
       [1]IMAGE -- string
       [2]COMMAND
       [3]CREATE AT
       [4]SIZE -- mb
       [5]STATUS
       [6]PORTS
       [7]NAME
   */

    getContainers() {
        return new Promise((resolve, reject) => {
            const format = `"{{.ID}}={{.Image}}={{.Command}}={{.CreatedAt}}={{.Size}}={{.Status}}={{.Ports}}={{.Names}}"`;

            this.cmd.get(`sudo docker ps --format ${format}`, (err, data, stderr) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(this.dataParsing(data).map(item => {
                        return {
                            id: item[0],
                            image: item[1],
                            command: item[2],
                            createAt: item[3],
                            size: item[4],
                            status: item[5],
                            port: item[6],
                            name: item[7]
                        }
                    }))
                }
            )
        })
    }

    setContainer(image, container_port, exposed_port, name) {
        return new Promise((resolve, reject) => {
            this.cmd.get('docker run -d -p 30096:80 --name pilot_admin_frontend pilot_admin_frontend', function () {
                
            })
        })
    }
}

module.exports = Container;