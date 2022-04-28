// used accuweather api
const key = `q5ajGHXd6ZkWpeqAw1xOvUqMg2e77hlP`;

// get city info
const getCity = async (city) =>{
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};
// get weather data for current city
const getWeather = async (cityKey) =>{
    const base = `http://dataservice.accuweather.com/currentconditions/v1/`;
	const query = `${cityKey}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};