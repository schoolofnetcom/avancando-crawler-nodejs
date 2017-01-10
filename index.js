const Horseman = require('node-horseman');
const horseman = new Horseman();

horseman
    .open('http://duckduckgo.com')
    .type('input[name="q"]', 'School of net')
    .click('input.search__button')
    .waitForNextPage()
    .count('a.result__a')
    .then(function(counter) {
        console.log(`Count links = ${counter}`)
    })
    .catch((err) => {
        console.log(`There is an error: ${err}`)
    })
    .close()


module.exports = horseman;