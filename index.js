const app = require('./app');
const config = require('./app/config/config.js');
const port = config.PORT;

app.listen(port, () => console.log(`Run on ${port}`))
