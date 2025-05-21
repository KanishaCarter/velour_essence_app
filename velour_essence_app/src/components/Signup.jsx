import { useState } from 'react';


function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
  };
  
  return (
    <form onSubmit={handleLogin}>
      <h1>Sign Up</h1>
      <input type="text" value={username} onChange={event => setUsername(event.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Password" required />
      <input type="name" value={name} onChange={event => setName(event.target.value)} placeholder="Name" required />
      <input type="address" value={address} onChange={event => setAddress(event.target.value)} placeholder="Address" required />
      <input type="phoneNumber" value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)} placeholder="Phone Number" required />
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;