'use strict';

const Hapi = require('hapi');
const mongoose = require('mongoose');
const Horseman = require('node-horseman');

const server = new Hapi.Server({ debug: { request: ['error', 'timestamp'] } });
server.connection({
    port: 3000
});

const db = mongoose.connect('mongodb://localhost/crawler').connection;
const horseman = new Horseman();
const Movies = require('./movies');

db.on('error', (err) => {
    console.log(`Mongoose Error = ${err}`);
});


// server.route({
//     method: 'GET',
//     path: '/',
//     handler: (req, reply) => {
//         reply('Hello from Hapi.js');
//     }
// })

server.route({
    method: 'GET',
    path: '/movies',
    handler: (req, reply) => {
        console.time()
        Movies.find({}, (err, results) => {
            if (!err && results.length) {
                console.timeEnd();
                return reply({
                    data: results,
                    count: results.length
                });
            }
        // Movies.count({}, (err, count) => {
        //     if (!err && count > 0) {
        //         return reply(count);
        //     }

            if (!err && !results.length) {
                console.time();
                return horseman
                        .open('http://www.listchallenges.com/disney-movies')
                        .evaluate(function() {
                            $ = window.$ || window.jQuery;

                            var movies = [];
                            // var skeleton = {
                            //     name: '',
                            //     year: ''
                            // };

                            $('.item-name').each(function(index, el) {
                                var name = $(el).text();
                                var year = name.match(/\(([^)]+)\)/);

                                if (!year) {
                                    return;
                                }

                                year = year[1];
                                name = name.replace(/\s*\(.*?\)\s*/g, '');

                                // skeleton.name = name;
                                // skeleton.year = year;

                                // movies.push(skeleton);
                                // skeleton = {
                                //     name: '',
                                //     year: ''
                                // };

                                movies.push({
                                    name: name,
                                    year: year
                                });
                            });

                            return movies;
                        })
                        .then(function(res) {
                            Movies.insertMany(res)
                                .then((movies) => {
                                    console.log(`Ok`);
                                    console.timeEnd();
                                    return reply(res);
                                })
                                .catch((err) => {
                                    console.log(`Can not insert: ${err}`);
                                    reply({
                                        'error': 'MongoDB'
                                    });
                                });
                        })
                        .catch(function(err) {
                            console.log(err)
                        })
                        .close();
            }
        })
    }
})

server.start((err) => {
    if (err) {
        throw err;
    }

    console.log(`Your hapi server has been ignite at: ${server.info.uri}`);
});