import { sqliteDB, dbLiteInit } from "./db";
import { Server } from "socket.io";
import { formatMessages } from '../utils/messages';





export const initWsServer = (app : any) => {
    const myWSServer = new Server(app);
    dbLiteInit();

    myWSServer.on('connection', function (socket : any) {
        console.log('\n\nUn cliente se ha conectado');
        console.log(`ID DEL SOCKET DEL CLIENTE => ${socket.client.id}`);
        console.log(`ID DEL SOCKET DEL SERVER => ${socket.id}`);

        socket.on('askData', async () => {
            console.log('ME LLEGO DATA');
            const mensajes = await sqliteDB.from('messages').select();
            if (mensajes.length > 0) {
                socket.emit('messages', mensajes);
            }
        });

        socket.on('new-message', async (data : any) => {
            
            const msgRender = formatMessages(data);
            await sqliteDB('messages').insert(msgRender);
             myWSServer.emit('messages', [msgRender]);
          });
        
    })

    
    
    return myWSServer;
}

