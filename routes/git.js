const express = require('express');
const router = express.Router();
const fs = require('fs');
const os = require('os');
const Git = require("nodegit");

const path = os.homedir() + '/projects';

function getProjectFolders(callback) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            resolve(files);
            if (err) {
                reject(err);
            }
        })
    })

}

router.get('/', (req, res) => {
    getProjectFolders().then(files => res.json(files));
})

function getGitRepository(name) {
    return new Promise((resolve, reject) => {
        Git.Repository.open(path + '/' + name)
            .then(rep => resolve(rep))
            .catch(err => reject(err));
    })
}

function getRepository(req, res) {
    return new Promise((resolve, reject) => {
        const {name} = req.params;
        getProjectFolders().then(files => {
            if (!files.includes(name)) {
                res.status(404).send('Not found project');
                throw new Error('getProjectFolders');
            }
            getGitRepository(name).then(repository => resolve(repository));
        })
    });
}

router.get('/:name', (req, res) => {
    getRepository(req, res).then(async repository => {
        const statuses = await repository.getStatus();
        const head = await repository.head();
        const currentBranch = await repository.getCurrentBranch();
        const lastCommit = await repository.getBranchCommit(currentBranch.shorthand())
        const refs = await repository.getReferences();
        const remotes = await repository.getRemotes();
        const all = await repository.getReferenceNames();
        const remote = await repository.getRemote('origin');
       // const remoteList = await remote.referenceList();

        if (remote.connected() == 0) {

        }

        res.json({
            head: head.shorthand(),
            changes: statuses.map(diffFile => diffFile.path()),
            branch: {
                name: currentBranch.name(),
                owner: currentBranch.owner().state()
            },
            remotes: remotes.map(remote => remote),
            remote: remote.connected(),
            references: all,
            branches: refs.map(ref => ref.isBranch()),
            lastCommit: {
                author: lastCommit.author().toString(),
                message: lastCommit.message(),
                time: lastCommit.time(),
                date: lastCommit.date()
            }
        });
    })
});


module.exports = router;