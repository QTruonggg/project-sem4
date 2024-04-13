package hbs.booking.service.impl;

import hbs.booking.config.IPConfig;
import hbs.booking.config.WeatherConfig;
import hbs.booking.model.dto.response.LocationAndWeatherDto;
import hbs.booking.service.LocationAndWeatherService;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class LocationAndWeatherServiceImpl implements LocationAndWeatherService {

    @Override
    public LocationAndWeatherDto getLocationAndWeather() {
        LocationAndWeatherDto locationAndWeatherDto = new LocationAndWeatherDto();
        WeatherConfig weatherConfig = new WeatherConfig();
        Map<String, String> weatherData;
        weatherData = weatherConfig.getWeather(WeatherConfig.LAT_VILLAGE, WeatherConfig.LON_VILLAGE);
        locationAndWeatherDto.setLocation("Mèo Vạc - Hà Giang");
        locationAndWeatherDto.setWeatherIconUrl(weatherData.get("weatherIcon"));
        locationAndWeatherDto.setWeatherTemp(weatherData.get("temperature"));
        locationAndWeatherDto.setWeatherDescription(weatherData.get("weatherDescription"));
        locationAndWeatherDto.setWeatherWarning(weatherData.get("warning"));
        return locationAndWeatherDto;
    }
}
