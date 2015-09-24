/**
 * Created by rvv938 on 5/7/2015.
 */
var mongo = require('mongodb').MongoClient,
    client = require('socket.io').listen(8080);

var http = require('http');
var fs = require('fs');


var server = http.createServer(function (req, res) {

    /*
     var rstream= fs.createReadStream('index.html')
     rstream.pipe(res);
     */

    fs.readFile('index.html', function (err, page) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(page);
        res.end();
    });

});
server.listen(8000, '127.0.0.1');  // start


mongo.connect('mongodb://127.0.0.1/SoorenaChat', function (err, db) {
    if (err)
        throw  err;
    // name of table
    var col = db.collection('messages');


    client.on('connection', function (socket) {
        console.log('connection is intercepted')

        col.find().limit(1).sort({_id: 1}).toArray(function (err, res) {
            if (err)
                throw err;

            client.emit('output', res);
        })


        //wait for an input
        socket.on('input', function (data) {
            var name = data.name;
            var message = data.message;

            col.insert({name: name, message: message}, function () {
                console.log('data was inserted');
                console.log(data);
            });

            col.find().sort({_id: -1}).limit(1).toArray(function (err, res) {
                if (err)
                    throw err;
                client.emit('output', res);
            })


        })


    })

});

console.log("server is now running");