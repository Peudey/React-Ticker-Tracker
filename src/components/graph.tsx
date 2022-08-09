import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { search, getTickerData } from '../utils/stockApi';
import Search from "./searchBar"
import News from './news';

function Graph() {
    const [desc, setDesc] = useState("ALPHABET INC-CL A");
    const [symbol, setSymbol] = useState("GOOGL");
    const [tickerData, setTickerData] = useState<any[]>([]);
    const [searchText, setSearchText] = useState("googl");
    const [timeframe, setTimeframe] = useState(30);
  
    useEffect(() => {
      refreshChart();
    },[timeframe, symbol])

    const handleSearch = () => {
      var json = search(searchText);
      json.then(data => {
        setDesc(data.result[0].description);
        setSymbol(data.result[0].displaySymbol);
        setSearchText("");
      });
    }

    const refreshChart = async() => {
      var formattedData:any[] = [];
      var json = await getTickerData(symbol, timeframe);
      for(var i = 0; i < json.c?.length; i++) {
        formattedData.push({
          date: new Date(json?.t[i] * 1000).toLocaleDateString('en-US', {timeZone:"Europe/London"}),
          Value: json?.c[i].toFixed(2)
        });
      }
      setTickerData(formattedData);
    }

    const handleFilter = (length: number) => {
      setTimeframe(length);
    }

    return (
        <div>
            <div>
              <Search 
                searchText = {searchText}
                setSearchText = {setSearchText}
                handleSearch = {handleSearch}
              />
            </div>
            <span className='chart'>
            <div style={{textAlign:"left",  position: "relative", left: "3%"}}>
              <p >{symbol} ({desc})</p>
            </div>
            <div className='chartButtons'>
              <button onClick={() => handleFilter(7)}>7</button>
              <button onClick={() => handleFilter(31)}>M</button>
              <button onClick={() => handleFilter(365)}>Y</button>
            </div>
              <AreaChart width={1200} height={600} margin={{ top: 20, right: 20, bottom: 50, left: 0 }} data={tickerData} >
                <defs>
                <linearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60afeb" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#242424" stopOpacity={0}/>
                </linearGradient>
                </defs>
                  <XAxis dataKey={'date'} interval={"preserveEnd"}/>
                  <YAxis />
                  <Area type="monotone" dataKey="Value" stroke="#7ebded" fillOpacity={1} fill="url(#chartArea)" />
                  <Tooltip labelStyle={{color: "black"}} itemStyle={{color: "black"}}/>
              </AreaChart>
            </span>
            <News symbol={symbol}/>
        </div>
    )
}

export default Graph;