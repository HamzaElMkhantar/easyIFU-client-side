import { useEffect } from 'react';
import socket from './socket'; // Ensure this points to your socket configuration

const useUserStatus = (userId) => {
//   useEffect(() => {
//     if (!userId) {
//       console.error('userId is undefined or null');
//       return;
//     }
//     // socket.connect();

//     // Emit 'user_online' when the component mounts

//     socket.emit('user_online', userId);
//     // console.log(`Emitted 'user_online' for userId: ${userId}`);

//     const handleBeforeUnload = () => {
//       socket.emit('user_offline', userId);
//     //   console.log(`Emitted 'user_offline' for userId: ${userId}`);
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//       socket.emit('user_offline', userId);
//     //   console.log(`Emitted 'user_offline' on component unmount for userId: ${userId}`);
//     };
//   }, [userId]);
};

export default useUserStatus;
