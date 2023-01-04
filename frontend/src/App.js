import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const data = await axios.get('/users');
    setUsers(data?.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  console.log('users', users);

  return (
    <div className='App'>
      <header className='App-header'>Docker App</header>
      <section>
        <h1>USERS</h1>
        <ul>
          {users.length > 0 &&
            users.map(({ id, username }) => <li key={id}>{username}</li>)}
        </ul>
      </section>
    </div>
  );
}

export default App;
