interface reccomendationProps{
    setSearchText:React.Dispatch<React.SetStateAction<string>>;
}

function SearchReccomendation({setSearchText}:reccomendationProps){
    const[reccomendation, setReccomendation] = ("");

    return(
        <div onClick={()=>setSearchText(reccomendation)}>
            {reccomendation}
        </div>
    )
}

export default SearchReccomendation;