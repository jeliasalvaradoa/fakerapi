const express=require('express');
const cors = require('cors');
const routerApi=require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app=express();
const port=3000;

app.use(express.json());

const whiteList = ['http://127.0.0.1:5500','http://localhost:3000'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)){
      callback(null, true);
    }else {
      callback(new Error('Origin no permitido:  '));
    }
  }

}
app.use(cors(options));
app.get('/',(req,res)=>{
  res.send('Hola mi server en express');});

  app.get('/nueva-ruta',(req,res)=>{
    res.send('Hola, soy una nueva ruta');});

    routerApi(app);

    app.use(logErrors);
    app.use(boomErrorHandler);
    app.use(errorHandler);

    app.listen(port,()=>{
      console.log('Mi port'+port);
    });