const express = require('express');
const app = express();

const casesRoute = require('./routes/cases');
const recoveredRoute = require('./routes/recovered');
const deathsRoute = require('./routes/deaths')

app.set('port', (process.env.PORT || 5000));

// route index
app.use('/reported', casesRoute);
app.use('/recovered', recoveredRoute);
app.use('/deaths', deathsRoute);
app.listen(app.get('port'), () => {
    console.log(`Server started on port ${app.get('port')}`);
});