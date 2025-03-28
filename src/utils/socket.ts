import { io } from 'socket.io-client';

const socket = io('http://localhost:8080/chat', {
  withCredentials: true,
  transports: ['websocket'], // polling 대신 websocket 사용 (속도 개선)
});

export default socket;
