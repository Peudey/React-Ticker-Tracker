interface searchProps{
    searchText: string
    setSearchText:React.Dispatch<React.SetStateAction<string>>
    handleSearch:()=>boolean
}

function Search({searchText, setSearchText, handleSearch}:searchProps){
    return(
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
    </div>
  )
}

export default Search;