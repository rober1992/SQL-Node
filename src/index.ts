import myServer from './services/server';
import { dbInit } from './services/db';
import { initWsServer } from './services/sockets';

const port = process.env.PORT || 8080;
initWsServer(myServer);
dbInit();

myServer.listen(port, () => console.log(`Server up on port ${port}`));