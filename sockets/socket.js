const { io } = require('../index');
const { comprobarJwT } = require('../helpers/jwt');
const {userConnect, userDisconnect, saveMessage} = require("../controllers/socket");


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    //Verify auth
    const [valid, uid] = comprobarJwT(client.handshake.headers['x-token']);
    if(!valid) {return client.disconnect();}

    //client auth
    userConnect(uid);

    // Join user to room
    // Rooms: global && client.id
    client.join(uid);

    //Listen from client the msg
    client.on('personal-message', async (payload) => {
        // save message
        await saveMessage(payload);
        io.to(payload.to).emit('personal-message', payload);
    })

    // client.to(uid).emit('')



    client.on('disconnect', () => {
        userDisconnect(uid);
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    // });


});
