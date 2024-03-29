import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "../style/Weather.module.css";
import WeatherInfo from "../components/WeatherPage/WeatherInfo";
import WeatherDayCourse from "../components/WeatherPage/WeatherDayCourse";
import TodaysDate from "../components/Date/TodaysDate";
import TodaysDateComponent from "../components/Date/TodaysDateComponent";
import {
  AiOutlineHeart,
  AiFillCalendar,
  AiOutlineArrowLeft,
} from "react-icons/ai";

/**
 * This is the Weather page component which is depends on longitude and latitude.
 * @summary Will render a page that shows weather information from todays date.
 * @param props (latitude and longitude)
 * @returns Weather Page JSX Element
 *
 */

const WeatherPage = (): JSX.Element => {
  const { title, lat, lon } = useParams();
  const [weather, setWeather] = useState(null);
  const [temperature, setTemperature] = useState("0");
  const [precipitation, setPrecipitation] = useState("0");
  const [wind, setWind] = useState("0");
  const [extremalTemp, setExtremalTemp] = useState(["0", "0"]);
  const [favorite, setFavorite] = useState(false);
  const [dayCourse, setDayCourse] = useState([
    "no_weather",
    "no_weather",
    "no_weather",
    "no_weather",
  ]);

  const endpoint: string = `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lat}&lon=${lon}`;
  const time: string = new Date().toJSON().split("T")[1];

  const { data } = useQuery({
    /**
     * @summary TanStack Query, fetches API from MET to data
     */
    queryKey: ["weatherData"],
    queryFn: () => fetch(endpoint).then((res) => res.json()),
  });

  const filterTodaysWeatherData: any = (data: any) => {
    /**
     * @param weather Weather data from MET
     * @returns       Filtered weather data based on todays date
     */
    return data["properties"]["timeseries"].filter(
      (value: { [x: string]: string }) =>
        value["time"].split("T")[0] == TodaysDate()
    );
  };

  const getWeatherSymbol = (weather: any, hour: number) => {
    /**
     * @param weather Weather data from MET
     * @param hour    Given hour to get symbol from
     * @returns       Symbol from given hour
     */
    return weather[hour]["data"]["next_1_hours"]["summary"]["symbol_code"];
  };

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    favorites.push({ name: title, lat: lat, lon: lon });
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const removeFromFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    console.log(favorites);
    favorites.splice(
      favorites.findIndex(
        (e: any) => e.name == title && e.lat == lat && e.lon == lon
      ),
      1
    );
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const toggleFavorite = () => {
    if (favorite) {
      removeFromFavorite();
      setFavorite(false);
      return;
    }
    addToFavorites();
    setFavorite(true);
  };

  useEffect(() => {
    if (data == null) {
      return;
    }
    console.log(data);
    setWeather(filterTodaysWeatherData(data));
  }, [data]);

  useEffect(() => {
    if (weather == null) {
      return;
    }
    const sortWeatherByTemperature = (weather: any) => {
      /**
       * @param weather Weather data from MET
       * @returns       Filtered weather data based on highest to lowest temperature
       */
      const weatherCopy = Object.create(weather);
      return weatherCopy.sort((a: any, b: any) => {
        return (
          parseFloat(b["data"]["instant"]["details"]["air_temperature"]) -
          parseFloat(a["data"]["instant"]["details"]["air_temperature"])
        );
      });
    };

    const filterWeatherToCurrentTime: any = (weather: any) => {
      /**
       * @param weather Weather data from MET
       * @returns       Filtered weather data based on the current hour
       */
      return weather.filter(
        (value: { [x: string]: any }) =>
          value["time"].split("T")[1].slice(0, -1).split(":")[0] ==
          time.split(":")[0]
      );
    };

    const getCurrentTemperature = (weather: any) => {
      /**
       * @param weather Weather data from MET
       * @returns       Temperature data at current hour
       */
      return filterWeatherToCurrentTime(weather)[0]["data"]["instant"][
        "details"
      ]["air_temperature"];
    };

    const getPrecipitation1H = (weather: any) => {
      /**
       * @param weather Weather data from MET
       * @returns       Precipitation data over 1 hour from current hour
       */
      return filterWeatherToCurrentTime(weather)[0]["data"]["next_1_hours"][
        "details"
      ]["precipitation_amount"];
    };

    const getCurrentWind = (weather: any) => {
      /**
       * @param weather Weather data from MET
       * @returns       Wind data from current hour
       */
      return filterWeatherToCurrentTime(weather)[0]["data"]["instant"][
        "details"
      ]["wind_speed"];
    };

    const getExtremalTemperatures = (weather: any) => {
      /**
       * @param weather Weather data from MET
       * @returns       Both Max and Min temperatures from current day
       */
      return [
        sortWeatherByTemperature(weather)[0]["data"]["instant"]["details"][
          "air_temperature"
        ],
        sortWeatherByTemperature(weather)[weather.length - 1]["data"][
          "instant"
        ]["details"]["air_temperature"],
      ];
    };

    const getDayCourse = (weather: any) => {
      /**
       * @param weather Weather data from MET
       * @returns       Array of the course of symbols from current day
       */
      return [
        weather.length > 17 ? getWeatherSymbol(weather, 6) : "no_weather",
        weather.length > 13
          ? getWeatherSymbol(weather, 10 - (23 - weather.length))
          : "no_weather",
        weather.length > 7
          ? getWeatherSymbol(weather, 16 - (23 - weather.length))
          : "no_weather",
        weather.length > 2
          ? getWeatherSymbol(weather, 21 - (23 - weather.length))
          : "no_weather",
      ];
    };

    setTemperature(getCurrentTemperature(weather));
    setPrecipitation(getPrecipitation1H(weather));
    setWind(getCurrentWind(weather));
    setExtremalTemp(getExtremalTemperatures(weather));
    setDayCourse(getDayCourse(weather));
  }, [weather, time]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const contains = favorites.some((elem: any) => {
      return (
        JSON.stringify({ name: title, lat: lat, lon: lon }) ===
        JSON.stringify(elem)
      );
    });
    if (contains) {
      setFavorite(true);
      return;
    }
    setFavorite(false);
  }, [lat, lon, title]);

  return (
    <main className={style.main}>
      <div className={style.container}>
        <div className={style.titleContent}>
          <div className={style.titlePlacement}>
            <Link to="/">
              <AiOutlineArrowLeft className={style.arrow} />
            </Link>
            <p className={style.title}>{title?.toUpperCase()}</p>
            <button
              className={style.heartButton}
              onClick={() => {
                toggleFavorite();
              }}
            >
              <AiOutlineHeart
                style={{ color: favorite ? "red" : "gray" }}
                className={style.heart}
              />
            </button>
          </div>
        </div>
        <div className={style.contentBackground} />
        <div className={style.content}>
          <div className={style.date}>
            <AiFillCalendar />
            <TodaysDateComponent />
          </div>
          <WeatherInfo
            temperature={temperature}
            rain={precipitation}
            wind={wind}
          />
          <WeatherDayCourse
            extremalTemperatures={extremalTemp}
            weatherCourse={dayCourse}
          />
        </div>
      </div>
    </main>
  );
};

export default WeatherPage;
