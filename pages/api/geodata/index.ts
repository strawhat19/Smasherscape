// import moment from 'moment-timezone';
// import { openWeatherAPIKey } from '../../../firebase';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  let { location } = req.query;
  let browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let error = { error: `Error getting GeoData`, message: `Error getting GeoData` };
  let browserTimezoneCityOrRegion = browserTimezone.split(`/`)[1].replace(/_/g, ` `);
  
  // if (!location && req.url) location = browserTimezoneCityOrRegion;

  // const convertWindSpeedFromMetersPerSecondToMilesPerHour = (speedInMS) => Math.floor(speedInMS * 2.237);
  // const convertTemperatureFromKelvinToCelsius = (tempInKelvin) => parseFloat(removeTrailingZeroDecimal(5, (tempInKelvin - 273.15)));
  // const convertTemperatureFromKelvinToFahrenheit = (tempInKelvin) => parseFloat(removeTrailingZeroDecimal(5, ((tempInKelvin - 273.15) * (9/5) + 32)));

  // const momentTimezoneFormats = {
  //   smallDateTime: `ddd, M/D, h:mm a`,
  //   extraSmallDateTime: `M/D, h:mm:ss a`,
  //   mediumDateTime: `ddd, MMM Do, h:mm a`,
  //   fullDateTime: `dddd, MMMM Do, h:mm:ss a`,
  // }

  // const removeTrailingZeroDecimal = (limit, number) => {
  //   let num = typeof number == `string` ? parseFloat(number) : number;
  //   const wholeNumber = Math.trunc(num);
  //   const decimalPart = num - wholeNumber;
  //   if (decimalPart === 0) {
  //     return wholeNumber;
  //   } else {
  //     return num.toFixed(limit);
  //   }
  // }

  const isValid = (item) => {
    if (typeof item == `string`) {
      if (!item || item == `` || item.trim() == `` || item == undefined || item == null) {
          return false;
      } else {
          return true;
      }
    } else if (typeof item == `number`) {
      if (isNaN(item) || item == undefined || item == null) {
          return false;
      } else {
          return true;
      }
    } else if (typeof item == `object` && item != undefined && item != null) {
      if (Object.keys(item).length == 0 || item == undefined || item == null) {
          return false;
      } else {
          return true;
      }
    } else {
      if (item == undefined || item == null) {
          return false;
      } else {
          return true;
      }
    }
  }

  // const getMapData = (coordinates) => {
  //   let { latitude, longitude } = coordinates;
  //   let enableDefaultZoomCode = `!1m14!1m12!1m3!1d132`;
  //   let mapsEmbedURL = `https://www.google.com/maps/embed`;
  //   let googleMapsEmbedOptions = `!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0`;

  //   let mapZoomLevels = {
  //     world: ``,
  //     street: enableDefaultZoomCode + ``,
  //     neighborhood : enableDefaultZoomCode + `4`,
  //     city: enableDefaultZoomCode + `44`,
  //     region: enableDefaultZoomCode + `444`,
  //     state: enableDefaultZoomCode + `4444`,
  //     coast: enableDefaultZoomCode + `44444`,
  //     x300: enableDefaultZoomCode + `444444`,
  //   }

  //   let mapIframeEmbedURLs = Object.keys(mapZoomLevels).reduce((acc, zoomLevelKey) => {
  //     let zoomLevel = mapZoomLevels[zoomLevelKey];
  //     let mapSourceLink = `${mapsEmbedURL}?pb=${zoomLevel}!2d${longitude}!3d${latitude}${googleMapsEmbedOptions}`;
  //     acc[zoomLevelKey] = mapSourceLink;
  //     return acc;
  //   }, {});
    
  //   return mapIframeEmbedURLs;
  // }

  // const generateNewLocation = (loc) => {
  //   let { name, type, importance, addressType: locationType, place_id: id, place_rank: rank, lat: latitude, lon: longitude, namedetails: nameDetails, boundingbox: bounds } = loc;

  //   let population = loc.extratags && loc.extratags.population ? parseFloat(loc.extratags.population) : 0;
    
  //   let coordinates = {
  //     latitude,
  //     longitude,
  //   };

  //   let newLocation: any = {

  //     id,
  //     type,
  //     name,
  //     rank,
  //     bounds,
  //     location,
  //     latitude,
  //     longitude,
  //     importance,
  //     population,
  //     coordinates,
  //     nameDetails,
  //     locationType,
      
  //     class: loc.class,
  //     // locationData: loc,
  //     people: population.toLocaleString(),
  //     mapEmbedURLs: getMapData(coordinates),
      
  //     address: {
  //       latitude,
  //       longitude,
  //       coordinates,
  //       ...loc.address,
  //       name: loc.display_name
  //     },

  //   }

  //   if (loc.extratags) {
  //     let { place, capital, website, wikidata, wikipedia, importance: scale, start_date: founded, state_capital: isStateCapital } = loc.extratags;
  //     newLocation = {
  //       ...newLocation,
  //       scale,
  //       place,
  //       capital,
  //       founded,
  //       website,
  //       wikidata,
  //       wikipedia,
  //       isStateCapital,
  //       sourceName: loc.extratags[`source:name:oc`],
  //       populationSource: loc.extratags[`source:population`],
  //     }
  //   }

  //   return newLocation;
  // }

  // const generateNewLocations = async (locations) => {

  //   locations = locations.map(loc => {
  //     return generateNewLocation(loc);
  //   }).sort((location1, location2) => {
  //     let rank1 = parseFloat(location1.rank);
  //     let rank2 = parseFloat(location2.rank);
  //     let importance1 = parseFloat(location1.importance);
  //     let importance2 = parseFloat(location2.importance);
  //     let population1 = parseFloat(location1.population);
  //     let population2 = parseFloat(location2.population);
  //     if (population1 !== population2) { return population2 - population1 };
  //     if (rank1 !== rank2) { return rank1 - rank2 };
  //     if (importance1 !== importance2) { return importance2 - importance1 };
  //   });

  //   let locationWithHighestPopulation = locations[0];
  //   let { coordinates } = locationWithHighestPopulation;
  //   let totalPopulation = locations.reduce((sum, locn) => sum + locn.population, 0);
  //   locationWithHighestPopulation.population = totalPopulation;
  //   locationWithHighestPopulation.people = totalPopulation.toLocaleString();
  //   locationWithHighestPopulation.weatherAndTime = await getWeatherAndTimeData(coordinates);

  //   return locations;
  // }

  
  // const getWeatherAndTimeData = async (coordinates) => {
  //   try {
  //     let { latitude, longitude } = coordinates;
  //     let openWeatherAPIURL = `https://api.openweathermap.org/data/2.5`;
  //     let openWeatherOneCallForLatLonURL = `${openWeatherAPIURL}/onecall?lat=${latitude}&lon=${longitude}&appid=${openWeatherAPIKey}`;
  //     let openWeatherOneCallForLatLonResponse = await fetch(openWeatherOneCallForLatLonURL);

  //     if (openWeatherOneCallForLatLonResponse.ok == true) {
  //         let openWeatherOneCallForLatLonData = await openWeatherOneCallForLatLonResponse.json();

  //         if (isValid(openWeatherOneCallForLatLonData)) {

  //           let { daily, hourly, minutely, lat: latitude, lon: longitude, timezone, timezone_offset: timezoneOffset } = openWeatherOneCallForLatLonData;

  //           let { uvi: uvIndex, clouds, sunrise: sunriseInUnix, sunset: sunsetInUnix, pressure, humidity, dt: dateTimeInUnix, temp: temperatureInKelvin, dew_point: dewPointInKelvin, wind_speed: windSpeedInMetersPerSecond } = openWeatherOneCallForLatLonData.current;
            
  //           let { icon, description, main: condition } = openWeatherOneCallForLatLonData.current.weather[0];

  //           let weatherAndTime = {

  //             uvIndex,
  //             latitude,
  //             longitude,
  //             condition,
  //             description,

  //             coordinates: {
  //               latitude,
  //               longitude,
  //             },
              
  //             humidity,
  //             humidityLabel: `${humidity}%`,
              
  //             clouds,
  //             cloudsLabel: `${clouds}%`,
              
  //             pressure,
  //             pressureLabel: `${pressure} psi`,
              
  //             // weatherAndTimeData: openWeatherOneCallForLatLonData,
  //             iconEmbedURL: `https://openweathermap.org/img/wn/${icon}@2x.png`,
              
  //             timezone,
  //             timezoneOffset,
  //             continent: timezone.split(`/`)[0].replace(/_/g, ` `),
  //             cityOrRegion: timezone.split(`/`)[1].replace(/_/g, ` `),

  //             daily: daily.map(day => ({ ...day, dateTime: moment.unix(day.dt).tz(timezone).format(momentTimezoneFormats.fullDateTime) })),
  //             hourly: hourly.map(hour => ({ ...hour, dateTime: moment.unix(hour.dt).tz(timezone).format(momentTimezoneFormats.fullDateTime) })),
  //             minutely: minutely.map(minute => ({ ...minute, dateTime: moment.unix(minute.dt).tz(timezone).format(momentTimezoneFormats.fullDateTime) })),
              
  //             sunsetInUnix,
  //             sunriseInUnix,
  //             dateTimeInUnix,
  //             sunset: moment.unix(sunsetInUnix).tz(timezone).format(momentTimezoneFormats.fullDateTime),
  //             sunrise: moment.unix(sunriseInUnix).tz(timezone).format(momentTimezoneFormats.fullDateTime),
  //             dateTime: moment.unix(dateTimeInUnix).tz(timezone).format(momentTimezoneFormats.fullDateTime),
  //             currently: moment.unix(dateTimeInUnix).tz(timezone).format(momentTimezoneFormats.fullDateTime),

  //             dewPointInKelvin,
  //             temperatureInKelvin,
  //             windSpeedInMetersPerSecond,
  //             dewPointInKelvinLabel: `${dewPointInKelvin} K`,
  //             temperatureInKelvinLabel: `${temperatureInKelvin} K`,
  //             windSpeedInMetersPerSecondLabel: `${windSpeedInMetersPerSecond} m/s`,
  //             dewPointInCelsius: convertTemperatureFromKelvinToCelsius(dewPointInKelvin),
  //             dewPointInFahrenheit: convertTemperatureFromKelvinToFahrenheit(dewPointInKelvin),
  //             temperatureInCelsius: convertTemperatureFromKelvinToCelsius(temperatureInKelvin),
  //             temperatureInFahrenheit: convertTemperatureFromKelvinToFahrenheit(temperatureInKelvin),
  //             dewPointInCelsiusLabel: `${convertTemperatureFromKelvinToCelsius(dewPointInKelvin)} °C`,
  //             dewPointInFahrenheitLabel: `${convertTemperatureFromKelvinToFahrenheit(dewPointInKelvin)} °F`,
  //             temperatureInCelsiusLabel: `${convertTemperatureFromKelvinToCelsius(temperatureInKelvin)} °C`,
  //             temperatureInFahrenheitLabel: `${convertTemperatureFromKelvinToFahrenheit(temperatureInKelvin)} °F`,
  //             windSpeedInMilesPerHour: convertWindSpeedFromMetersPerSecondToMilesPerHour(windSpeedInMetersPerSecond),
  //             windSpeedInMilesPerHourLabel: `${convertWindSpeedFromMetersPerSecondToMilesPerHour(windSpeedInMetersPerSecond)} mph`,
  //           }

  //           return weatherAndTime;
  //         }

  //       }

  //   } catch (getWeatherAndTimeDataError) {
  //     return { location, error, getWeatherAndTimeDataError };
  //   }
  // }

  // const getLocations = async (location) => {
  //  try {
  //   let openStreetMapsNominatimAPIURL = `https://nominatim.openstreetmap.org/search`;
  //   let openStreetMapsNominatimLocationQuery = `${openStreetMapsNominatimAPIURL}?addressdetails=1&extratags=1&namedetails=1&q=${location}&format=json`;
  //   let openStreetMapsNominatimLocationResponse = await fetch(openStreetMapsNominatimLocationQuery);

  //   if (openStreetMapsNominatimLocationResponse.ok == true) {
      
  //     let openStreetMapsNominatimLocationData = await openStreetMapsNominatimLocationResponse.json();
  //     let locations = openStreetMapsNominatimLocationData;

  //     if (Array.isArray(locations) && locations.length > 0) {
  //       locations = generateNewLocations(locations);
  //     }

  //     return locations;
  //   } else {
  //     return openStreetMapsNominatimLocationResponse;
  //   }
  //  } catch (locationError) {
  //   return { location, error, locationError };
  //  }
  // }
  
  if (req.method === `GET`) {
    try {
      let locations = await isValid(location) ? [location, browserTimezone, browserTimezoneCityOrRegion] : [browserTimezone, browserTimezoneCityOrRegion];
      // let locationsWithWeatherAndTime = await locations.map((locat, locatIndex) => {
      //   return {
      //     ...locat,
      //     index: locatIndex + 1,
      //   }
      // })
      res.status(200).json(locations);
    } catch (APIError) {
      res.status(500).json({ APIError, error: `Error getting GeoData` });
    }
  } else {
    res.status(405).json({ error: `Error getting GeoData from Server` });
  }
}