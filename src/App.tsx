import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

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

  const getGridMarks = (data:any[]) => {
    var grid:any[] = [];
    var distance = (data.length/4)-1;
    console.log(distance);
    if(distance > 0){
      grid.push(data[distance].name);
      grid.push(data[distance*2].name);
      grid.push(data[distance*3].name);
    }
    console.log(grid);
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
        formattedData.push({name: new Date(data?.t[i] * 1000).toDateString() , amt: data?.c[i]});
      }
    }).then(() => {
      setTickerData(formattedData);
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
      <LineChart width={600} height={600} margin={{ top: 5, right: 20, bottom: 50, left: 0 }} data={tickerData} >
        <Line type="monotone" dataKey="amt" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc"/>
        <XAxis dataKey="name" interval={7} angle={-35}/>
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  )
}

export default App
