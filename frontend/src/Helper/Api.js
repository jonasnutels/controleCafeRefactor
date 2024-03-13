export function GET_COUNTRY(countryName) {
  return {
    url: `https://restcountries.com/v3.1/name/${countryName}`,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
}
export function GET_SEARCHCOUNTRY(countryName) {
  return {
    url: `https://restcountries.com/v3.1/name/${countryName}?fullText=false`,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
}
