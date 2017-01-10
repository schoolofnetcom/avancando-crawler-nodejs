const Tesseract = require('tesseract.js');
const filename = './img/img2.png';

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
    })