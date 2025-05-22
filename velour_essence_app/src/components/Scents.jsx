import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Scents() {
  const [scents, setScents] = useState([]);
  const [searchScent, setSearchScent] = useState('');

  useEffect(() => {
    async function fetchScents() {
      try {
        const response = await fetch('http://localhost:3000/api/scents');
        const data = await response.json();
        setScents(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchScents();
  }, []);

  const filteredScents = scents.filter(
    scent => scent.name.toLowerCase().includes(searchScent.toLowerCase()) || 
            scent.designer.toLowerCase().includes(searchScent.toLowerCase())
  );

  return (
    <div>
      <h1>Available Scents</h1>
      <input
        type="text"
        placeholder="Search by scent name or designer name"
        value={searchScent}
        onChange={(e) => setSearchScent(e.target.value)}
      />
      <ul>
        {filteredScents.map(scent => (
          <li key={scent.id}>
            <Link to={`/scents/${scent.id}`}>{scent.name} by {scent.designer}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Scents;