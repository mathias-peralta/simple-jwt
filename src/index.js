const app = require('./app');
require('./database')
async function main() {
    await app.listen('3000');
    console.log('Server listen on port:', 3000);
}

main();