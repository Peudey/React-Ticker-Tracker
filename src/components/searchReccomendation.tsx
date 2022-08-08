interface reccomendationProps{
    reccomendation: string
    setSearchText:React.Dispatch<React.SetStateAction<string>>;
}

function SearchReccomendation({reccomendation, setSearchText}:reccomendationProps){

    return(
        <div className="reccomendation" onClick={()=>setSearchText(reccomendation)}>
            {reccomendation}
        </div>
    )
}

export default SearchReccomendation;