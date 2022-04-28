const cityForm = document.querySelector('form');
const card = document.querySelector('.passcard');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const errorCard = document.querySelector('.errorcard');
const footer = document.querySelector('footer');


cityForm.addEventListener('keyup', () => {
    if(!errorCard.classList.contains('d-none')){
        errorCard.classList.add('d-none');
    }
    if(! card.classList.contains('d-none')){
        card.classList.add('d-none');
    }
})

//updating to UI
const updateUI = data =>{
    //destructing objects
    const { cityDets, cityWeather } = data;
    details.innerHTML = `
        <h2 class="m-0 mt-3">${cityDets.LocalizedName}</h2>
        <p class="m-0">${cityWeather.LocalObservationDateTime
            .substring(0, 9)}</p>
        <p class="m-0">Time(24hr) - ${cityWeather.LocalObservationDateTime
            .substring(11, 16)}</p>
        <div class="my-3">${cityWeather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${cityWeather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
    //update time image and weather icon
    const iconSrc = `img/icons/${cityWeather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    const timeSrc = cityWeather.IsDayTime ? "img/day2.svg" : "img/night2.svg" ;
    time.setAttribute('src', timeSrc);
};

//update city search
const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const cityWeather = await getWeather( cityDets.Key );

    return { cityDets, cityWeather }; // our cityData
};
cityForm.addEventListener('submit', e => {
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();
    
    updateCity( city )
        .then(data =>{
            console.log(data);
            return updateUI(data);
        }).catch(err => {
            console.log(`Your error mesage: ${err}`);
            errorCard.classList.remove('d-none');
        });
    // store last search
    localStorage.setItem('citySearched', city); 
});
//reload last search on refresh
if(localStorage.getItem('citySearched')){
    updateCity(localStorage.getItem('citySearched'))
        .then(data => updateUI(data))
        .catch( () => errorCard.classList.remove('d-none'));
}