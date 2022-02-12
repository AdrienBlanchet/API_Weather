const input = document.getElementById("text");
const form = document.querySelector("form");
const list = document.querySelector(".list");
const global = document.querySelector(".global_weather");
const buttons = document.querySelectorAll(".button")
const logos = document.querySelectorAll(".button >  img")


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
let unité;





async function fetchWeather(town) {
    await fetch(`http://api.openweathermap.org/data/2.5/find?q=${town}&units=metric&lang=fr&appid=ad833c311d7223b6bcf85c641143f86e`)
      .then((res) => res.json())
      .then((data) => {
        
        if (data.cod === '200' && data.count > 0){

          console.log(data);
          

          let filterTab = [];
          filterTab = data.list.filter((obj) => obj.sys.country === 'FR' && obj.name.toLowerCase() === town)
          filterTab.forEach((obj) => {

            date_time = timestampConvert(data.list[0].dt); 
            cloud = obj.clouds.all;
            temperature = obj.main.temp;
            temp_feeling = obj.main.feels_like;
            pression_hpa = obj.main.pressure;
            humidity = obj.main.humidity;
            speed_wind = obj.wind.speed;
            global_weather = obj.weather[0].description;
            icon = obj.weather[0].icon
            

            afficher();

          }
         )
        }else alert('Erreur saisir de nouveau');
      });
} 



let afficher = () => {

  global.innerHTML = `<h2>Météo de la ville de ${town} <br> ${date_time}</h2>
                      <p>${global_weather}</p>
                      <img class="icon_weather">`
  
  const image = document.querySelector(".icon_weather");
  
  switch (icon) {
      case '01n' :
      case '01d' :
        image.setAttribute('src', 'http://openweathermap.org/img/wn/01d@2x.png');
        break;
      case '02n':
      case '02d' :
        image.setAttribute('src', 'http://openweathermap.org/img/wn/02d@2x.png');
        break;
      case '03n':
      case '03d' :
        image.setAttribute('src', 'http://openweathermap.org/img/wn/03d@2x.png');
        break;
      case '04n':
      case '04d' :
        image.setAttribute('src', 'http://openweathermap.org/img/wn/04d@2x.png');
      break;
      case '09n':
      case '09d' :
        image.setAttribute('src', 'http://openweathermap.org/img/wn/09d@2x.png');
      break;
      case '10n':
      case '10d' :
        image.setAttribute('src', 'http://openweathermap.org/img/wn/10d@2x.png');
      break;
      case '11n':
      case '11d' :
        image.setAttribute('src', 'http://openweathermap.org/img/wn/11d@2x.png');
      break;
      case '13n':
      case '13d' :
        image.setAttribute('src', 'http://openweathermap.org/img/wn/13d@2x.png');
      break;
      case '50n':
      case '50d' :
        image.setAttribute('src', 'http://openweathermap.org/img/wn/50d@2x.png');
      break;
      default:
  }
}
///////////////////////////Fonction qui afficher les info aux clic des boutons//////////////////////////////////////////////////////////////////////////////

let affiche_clic = (clic) => {
  if (clic.match("u") != null) {                // match() retourne un tableau en précisant la position de la lettre passé en paramètre dans la chaine de caratère
    alert("Veuillez entrer le nom d'un ville")  // si la condition est différent de null cela veut dire que clic contient une valeur précise et non "undefined"
  }else{
    list.innerHTML = `${clic}`

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
        lower = lower.replace(" ", "-");
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
    
    
  });


buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    
    console.log(e.target.className);

    switch (e.target.className) {
      case 'button button_T':
      case 'icon_T' :
       unité = " °C" ;
       affiche_clic(temperature + unité);
      break;
      case 'button button_Tf':
      case 'icon_Tf' :
        unité = " °C" ;
       affiche_clic(temp_feeling + unité);
      break;
      case 'button button_W':
      case 'icon_W' :
        unité = " m/s" ;
       affiche_clic(speed_wind + unité);
      break;
      case 'button button_P':
      case 'icon_P' :
        unité = " hPa" ;
       affiche_clic(pression_hpa + unité);
      break;
      case 'button button_H':
      case 'icon_H' :
        unité = " %" ;
       affiche_clic(humidity + unité);
      break;
      case 'button button_C':
      case 'icon_C' :
        unité = " %" ;
       affiche_clic(cloud + unité);
      break;
      default:
      break;
    }
  })
})


    
    
    


