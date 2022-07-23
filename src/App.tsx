import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { AreaChart } from 'reaviz';

function App() {
  const [count, setCount] = useState(0);
  const [desc, setDesc] = useState("");
  const [symbol, setSymbol] = useState("");
  const [tickerData, setTickerData] = useState<any>();
  
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

  const getTickerData = async() => {
    const url = "https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=D&from=1631022248&to=1631627048&token=cbcvu7qad3i1jffu0650";
    const response = await fetch(url);

    if(!response.ok) {
      const message = `unexpected error: ${response.status}`;
      throw new Error(message);
    }

    return await response.json();
  }

  useEffect(() => {
    var json = search();
    json.then(data => {setDesc(data.result[0].description);
      setSymbol(data.result[0].displaySymbol);
    });
    var json2 = getTickerData();
    json2.then(data => console.log(data));
    json2.then(data => {setTickerData(data)});
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
      <AreaChart 
        height={300}
        width={300}
        data={[
          {key: new Date(tickerData?.t[0]), data: tickerData?.c[0]},
          {key: new Date(tickerData?.t[1]), data: tickerData?.c[1]},
          {key: new Date(tickerData?.t[2]), data: tickerData?.c[2]},
          {key: new Date(tickerData?.t[3]), data: tickerData?.c[3]}
        ]}
      />
    </div>
  )
}

export default App
