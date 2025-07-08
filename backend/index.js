const dotenv=require('dotenv')
dotenv.config({path:'.env.local'});
const connectToMongo=require('./db');
connectToMongo();
const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
app.get('/',(req,res)=>{
   res.send('HELLO CODING WORLD!!!');
})
app.listen(port, () => {
  console.log(`SecretSpace app listening on port ${port}`);
});