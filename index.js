const express = require('express');
const cors = require('cors')
const app = express();

const casesRoute = require('./routes/cases');
const recoveredRoute = require('./routes/recovered');
const deathsRoute = require('./routes/deaths');
const indexRoute = require('./routes/combined');

app.set('port', (process.env.PORT || 5000));
app.use(cors());
// route index

app.use('/reported', casesRoute);
app.use('/recovered', recoveredRoute);
app.use('/deaths', deathsRoute);
app.use('/', indexRoute);
app.listen(app.get('port'), () => {
    console.log(`Server started on port ${app.get('port')}`);
});