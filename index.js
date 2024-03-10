const express = require('express');
const colors  = require('colors'); 
const cors    = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql'); 

const schema    = require('./schema/schema.js');
const connectDb = require('./config/db.js')
const port      =  5000
const app       = express();

const path = require('path');


// connect to database
connectDb();
app.use(cors());

app.use('/graphql',  graphqlHTTP( {   schema,  graphiql: true  })  );


app.use( express.static('public'));
app.get("*",(req, res)=>{
    res.sendFile( path.resolve(__dirname,'public','index.html') );
});

app.listen(port, ()=>{
    console.log(` Server runinng at ${port}`);
});