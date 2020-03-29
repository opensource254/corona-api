const express = require('express');
const app = express();

const casesRoute = require('./routes/cases');

app.set('port', (process.env.PORT || 5000));

// route index
app.use('/', casesRoute);

app.listen(app.get('port'), () => {
    console.log(`Server started on port ${app.get('port')}`);
});