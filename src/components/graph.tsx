import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { search, getTickerData } from '../utils/stockApi';
import Search from "./searchBar"

function Graph() {
    const [count, setCount] = useState(0);
    const [desc, setDesc] = useState("");
    const [symbol, setSymbol] = useState("");
    const [tickerData, setTickerData] = useState<any[]>([]);
    const [searchText, setSearchText] = useState("googl");
    const [resolution, setResolution] = useState("D");
  
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
      handleSearch();
    },[])

    const handleSearch = () => {
      var json = search(searchText);
      json.then(data => {setDesc(data.result[0].description);
        setSymbol(data.result[0].displaySymbol);
      });
      refreshChart();
      return false;
    }

    const refreshChart = async() => {
      var formattedData:any[] = [];
      var json = await getTickerData(searchText);
      for(var i = 0; i < json.c?.length; i++){
        formattedData.push({date: new Date(json?.t[i] * 1000).toLocaleDateString('en-US', {timeZone:"Europe/London"}) , Value: json?.c[i].toFixed(2)});
      }
      setTickerData(formattedData);
    }

    return (
        <div>
            <p>{symbol} ({desc})</p>
            <Search 
              searchText={searchText}
              setSearchText={setSearchText}
              handleSearch = {handleSearch}
            />
            <span className='chart'>
              <AreaChart width={1200} height={600} margin={{ top: 20, right: 20, bottom: 50, left: 0 }} data={tickerData} >
                <defs>
                <linearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60afeb" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#242424" stopOpacity={0}/>
                </linearGradient>
                </defs>
                  <XAxis dataKey={'date'} interval={"preserveEnd"}/>
                  <YAxis />
                  <Area type="monotone" dataKey="Value" stroke="#60afeb" fillOpacity={1} fill="url(#chartArea)" />
                  <Tooltip labelStyle={{color: "black"}} itemStyle={{color: "black"}}/>
              </AreaChart>
            </span>
        </div>
    )
}

export default Graph;