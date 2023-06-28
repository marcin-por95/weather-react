import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import {useCallback, useState} from "react";

import ErrorBox from "../ErrorBox/ErrorBox";

const WeatherBox = props => {
    const [ weather, setWeather] = useState();
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(false);

    const handleCityChange = useCallback((city) => {
        setPending(true);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c71c91029947d7f48f8f7ad9ed23553b&units=metric`)
            .then(res => {
                if(res.status === 200) {
                    setError(false);
                    return res.json()
                        .then(data => {
                            const weatherData = {
                                city: data.name,
                                temp: data.main.temp,
                                icon: data.weather[0].icon,
                                description: data.weather[0].main
                            };
                            setWeather(weatherData);
                            setPending(false);
                        });
                } else {
                    setError(true);
                }
            });
    });
  return (
      <section>
          <PickCity action={handleCityChange} />
          { (weather && !pending) && <WeatherSummary {...weather} />}
          {error && <ErrorBox>The city you selected does not exist.</ErrorBox>}
          {(pending && pending) && <Loader />}
      </section>
  )
};

export default WeatherBox;