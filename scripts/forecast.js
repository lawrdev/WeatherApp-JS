// used accuweather api
class Forecast{
    constructor(){
        this.key = `q5ajGHXd6ZkWpeqAw1xOvUqMg2e77hlP`;
        this.weatherURL = `http://dataservice.accuweather.com/currentconditions/v1/`;
        this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city){
        const cityDets = await this.getCity(city);
        const cityWeather = await this.getWeather( cityDets.Key );
        return { cityDets, cityWeather };
    }
    // get city info
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURL + query);
        const data = await response.json();
        return data[0];
    }
    // get weather data for current city
    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURL + query);
        const data = await response.json();
        return data[0];
    }
}
