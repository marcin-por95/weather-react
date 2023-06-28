import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import {useCallback, useState} from "react";

const WeatherBox = props => {
    const [ weather, setWeather] = useState();
    const handleCityChange = useCallback((city) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c71c91029947d7f48f8f7ad9ed23553b&units=metric`)
            .then(res => res.json())
            .then(data => {
                const weatherData = {
                    city: data.name,
                    temp: data.main.temp,
                    icon: data.weather[0].icon,
                    description: data.weather[0].main
                };
                console.log(weatherData);
                setWeather(weatherData);
            });
    });
  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary {...weather} />
      <Loader />
    </section>
  )
};

export default WeatherBox;