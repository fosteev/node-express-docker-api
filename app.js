const Server = require('./server');
const Configuration = require('./configuration');

String.prototype.replaceAll = function(search, replacement) {
    let target = this;
    return target.split(search).join(replacement);
};

const conf = new Configuration();
const App = new Server(conf.getHedaers(), conf.getPort());
App.start();