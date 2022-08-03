import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { search, getTickerData } from '../utils/stockApi';

function Graph() {
    const [count, setCount] = useState(0);
    const [desc, setDesc] = useState("");
    const [symbol, setSymbol] = useState("");
    const [tickerData, setTickerData] = useState<any[]>([]);
    const [searchText, setSearchText] = useState("googl");
  
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
      var formattedData:any[] = [];
      var json = search(searchText);
      json.then(data => {setDesc(data.result[0].description);
        setSymbol(data.result[0].displaySymbol);
      });
      var json2 = getTickerData(searchText);
      json2.then(data => console.log(data));
      json2.then(data => {
        for(var i = 0; i < data.c?.length; i++){
          formattedData.push({name: new Date(data?.t[i] * 1000).toDateString() , amt: data?.c[i]});
        }
      }).then(() => {
        setTickerData(formattedData);
      });
      return false;
    }

    return (
        <div>
            <form action="#" onSubmit={(e) => {e.preventDefault(); handleSearch()}}>
              <input 
                type="text"
                name="searchText"
                id="searchText"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
              <button type="submit">search</button>
            </form>
            <p>{symbol} ({desc})</p>
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

export default Graph;