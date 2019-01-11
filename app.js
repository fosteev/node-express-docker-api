const Server = require('./server');
const Configuration = require('./configuration');

const conf = new Configuration();
const App = new Server(conf.getHedaers(), conf.getPort());
App.start();