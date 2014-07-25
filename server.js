#! /usr/bin/env node

// This script starts multiple server proceses using Node's cluster module.
// If an unexpected error occurs, one process is killed and another will start.
// See http://nodejs.org/api/cluster.html

var app = require('./index');
var cluster = require('cluster');
var port = process.env.PORT || 7080;
var workerCount = process.env.WORKER_COUNT || 2;

function startNewWorkers() {
  var activeWorkers = Object.keys(cluster.workers).length;
  var workersToStart = workerCount - activeWorkers;

  for (var i = 0; i < workersToStart; i++) {
    var worker = cluster.fork();
    console.log('Starting new worker with PID %d', worker.process.pid);
  }
}

cluster.on('online', function (worker) {
  console.log('Worker with PID %d listening on port %d', worker.process.pid, port);
});

// spawn new workers if any die
cluster.on('exit', function (worker) {
  console.log('Worker with PID %s died', worker.process.pid);
  startNewWorkers();
});

if (cluster.isMaster) {
  startNewWorkers();
} else {
  app.listen(port);
}
