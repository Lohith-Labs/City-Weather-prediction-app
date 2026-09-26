const searchInp=document.querySelector(".search-box input");
const searchBtn=document.querySelector(".search-box img");
const apikey="c002e140fa42406ed12067e41b008d41";

const cityname=document.querySelector(".cityname");
const weatherimg=document.getElementById("weather-img");
const temperature=document.getElementById("temparature");
const humidity=document.getElementById("humid");
const windspeed=document.getElementById("wind-speed");
const weathercond=document.getElementById("weather-condition");
const dateDay=document.querySelector(".day");
const datemonth=document.querySelector(".month");

//date conversion
const today= new Date();
const day=today.toLocaleDateString("en-US",{
        weekday:"long"
    });
const month = today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short"
});

//for error and searching pages
const search=document.querySelector(".search-weather");
const error=document.querySelector(".error-content");
const main=document.querySelector(".weather-content");


//for default search page
search.style.display="block";
error.style.display="none";
main.style.display="none";


//searching
async function searchCity(){
    const city=searchInp.value.trim();
    if(city===""){
        alert("please Enter City");
        return;
    }
    await getweather(city);
    await getforesast(city);

}


//weather function
    async function getweather(city) {
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    const response =await fetch(url);
    const data=await response.json();

    console.log(data);

//404 page
    if(data.cod!="200"){
        search.style.display="none";
        main.style.display="none";
        error.style.display="block";
        return;
    }
//weather page
    else{
        search.style.display="none"
        main.style.display="block";
        error.style.display="none";        
    }
    //city name
    cityname.textContent=data.name;
    //date
    dateDay.textContent=day;
    datemonth.textContent=month;
    //temparature
    temperature.innerText=Math.round(data.main.temp);
    //humidity
    humidity.textContent=data.main.humidity;
    //wind
    windspeed.textContent=Math.round(data.wind.speed);
    //weather condition
    weathercond.textContent=data.weather[0].description;
    //weather image
switch (data.weather[0].main) {
case "Clear":
    weatherimg.src = "assets/for js/sun.png";
    break;
case "Clouds":
    weatherimg.src = "assets/for js/cloudy.png";
    break;
case "Rain":
    weatherimg.src="assets/for js/rainy-day.png";
    break;
case "Drizzle":
    weatherimg.src = "assets/for js/drizzle.png";
    break;
case "Thunderstorm":
    weatherimg.src = "assets/for js/storm.png";
    break;
case "Snow":
    weatherimg.src = "assets/for js/snowflake.png";
    break;
case "Mist":
    weatherimg.src = "assets/for js/mist.png";
    break;
case "Haze":
    weatherimg.src = "assets/for js/haze.png";
    break;
case "Fog":
    weatherimg.src = "assets/for js/fog.png";
    break;
default:
    weatherimg.src = "assets/for js/cloudy.png";
}
        
}


//for cast function
async function getforesast(city) {
const url=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;
const response=await fetch(url);
const forecast=await response.json();
console.log(forecast);
const result =forecast .list.filter(item =>
    item.dt_txt.includes("12:00:00")
);
console.log(result);

result.forEach((element ,num)=> {
    const date=element.dt_txt;
    const md=new Date(date).toLocaleDateString("en-GB",{
        day:"numeric",
        month:"short"
    });
    const temp=element.main.temp;
    const weather=element.weather[0].main;
    const cards=document.querySelectorAll(".weather-day");
    const card=cards[num];
    const cardDate=card.querySelector("#date");
    const cardImg=card.querySelector("#img");
    const cardTemp=card.querySelector("#temp")
    cardDate.textContent=md;
    cardTemp.textContent=Math.round(temp);
    //for cardImage
switch (weather) {
case "Clear":
    cardImg.src = "assets/for js/sun.png";
    break;
case "Clouds":
    cardImg.src = "assets/for js/cloudy.png";
    break;
case "Rain":
    cardImg.src="assets/for js/rainy-day.png";
    break;
case "Drizzle":
    cardImg.src = "assets/for js/drizzle.png";
    break;
case "Thunderstorm":
    cardImg.src = "assets/for js/storm.png";
    break;
case "Snow":
    cardImg.src = "assets/for js/snowflake.png";
    break;
case "Mist":
    cardImg.src = "assets/for js/mist.png";
    break;
case "Haze":
    cardImg.src = "assets/for js/haze.png";
    break;
case "Fog":
    cardImg.src = "assets/for js/fog.png";
    break;
default:
    cardImg.src = "assets/for js/cloudy.png";
}
});
    
}

searchBtn.addEventListener("click",searchCity);
searchInp.addEventListener("keydown",(event)=>{
    if(event.key==="Enter"){
        searchCity();
    }
});
