const express = require('express');
const router = express.Router();
const Git = require("nodegit");
const Settings = require('../BaseClass');

router.get('/', async (req, res) => {
    const files = await Settings.getProjectFolders();
    const key = await Settings.getGitPublicKey();

    res.json({
        repository: files,
        gitPublicKey: key
    })
});



router.get('/projects', async (req, res) => {
    res.json({
        path: Settings.getProjectPath(),
        folders: await Settings.getProjectFolders()
    })
});

router.post('/projects', (req, res) => {
    let {path} = req.query;

    if (typeof path !== 'string') {
        res.status(400).send('Must be string');
    }

    if (path === 'default') {
       path = Settings.getDefaultPath();
    }

    Settings.setProjectsPath(path);
    res.send();
});

function getGitRepository(name) {
    const path = Settings.getProjectPath();
    return Git.Repository.open(path + '/' + name);
}

function getRepository(req, res) {
    return new Promise((resolve, reject) => {
        const {name} = req.params;
        Settings.getProjectFolders().then(files => {
            if (!files.includes(name)) {
                res.status(404).send(`Not found project: ${name}`);
                throw new Error('getProjectFolders');
            }
            getGitRepository(name).then(repository => resolve(repository));
        })
    });
}

router.get('/projects/:name', (req, res) => {
    getRepository(req, res).then(async repository => {
        const {name} = req.params;
        const statuses = await repository.getStatus();
        const head = await repository.head();
        const currentBranch = await repository.getCurrentBranch();
        const lastCommit = await repository.getBranchCommit(currentBranch.shorthand())
        const refs = await repository.getReferences();
        const remotes = await repository.getRemotes();
        const all = await repository.getReferenceNames();
        const remote = await repository.getRemote('origin');
        const gitStatusText = await Settings.gitStatus(name);
        const branches = await Settings.gitBranches(name);

        res.json({
            head: head.shorthand(),
            changes: statuses.map(diffFile => diffFile.path()),
            gitBranches: branches,
            branch: {
                name: currentBranch.name(),
                owner: currentBranch.owner().state()
            },
            statusText: gitStatusText.split("\n"),
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