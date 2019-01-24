
// Sample Geocode Request
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
// With my key:
// https://maps.googleapis.com/maps/api/geocode/json?address=brixton,+london&key=AIzaSyA41PLphAJmRqFf33XmBxgZy4vWnhCo3nM

// Sample Forecast Request
// https://api.darksky.net/forecast/[key]/[latitude],[longitude]
// https://api.darksky.net/forecast/0123456789abcdef9876543210fedcba/42.3601,-71.0589
// With my key: 
// https://api.darksky.net/forecast/e05a005c64b43bb33c9345622d117807/51.4613,-0.1156
// https://api.darksky.net/forecast/e05a005c64b43bb33c9345622d117807/37.8267,-122.4233

// https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/e05a005c64b43bb33c9345622d117807/37.8267,-122.4233

fetch('http://api.openweathermap.org/data/2.5/forecast?q=london&appid=68efcb4ebe0d4d3baaa1fed66ebb6848')
    .then((res) => {
        return res.json();
    })
    .then((myjson) => {
        const forecast = JSON.parse(myjson);
    });
