const request = require('request');
const fs = require('fs');
const Tesseract = require('tesseract.js');
const filename = './img/img3.png';

var createImg = fs.createWriteStream(filename);

request('http://s24.postimg.org/4rrpdyvo5/img.png')
    .pipe(createImg)
    .on('close', () => {
        console.log('IMG CREATED');
        Tesseract
            .recognize(filename)
            .progress((p) => {
                console.log(`Progress => ${p}`)
            })
            .then((result) => {
                console.log(result);
                console.log(result.text);
            })
            .catch((err) => {
                console.log(`There is an error: ${err}`);
            });
    });