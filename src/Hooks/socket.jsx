// src/utils/socket.js
import io from 'socket.io-client';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

const A_Token = Cookies.get('eIfu_ATK') || null;

const decodedToken = A_Token ? jwtDecode(A_Token) : null

  const userId = decodedToken?.userInfo?._id ;

const socket = io('http://localhost:00', {
  autoConnect: false,
  query: { userId: userId } 
});

// socket.connect();

// Emit events when the user opens or closes the browser
window.addEventListener('focus', () => {
  socket.emit('browserOpen');
});

window.addEventListener('blur', () => {
  socket.emit('browserClose');
});

// Optional: Emit browser close event on window unload
window.addEventListener('beforeunload', () => {
  socket.emit('browserClose');
});

export default socket;
