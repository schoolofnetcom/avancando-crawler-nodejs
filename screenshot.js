const Horseman = require('node-horseman');
const horseman = new Horseman();

horseman
    .open('http://duckduckgo.com')
    // .screenshot('./img/img4.png')
    // .includeJs('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.js')
    .pdf('test.pdf', {
        format: 'A4',
        orientation: 'portrait',
        margin: '1cm'
    })
    .then(function(counter) {
        console.log(`Count links = ${counter}`)
    })
    .catch((err) => {
        console.log(`There is an error: ${err}`)
    })
    .close()


module.exports = horseman;