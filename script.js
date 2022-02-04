const input = document.getElementById("text");
const form = document.querySelector("form");
const list = document.querySelector(".list");
const global = document.querySelector(".global_weather");
const image = document.querySelector("img");

let town;
let date_time;
let cloud;
let temperature;
let temp_feeling;
let pression_hpa;
let humidity;
let speed_wind;
let global_weather;
let icon;



async function fetchWeather(town) {
    await fetch(`http://api.openweathermap.org/data/2.5/find?q=${town}&units=metric&lang=fr&limit=2&appid=ad833c311d7223b6bcf85c641143f86e`)
      .then((res) => res.json())
      .then((data) => {
        
        if (data.cod === '200' && data.count > 0){

          console.log(data);
          data.list.map((obj) => {

            if (obj.sys.country === 'FR' && obj.name.toLowerCase() === town){
                  date_time = timestampConvert(data.list[0].dt); 
                  cloud = obj.clouds.all;
                  temperature = obj.main.temp;
                  temp_feeling = obj.main.feels_like;
                  pression_hpa = obj.main.pressure;
                  humidity = obj.main.humidity;
                  speed_wind = obj.wind.speed;
                  global_weather = obj.weather[0].description;
                  icon = obj.weather[0].icon
                  console.log(icon);
            }
          })
        }else alert('Erreur saisir de nouveau');
      });
} 


let afficher = () => {

  global.innerHTML = `<h2>Météo de la ville de ${town} <br> ${date_time}</h2>
                      <p>${global_weather}</p>`
  list.innerHTML = `
                    <ul>
                      <li>Temperature : ${temperature}  °C</li>
                      <li>Temperature ressentie : ${temp_feeling}  °C</li>
                      <li>Pression atmosphétique : ${pression_hpa}  hPa</li>
                      <li>Humidité : ${humidity}  %</li>
                      <li>vent : ${speed_wind}  m/s</li>
                    </ul>
                    `
  switch (icon) {
      case '01n' :
       image.setAttribute('src', 'http://openweathermap.org/img/wn/01d@2x.png');
      break;
      case '02n':
        image.setAttribute('src', 'http://openweathermap.org/img/wn/01d@2x.png');
      break;
      case '03n':
        image.setAttribute('src', 'http://openweathermap.org/img/wn/01d@2x.png');
        break;
      case '04n':
        image.setAttribute('src', 'http://openweathermap.org/img/wn/01d@2x.png');
      break;
      case '09n':
        image.setAttribute('src', 'http://openweathermap.org/img/wn/01d@2x.png');
      break;
      case '10n':
        image.setAttribute('src', 'http://openweathermap.org/img/wn/01d@2x.png');
      break;
      case '11n':
        image.setAttribute('src', 'http://openweathermap.org/img/wn/01d@2x.png');
      break;
      case '13n':
        image.setAttribute('src', 'http://openweathermap.org/img/wn/01d@2x.png');
      break;
      case '50n':
        image.setAttribute('src', 'http://openweathermap.org/img/wn/01d@2x.png');
      break;
      default:
  }
}

        
  
///////Convertion du temps timestamp (nbre de seconde depuis 1970) au format jj/mm/aaaa hh:mm. code source du web web//////////////////
let timestampConvert = (unixTimestamp) => {
  var date = new Date(unixTimestamp*1000);
  return "Date: "+date.getDate()+
            "/"+(date.getMonth()+1)+
            "/"+date.getFullYear()+
            " "+date.getHours()+
            ":"+date.getMinutes()+
            ":"+date.getSeconds();
}

///////////////////////////////////Mise en forme de l'input type text////////////////////////////

let transform = (city_lower) => {
  let lower;
  lower = city_lower.toLowerCase();
  if (lower.indexOf(" ") !== -1){
    while (lower.indexOf(" ") !== -1){
        lower = lower.replace(" ", "+");
    }
    } 
  return lower;
}
/////////////////////////////////Debut du programme///////////////////////////////////////////////////
  
input.addEventListener("input", (e) => {
    town = transform(e.target.value);
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await fetchWeather(town);
    await afficher();
    
  });
