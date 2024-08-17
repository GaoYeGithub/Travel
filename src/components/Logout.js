import { signOut } from 'firebase/auth';
import { auth } from './firebase';

function Logout() {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('Logged out');
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
