import { useState } from 'react';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  return (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <input type="username" value={username} onChange={event => setUsername(event.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;