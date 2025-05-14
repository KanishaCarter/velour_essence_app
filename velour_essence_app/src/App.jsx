import { useState } from 'react'
import ScentList from './components/data.js'
import AvailableScents from './components/Scents.jsx'
import './App.css'

function App() {
  return (
    <body>
      <h1>Available Scents</h1>
    <div id = "scentsContainer">
      <ul>
        {ScentList.map((scent) => (
          <li key={scent.id}>
            <h3>{scent.name}</h3>
            <p>Designer: {scent.designer}</p>
            <p>Size: {scent.size} oz</p>
            <p>Price: ${scent.price}</p>
            <p>Scent Family: {scent.family}</p>
            <p>Scent Type: {scent.type}</p>
            <p>Scent Notes: {scent.notes}</p>
          </li>
        ))}
      </ul>
    </div>
    </body>
  );
}



export default App
