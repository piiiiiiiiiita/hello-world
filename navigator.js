// NAVIGATOR
console.group("GET NAVIGATOR");
console.log("User needs to give the access");
console.groupEnd();

navigator.geolocation.getCurrentPosition((poloha) => {
  console.log(poloha);
  let lat = poloha.coords.latitude;
  let long = poloha.coords.longitude;
  //TEST FORECAST - REMOVE
  async function getWeatherForecast() {
    apiURLForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=75074b9c3607f02aba3fabef4f056ec2&units=metric`;
    let getWeatherDataForecast = await fetch(apiURLForecast).then((res) =>
      res.json()
    );
    console.log(
      "This the demo selector for FORECAST showing: " +
        getWeatherDataForecast.list[7].dt_txt
    );
  }
  getWeatherForecast();
  //end TEST FORECAST - REMOVE
});
//NAVIGATOR VALIDATE
navigator.geolocation.watchPosition(
  async function (poloha) {
    // Call Openweather api
    async function getWeather() {
      let apiWeather = "75074b9c3607f02aba3fabef4f056ec2";
      let lat = poloha.coords.latitude;
      let long = poloha.coords.longitude;
      console.log("lat: " + lat + " | long: " + long);
      let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&lang=vi&appid=${apiWeather}&units=metric`;
      let getWeatherData = await fetch(apiURL).then((res) => res.json());
      console.log(getWeatherData);

      // return openweatherdata to DOM
      let welcome = document.querySelector(".welcome");
      welcome.innerHTML = "Your GPS is ON!";

      let city = document.querySelector(".city");
      city.innerHTML = getWeatherData.name;

      let temp = document.querySelector(".temp");
      temp.innerHTML = Math.round(getWeatherData.main.temp) + " °C";
    }
    getWeather();
  },
  //When user DENIED
  function (error) {
    if (error.code == error.PERMISSION_DENIED)
      console.log("USER RUFUSED TO SHARE GPS");
    let welcome = document.querySelector(".welcome");
    welcome.innerHTML = "Your GPS is OFF! The app is not running.";
  }
);
