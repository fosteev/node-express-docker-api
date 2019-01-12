const os = require('os');
const fs = require('fs');
const cmd = require('node-cmd');
const Configuration = require('../../configuration');

class Settings {
    constructor() {
        this.projectsPath = this.getDefaultPath();
        this.cmdGitPubKey = 'cat ~/.ssh/id_rsa.pub';
    }

    getDefaultPath() {
        const configuration = new Configuration();
        return configuration.getPath();
    }

    getProjectPath() {
        return this.projectsPath;
    }

    setProjectsPath(path) {
        this.projectsPath = path;
    }

    getProjectFolders() {
        return new Promise((resolve, reject) => {
            fs.readdir(this.projectsPath, (err, files) => {
                resolve(files);
                if (err) {
                    reject(err);
                }
            })
        })
    }

    setStringCmdForGitPublicKey(cmd) {
        if (typeof cmd !== 'string') {
            throw new Error('Cmd must be string');
        }
        this.cmdGitPubKey = cmd;
    }

    getGitPublicKey() {
        return new Promise((resolve, reject) => {
            cmd.get(this.cmdGitPubKey, (err, data, stderr) => {
                    resolve(data);
                    if (err) {
                        reject(err);
                    }
                }
            );
        })
    }

    gitStatus(name) {
        if (!name) {
            throw new Error('Argument name undefined');
        }
        const path = `${this.getProjectPath()}/${name}`;
        return new Promise((resolve, reject) => {
            cmd.get(`cd ${path} && git status`, (err, data, stderr) => {
                    resolve(data);
                    if (err) {
                        reject(err);
                    }
                }
            )
        })
    }

    gitBranches(name) {
        if (!name) {
            throw new Error('Argument name undefined');
        }
        const path = `${this.getProjectPath()}/${name}`;
        return new Promise((resolve, reject) => {
            cmd.get(`cd ${path} && git show-branch --list`, (err, data, stderr) => {
                    resolve(data.split("\n").filter(item => item));
                    if (err) {
                        reject(err);
                    }
                }
            )
        })
    }
}

module.exports = new Settings();