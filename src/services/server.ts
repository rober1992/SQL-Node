import express from 'express';
import path from 'path';
import * as http from 'http';
import apiRouter from '../routes/index';
import handlebars from 'express-handlebars';


const app = express ()


const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));


const layoutsFolderPath = path.resolve(__dirname, '../../views/layouts')
const defaultLayerPth = path.resolve(__dirname, '../../views/layouts/index.hbs');
const partialsFolderPath = path.resolve(__dirname, '../../views/partials');


app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    extname: 'hbs',
    layoutsDir : layoutsFolderPath,
    partialsDir : partialsFolderPath ,
    defaultLayout : defaultLayerPth
}));

app.use(express.json());
app.use(express.urlencoded());
app.use('/api', apiRouter)

const myServer = new http.Server(app);

export default myServer;