export interface WeatherData {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
  };
  hourly: {
    temperature_2m: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
  };
}
