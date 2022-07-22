import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [desc, setDesc] = useState("");
  const [symbol, setSymbol] = useState("");
  
  const search = async () => {
    const url = 'https://finnhub.io/api/v1/search?q=AAPL&token=cbcvu7qad3i1jffu0650';
    const response = await fetch(url);

    if (!response.ok) {
      const message = `unexpected error: ${response.status}`;
      throw new Error(message);
    }
  
    console.log("test");
    return await response.json();
  }

  useEffect(() => {
    var json = search();
    json.then(data => {setDesc(data.result[0].description);
      setSymbol(data.result[0].displaySymbol);
    });
  },[])
  

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>{symbol} || {desc}</p>
    </div>
  )
}

export default App
