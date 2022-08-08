import SearchReccomendation from './searchReccomendation';
import {useEffect, useState} from 'react';
import {search} from '../utils/stockApi'

interface searchProps{
    searchText: string
    setSearchText:React.Dispatch<React.SetStateAction<string>>
    handleSearch:() => any
}

function Search({searchText, setSearchText, handleSearch}:searchProps){
    const [reccomendations, setReccomendations] = useState<string[]>([]);

    useEffect(() =>{
      const timer = setTimeout(()=>{
        fetchResults()
      }, 500);
      
      return(()=>{clearTimeout(timer);})
    },[searchText])

    const fetchResults = async() => {
      var recs:string[] = [];
      if(searchText===""){
        setReccomendations(recs);
        return
      };
        var json = await search(searchText);
        console.log(json);
        for(var i = 0; i < 3 && i < json.result.length - 1; i++){
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
              autoComplete={"off"}
              onChange={e => {
                  setSearchText(e.target.value);
              }}
            />
            <button type="submit">search</button>
        </form>
        {reccomendations && <div className='reccomendations'>
                {reccomendations.map((rec, idx) => {
                    return(
                      <SearchReccomendation 
                        reccomendation={rec}
                        setSearchText={setSearchText}
                      />
                    )
                  })
                }
              </div>
            }
    </div>
  )
}

export default Search;