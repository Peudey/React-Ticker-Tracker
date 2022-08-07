export const search = async (symbol:string) => {
    const url = `https://finnhub.io/api/v1/search?q=${symbol}&token=cbcvu7qad3i1jffu0650`;
    const response = await fetch(url);

    if (!response.ok) {
      const message = `unexpected error: ${response.status}`;
      throw new Error(message);
    }
  
    return await response.json();
  }

export const getTickerData = async(symbol:string, length:number) => {
  var newDate = new Date();
  newDate.setDate(newDate.getDate() - length);
  const url = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${Math.floor(newDate.getTime()/1000)}&to=${Math.floor(Date.now()/1000)}&token=cbcvu7qad3i1jffu0650`;
  const response = await fetch(url);

  if(!response.ok) {
      const message = `unexpected error: ${response.status}`;
      throw new Error(message);
  }

  return await response.json();
}

export const getNews = async(symbol:string) => {
  var newDate = new Date();
  newDate.setDate(newDate.getDate() - 365);
  const url = `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${Math.floor(newDate.getTime()/1000)}&to=2022-09-09&token=cbcvu7qad3i1jffu0650`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `unexpected error: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
}
