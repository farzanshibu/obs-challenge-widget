// import { useChallengeStore } from '../store/fetchstore';
// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
//
//
// const app = express();
//
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST'],
//     }
// });
//
//
// io.on('connection', (socket) => {
//     console.log('Client connected');
//
//
//     // Listen for state updates (optional):
//     socket.on('addChallenge', (Data) => {
//         io.emit('addSent', { ...Data });
//     });
//     socket.on('increaseUpdateChallenge', (Data) => {
//
//         useChallengeStore.setState({ animation: "Confetti" });
//         useChallengeStore.setState({ play: true });
//         useChallengeStore.setState({ challenge: { ...Data } });
//         io.emit('updateSend', useChallengeStore.getState());
//     });
//     socket.on('decreaseUpdateChallenge', (Data) => {
//         useChallengeStore.setState({ play: false });
//         useChallengeStore.setState({ challenge: { ...Data } });
//         io.emit('updateSend', useChallengeStore.getState());
//     });
//     socket.on('resetUpdateChallenge', (Data) => {
//         useChallengeStore.setState({ animation: "AmongUs" });
//         useChallengeStore.setState({ play: true });
//         useChallengeStore.setState({ challenge: { ...Data } });
//         io.emit('updateSend', useChallengeStore.getState());
//     });
//     socket.on('removeChallenge', (Data) => {
//         io.emit('removeSent', Data);
//     });
//
//
//     // Handle disconnections (optional)
//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });
//
// server.listen(3001, () => {
//     console.log('Server listening on port 3001');
// });
import next from "next";
import { Server } from "socket.io";
import { createServer } from "node:http";

import { useChallengeStore } from '../store/fetchstore';


const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log('Client connected');

    // Listen for state updates (optional):
    socket.on('addChallenge', (Data) => {
        io.emit('addSent', { ...Data });
    });
    socket.on('increaseUpdateChallenge', (Data) => {

        useChallengeStore.setState({ animation: "Confetti" });
        useChallengeStore.setState({ play: true });
        useChallengeStore.setState({ challenge: { ...Data } });
        io.emit('updateSend', useChallengeStore.getState());
    });
    socket.on('decreaseUpdateChallenge', (Data) => {
        useChallengeStore.setState({ play: false });
        useChallengeStore.setState({ challenge: { ...Data } });
        io.emit('updateSend', useChallengeStore.getState());
    });
    socket.on('resetUpdateChallenge', (Data) => {
        useChallengeStore.setState({ animation: "AmongUs" });
        useChallengeStore.setState({ play: true });
        useChallengeStore.setState({ challenge: { ...Data } });
        io.emit('updateSend', useChallengeStore.getState());
    });
    socket.on('removeChallenge', (Data) => {
        io.emit('removeSent', Data);
    });


    // Handle disconnections (optional)
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on https://${hostname}:${port}`);
        });
});