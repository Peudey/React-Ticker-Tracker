import SearchReccomendation from './searchReccomendation';
import {useState} from 'react';
import {search} from '../utils/stockApi'

interface searchProps{
    searchText: string
    setSearchText:React.Dispatch<React.SetStateAction<string>>
    handleSearch:()=>any
}

function Search({searchText, setSearchText, handleSearch}:searchProps){
    const [reccomendations, setReccomendations] = useState<string[]>([]);

    const fetchResults = async() => {
        var json = await search(searchText);
        console.log(json);
        var recs = [];
        for(var i = 0; i < 3 || i < length - 1; i++){
            console.log(json.result[i].displaySymbol);
          recs.push(json.result[i].displaySymbol);
        }
        console.log(recs);
        setReccomendations(recs);
      }

    return(
        <div>            
            <form action="#" onSubmit={(e) => {e.preventDefault(); handleSearch()}}>
            <input 
            type="text"
            name="searchText"
            id="searchText"
            value={searchText}
            onChange={e => {
                setSearchText(e.target.value);
                fetchResults();
            }}
            />
            <button type="submit">search</button>
        </form>
    </div>
  )
}

export default Search;