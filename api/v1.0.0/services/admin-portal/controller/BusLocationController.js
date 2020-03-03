const Locations = require('./../database/Locations');
const {
  getDistance,
  convertDistance,
  getSpeed,
  convertSpeed
} = require('geolib');
const rp = require('request-promise');
const axios = require('axios');
const AssignDriver = require('./../database/AssignDriver');

// save locations

exports.saveLocations = (req, res, next) => {
  Locations.getLocation({
    bus_no: req.body.bus_no
  }).then((result) => {
    // console.log(result);
    const pre_location = {
      latitude: result.current_location.latitude,
      longitude: result.current_location.longitude,
      time: result.bus_time
    };
    console.log(pre_location);

    const current_location = {
      latitude: req.body.current_location.latitude,
      longitude: req.body.current_location.longitude,
      time: req.body.bus_time
    };
    
    console.log(current_location);

    var pre_time = pre_location.time.split(":");
    // console.log(pre_time);
    var pre_time_seconds = pre_time[0] * 60 * 60 + pre_time[1] * 60 + pre_time[2] * 1;
    // console.log(pre_time_seconds);

    var now_time = current_location.time.split(":");
    var now_time_seconds = now_time[0] * 60 * 60 + now_time[1] * 60 + now_time[2] * 1;
    // console.log(now_time_seconds);

    var time_varience_s = now_time_seconds - pre_time_seconds;
    // console.log(time_varience);
    // console.log(pre_location);
    // console.log(current_location);
    let distance_m = getDistance(pre_location, current_location, 1000);
    let distance_km = convertDistance(distance_m, 'km');
    let bus_speed = distance_m / time_varience_s;
    let bus_speed_kmh = convertSpeed(bus_speed, 'kmh');
    // console.log(bus_speed_kmh);

    // const api_key = '7568b071b962c8b0e643078145cd8bb0';
    // const api_url = `api.openweathermap.org/data/2.5/weather?lat=${current_location.latitude}&lon=${current_location.longitude}&appid=${api_key}`;

    // let weather = {
    //     uri: `api.openweathermap.org/data/2.5/weather?lat=${current_location.latitude}&lon=${current_location.longitude}&appid=${api_key}`,
    //     headers: {
    //         'User-Agent': 'Request-Promise'
    //     },
    //     json: true
    // };
    
    // rp(weather).then((result => {
    //     console.log(JSON.parse(result));
    // })).catch((error) => {
    //     console.log('weather api call error');
    // });

    // let weather = getWeather(current_location.latitude, current_location.longitude, api_key);
    // console.log(weather);

    Locations.saveLocation({
      bus_no: req.body.bus_no,
      distance: distance_km,
      current_location: req.body.current_location,
    //   weather: req.body.weather,
      road_condition: req.body.road_condition,
      bus_time: req.body.bus_time,
      speed_of_bus: bus_speed_kmh
    }).then((result) => {
      console.log('Location Added!');
      res.status(200).json({
        messege: 'Location Added!'
      });
    }).catch((error) => {
      console.log(error);
      res.status(500).json({
        messege: 'Location Added Failed'
      });
    });
  }).catch((error) => {
    console.log(error);
    res.status(400).json({
      messege: 'get latest bus location failed'
    });
  });

};

// get latest location

exports.getLocation = (req, res, next) => {
  Locations.getLocation({
    // bus_no: req.body.bus_no
  }).then((result) => {
    console.log(result);
    res.status(200).json({
      messege: result
    });
  }).catch((error) => {
    console.log(error);
    res.status(400).json({
      messege: 'get latest bus location failed'
    });
  });
};

// get all bus locations

exports.getLocations = (req, res, next) => {
  Locations.getLocations({}).then((result) => {
    console.log(result);
    res.status(200).json({
      messege: result
    });
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      messege: 'Get bus location details failed!'
    });
  });
};

// get latest location for android request

exports.getLatestLocation = (req, res, next) => {
  Locations.getLatestLocation({
    bus_no: req.params.bus_no
  }).then((result) => {
    console.log(result);
    res.status(200).json({
      latitude: result.current_location.latitude,
      longitude: result.current_location.longitude
      // messege: result
    });
  }).catch((error) => {
    console.log(error);
    res.status(400).json({
      messege: 'get latest bus location failed'
    });
  });
};

// to get weather

// function getWeather(lat, lon, key) {
//     var url = `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
//     axios.get(url).then((response) => {
//         let temp = response.data.main.temp;
//         console.log("hey"+temp);
//     }).catch(error => {
//         console.log(error);
//     });
// };
