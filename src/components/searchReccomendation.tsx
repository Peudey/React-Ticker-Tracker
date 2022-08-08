interface reccomendationProps{
    reccomendation: string
    setSearchText:React.Dispatch<React.SetStateAction<string>>;
}

function SearchReccomendation({reccomendation, setSearchText}:reccomendationProps){

    return(
        <div onClick={()=>setSearchText(reccomendation)}>
            {reccomendation}
        </div>
    )
}

export default SearchReccomendation;