import { useState } from 'react';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
  };
  
  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <input type="text" value={username} onChange={event => setUsername(event.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Password" required /><br></br>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;