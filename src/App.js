import { useEffect, useState } from "react";
import { Logo, LocationResult, Search } from "./NavBar";
import { NewsArea } from "./NewsArea";
import { WeatherArea } from "./WeatherArea";
import { CurrencyArea } from "./CurrencyArea";
import { countryToCurrObj } from "./utility_data";
import { currency_API_key, news_API_key } from "./api_keys";
import { useLocaleStorageState } from "./useLocalStorageState";

export default function App() {
  const [savedLocation, setSavedLocation] = useLocaleStorageState("", "savedLocation");

  const [news, setNews] = useState("");
  const [weather, setWeather] = useState("");
  const [currency, setCurrency] = useState("");
  const [location, setLocation] = useState("");
  const [locationQuery, setLocationQuery] = useState(savedLocation);
  const [isLocationSet, setIsLocationSet] = useState(false);
  // const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [isNewsLoading, setIsNewsLoading] = useState(false);

  useEffect(
    function () {
      setIsLocationSet(false);
      setIsNewsLoading(false);
      const controller = new AbortController();

      async function getLocation() {
        try {
          // if (locationQuery) setIsLocationLoading(true);

          const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${locationQuery}&count=10&language=en&format=json`,
            {
              signal: controller.signal,
            }
          );

          const locationResponse = await response.json();
          if (!locationResponse.results) {
            // setIsLocationLoading(false);
            setLocation("");
          } else if (locationResponse.results) {
            // setIsLocationLoading(false);
            setLocation(locationResponse.results.at(0));
            console.log(locationResponse.results.at(0));
          }
        } catch (err) {
          if (err.name !== "AbortError") {
            setLocation("Something went wrong...");
            console.log(err.message);
          }
        }
      }

      getLocation();

      return function () {
        controller.abort();
      };
    },
    [locationQuery]
  );

  const controllerNews = new AbortController();
  const controllerWeather = new AbortController();
  const controllerCurrency = new AbortController();

  async function getNewsData() {
    try {
      setIsNewsLoading(true);
      const response = await fetch(
        `https://api.currentsapi.services/v1/search?keywords=${location.name}&language=en&start_date:2024-01-01&page_size=10&limit=10&apiKey=${news_API_key}`,
        {
          signal: controllerNews.signal,
        }
      );
      const newsData = await response.json();
      if (!newsData.news) {
        setIsNewsLoading(false);
        setNews([
          {
            title: "Something went wrong with getting news for this location.",
            description: "?????",
            published: "??-??-???? ",
            author: "?????",
            url: "#",
            id: "0",
          },
        ]);
      } else if (newsData.news) {
        setIsNewsLoading(false);
        setNews(
          newsData.news.filter((article, i) => article.title !== newsData.news.at(i - 1).title)
        );
      }
      console.log(newsData.news);
    } catch (error) {
      console.error(error);
      setIsNewsLoading(false);
      setNews([
        {
          title: "Something went wrong with getting news for this location.",
          description: "?????",
          published: "??-??-???? ",
          author: "?????",
          url: "#",
          id: "0",
        },
      ]);
    } finally {
      controllerNews.abort();
    }
  }

  async function getWeatherData() {
    try {
      const { latitude, longitude, timezone } = location;
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}${
          timezone ? "&timezone=" : ""
        }${
          timezone ? timezone : ""
        }&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code`,
        {
          signal: controllerWeather.signal,
        }
      );

      const weatherData = await weatherResponse.json();
      setWeather(weatherData.daily);
      console.log(weatherData.daily);
    } catch (error) {
      console.error(error);
      setWeather([]);
    } finally {
      controllerWeather.abort();
    }
  }

  async function getCurrencyData() {
    try {
      if (!location.country_code) return;
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${currency_API_key}/latest/${
          countryToCurrObj[location.country_code]
        }`,
        {
          signal: controllerCurrency.signal,
        }
      );
      const { base_code, conversion_rates } = await response.json();
      if (!base_code) setCurrency({ noCurrency: "no currency" });
      const currencyRates = {
        [base_code]: {
          USD: conversion_rates.USD,
          EUR: conversion_rates.EUR,
          GBP: conversion_rates.GBP,
          JPY: conversion_rates.JPY,
          CHF: conversion_rates.CHF,
        },
      };
      setCurrency(currencyRates);
    } catch (error) {
      console.error(error);
      setCurrency({ noCurrency: "no currency" });
    } finally {
      controllerCurrency.abort();
    }
  }

  function getLocationData() {
    setSavedLocation(location.name || "");
    if (!location.name) return;
    setIsLocationSet(true);
    getNewsData();
    getWeatherData();
    getCurrencyData();
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search
          locationQuery={locationQuery}
          onChangeLocationQuery={setLocationQuery}
          onGetLocationData={getLocationData}
        />
        <LocationResult location={location} />
      </NavBar>
      <Main>
        <NewsArea news={news} isLocationSet={isLocationSet} isNewsLoading={isNewsLoading} />
        <WeatherArea weather={weather} isLocationSet={isLocationSet} />
        <CurrencyArea currency={currency} isLocationSet={isLocationSet} />
        <NewFeatures />
      </Main>
    </>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function NewFeatures() {
  return (
    <div className="new-features-area area-styling">
      <p>New features are coming...</p>
    </div>
  );
}
