export const search = async (symbol:string) => {
    const url = `https://finnhub.io/api/v1/search?q=${symbol}&token=cbcvu7qad3i1jffu0650`;
    const response = await fetch(url);

    if (!response.ok) {
      const message = `unexpected error: ${response.status}`;
      throw new Error(message);
    }
  
    console.log("test");
    return await response.json();
  }

export const getTickerData = async(symbol:string) => {
  const url = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${Math.floor(Date.now() / 1000)-2630000}&to=${Math.floor(Date.now() / 1000)}&token=cbcvu7qad3i1jffu0650`;
  const response = await fetch(url);

  if(!response.ok) {
      const message = `unexpected error: ${response.status}`;
      throw new Error(message);
  }

  return await response.json();
}