import socket from '../Hooks/socket'

export const handleLogin = (userId) => {
    socket.emit('user_online', userId);
  };
  
export const handleLogout = (userId) => {
    socket.emit('user_offline', userId);
  };
