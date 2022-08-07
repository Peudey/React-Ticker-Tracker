import {getNews} from "../utils/stockApi"
import {useState, useEffect} from 'react';

interface newsProps {
    symbol : string;
}

function News({symbol}:newsProps) {
    const [summary, setSummary] = useState("");
    const [headline, setHeadline] = useState("");
    const [image, setImage] = useState("");
    const [date, setDate] = useState(0);

    useEffect(() => {
        refreshNews();
    },[symbol])

    const refreshNews = async() => {
        var json = await getNews(symbol);
        var json2 = getNews(symbol).then(() => console.log(json));
        setSummary(json[json.length-1].summary);
        setDate(json[json.length-1].datetime);
        setImage(json[json.length-1].image);
        setHeadline(json[json.length-1].headline);
    }

    return(
        <div>
            <img src={image} />
            <p>{headline}</p>
            <p>{new Date(date*1000).toLocaleDateString('en-US', {timeZone:"Europe/London"})}</p>
            <p>{summary}</p>
        </div>
    );
}

export default News;