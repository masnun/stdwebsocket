#!/usr/bin/env node

var spawn = require('child_process').spawn;
// First 2 elements contain node and script
var args = process.argv.slice(2);

var app = require('http').createServer(handler);
var io = require('socket.io').listen(app, { log: false });
var fs = require('fs');

app.listen(1337);

function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

io.sockets.on('connection', function (socket) {
    console.log('Websocket connected');

    if (typeof proc == 'undefined') {
        console.log('Spawning process');

        try {
            var proc = spawn(args[0], args.slice(1));

            // Child has output
            proc.stdout.on('data', function (data) {
                socket.emit('stdout', data.toString());
            });

            // Child has stderr output
            proc.stderr.on('data', function (data) {
                socket.emit('stderr', data.toString());
            });

            // Child has exited
            proc.on('close', function (code) {
                socket.emit('stdout', 'Child process exited with code ' + code);
            });

        } catch (err) {
            socket.emit('stderr', err.message);
        }


    }
});

