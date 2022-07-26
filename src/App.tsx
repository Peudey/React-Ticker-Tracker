import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { AreaChart } from 'reaviz';
import { waitForDebugger } from 'inspector';

function App() {
  const [count, setCount] = useState(0);
  const [desc, setDesc] = useState("");
  const [symbol, setSymbol] = useState("");
  const [tickerData, setTickerData] = useState<any[]>([]);
  
  const search = async (symbol:string) => {
    const url = `https://finnhub.io/api/v1/search?q=${symbol}&token=cbcvu7qad3i1jffu0650`;
    const response = await fetch(url);

    if (!response.ok) {
      const message = `unexpected error: ${response.status}`;
      throw new Error(message);
    }
  
    console.log("test");
    return await response.json();
  }

  const getTickerData = async(symbol:string) => {
    const url = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${Math.floor(Date.now() / 1000)-2630000}&to=${Math.floor(Date.now() / 1000)}&token=cbcvu7qad3i1jffu0650`;
    const response = await fetch(url);

    if(!response.ok) {
      const message = `unexpected error: ${response.status}`;
      throw new Error(message);
    }

    return await response.json();
  }

  useEffect(() => {
    var formattedData:any[] = [];
    var json = search("AAPL");
    json.then(data => {setDesc(data.result[0].description);
      setSymbol(data.result[0].displaySymbol);
    });
    var json2 = getTickerData("AAPL");
    json2.then(data => console.log(data));
    json2.then(data => {
      for(var i = 0; i < data.c?.length; i++){
        console.log(data?.t[i]);
        formattedData.push({key: new Date(data?.t[i] * 1000), data: data?.c[i]});
      }
      setTickerData(formattedData);
      console.log(tickerData);
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
      <AreaChart 
        height={600}
        width={600}
        data={tickerData}
      />
    </div>
  )
}

export default App
