const input = document.getElementById("text");
const form = document.querySelector("form");
let town = " ";




async function fetchWeather(town) {
    await fetch(`http://api.openweathermap.org/data/2.5/find?q=${town}&units=metric&lang=fr&appid=ad833c311d7223b6bcf85c641143f86e`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  
    
  }

//Mise en forme 
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

  
input.addEventListener("input", (e) => {
    town = transform(e.target.value);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchWeather(town);
  });
