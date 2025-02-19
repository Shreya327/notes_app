const connectToMongo = require('./db');
const express = require('express');
const fetchuser=require("./middleware/fetchuser")
const cors = require('cors');
const app = express();
const errorHandling=require('./middleware/errorHandling')
connectToMongo();


app.use(cors({
    origin: ['http://localhost:3000'],
     // Update with your frontend origin'
    credentials: true,
}));

app.use(express.json());


app.use('/api/auth', require('./routers/auth'));
app.use('/api/note', require('./routers/note'));

// Protected route using the fetchuser middleware
app.get('/protected', fetchuser, (req, res) => {
    res.json({ user: req.user });
});
app.get('/', (req, res) => {
    res.json({'Hello':'this is inotebook'});
});



app.use(errorHandling)
const port = 5000;
app.listen(port, () => {
    console.log(`app listening on port  http://localhost:${port}/`);
});
