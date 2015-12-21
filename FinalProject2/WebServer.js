var http = require('http');
var pg = require('pg');

// supply connection string through an environment variable
var conString = process.env.DBHOST;

var server = http.createServer(function(req, res) {

    // get a pg client from the connection pool
    pg.connect(conString, function(err, client, done) {

        var handleError = function(err) {
            // no error occurred, continue with the request
            if (!err) return false;

            // An error occurred, remove the client from the connection pool.
            // A truthy value passed to done will remove the connection from the pool
            // instead of simply returning it to be reused.
            // In this case, if we have successfully received a client (truthy)
            // then it will be removed from the pool.
            if (client) {
                done(client);
            }
            res.writeHead(500, {'content-type': 'text/plain'});
            res.end('An error occurred');
            return true;
        };

        // handle an error from the connection
        if (handleError(err)) return;

        client.query("INSERT INTO tempData VALUES, DEFAULT", function(err, result) {

            // handle an error from the query
            if (handleError(err)) return;

            // return the client to the connection pool for other requests to reuse
            done();
            res.writeHead(200, {'content-type': 'text/html'});
            res.write('<h1>The Temperature of your food is' + result.rows[2] + ' at' + result.rows[1] + '.</h1>');
            res.end();
        });
    });
});

server.listen(process.env.PORT);