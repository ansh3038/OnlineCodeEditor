import { io } from 'socket.io-client';
const options = {
    reconnectionAttempt: 'Infinity',
    timeout: 10000,
    reconnection: true,
    transports: ['websocket'],
};
export const initSocket = io("https://onlinecodeeditor.onrender.com",options);
