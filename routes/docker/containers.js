class Container {
    constructor(docker) {
        this.docker = docker;
    }

    getContainers() {
        return new Promise((resolve, reject) => {
            let resContainers = [];
            this.docker.container.list().then(containers => {
                for (const key in containers) {
                    resContainers.push(containers[key].data);
                }
                resolve(resContainers);
            })
        })
    }

    setContainer(image, container_port, exposed_port, name) {
        return new Promise((resolve, reject) => {
            const exposedPorts = {};

            if (!(container_port && exposed_port && image, name)) {
                reject('No have params', 403);
            }

            const hostContainerPort = `${container_port}/tcp`;

            exposedPorts[hostContainerPort] = [{
                "HostPort": exposed_port.toString(),
                "HostIp": "0"
            }]

            const params = {
                Image: image,
                name: name,
                ExposedPorts: {},
                HostPort: {
                    PortBindings: exposedPorts
                }
            };

            params.ExposedPorts[hostContainerPort] = {};

            this.docker.container.create(params)
                .then(container => container.start())
                .then(container => resolve(container.data))
                .catch(error => {
                    const {json, statusCode} = error;
                    if (!statusCode) {
                        reject('Error add', 500);
                    }
                    resolve(json);
                });
        })
    }
}

module.exports = Container;