import { toLocalDayKey, toLocalDayLabel, toLocalHourMinute } from './utils';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

function toDailyForecast(forecastList = [], tzOffsetSeconds = 0) {
  const grouped = new Map();

  forecastList.forEach((item) => {
    const key = toLocalDayKey(item.dt, tzOffsetSeconds);
    if (!grouped.has(key)) {
      grouped.set(key, {
        dt: item.dt,
        min: item.main.temp_min,
        max: item.main.temp_max,
        icon: item.weather[0].icon,
        description: item.weather[0].main,
      });
      return;
    }

    const existing = grouped.get(key);
    existing.min = Math.min(existing.min, item.main.temp_min);
    existing.max = Math.max(existing.max, item.main.temp_max);
    grouped.set(key, existing);
  });

  return Array.from(grouped.values())
    .slice(0, 7)
    .map((day) => ({
      ...day,
      day: toLocalDayLabel(day.dt, tzOffsetSeconds),
      min: Number(day.min.toFixed(1)),
      max: Number(day.max.toFixed(1)),
    }));
}

function toHourlyForecast(forecastList = [], tzOffsetSeconds = 0) {
  return forecastList.slice(0, 24).map((item) => ({
    time: toLocalHourMinute(item.dt, tzOffsetSeconds),
    temp: Number(item.main.temp.toFixed(1)),
    icon: item.weather[0].icon,
    description: item.weather[0].description,
  }));
}

async function requestJson(url) {
  const response = await fetch(url, { next: { revalidate: 0 } });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.message || 'Unable to fetch weather data.');
  }

  return response.json();
}

export async function getWeatherBundle(city) {
  if (!city?.trim()) {
    throw new Error('Please enter a valid city.');
  }

  if (!API_KEY) {
    throw new Error('Weather API key is missing. Set NEXT_PUBLIC_OPENWEATHER_API_KEY in .env and restart the server.');
  }

  const currentUrl = `${WEATHER_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  const currentPayload = await requestJson(currentUrl);

  const forecastUrl = `${WEATHER_BASE_URL}/forecast?lat=${currentPayload.coord.lat}&lon=${currentPayload.coord.lon}&appid=${API_KEY}&units=metric`;
  const forecastPayload = await requestJson(forecastUrl);

  const current = {
    city: currentPayload.name,
    country: currentPayload.sys.country,
    temp: Number(currentPayload.main.temp.toFixed(1)),
    feelsLike: Number(currentPayload.main.feels_like.toFixed(1)),
    humidity: currentPayload.main.humidity,
    pressure: currentPayload.main.pressure,
    windSpeed: Number(currentPayload.wind.speed.toFixed(1)),
    icon: currentPayload.weather[0].icon,
    description: currentPayload.weather[0].description,
    timestamp: currentPayload.dt * 1000,
    timezoneOffset: currentPayload.timezone,
  };

  const timezoneOffset = currentPayload.timezone ?? 0;
  const daily = toDailyForecast(forecastPayload.list, timezoneOffset);
  const hourly = toHourlyForecast(forecastPayload.list, timezoneOffset);

  return { current, daily, hourly, source: 'live' };
}
