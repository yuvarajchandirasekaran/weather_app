// ------------in this section we select all the elements for writing script------------
let input = document.querySelector('.cityinput')
let place = document.querySelector('.location')
let tempreature = document.querySelector('.temprature')
let realfeel = document.querySelector('.realfeel')
let Dishumidity = document.querySelector('.humidity')

let min = document.querySelector('.temp_min')
let max = document.querySelector('.temp_max')
let wind = document.querySelector('.wind')
let time = document.querySelector('.time')
let description = document.querySelector('.weatherdescription')
let image = document.querySelector('.img')
let back = document.querySelector('.back')
let imgessss = document.querySelector(".body")
let moreInfoDiv = document.querySelector('.viewMore')
let viewBtn = document.querySelector('.Btn1')
let bar = document.querySelector('.bar')


// -----------below part for store the background images in array of object------------
let natureImg = [{
    url: 'Back_images/393735.jpg',
},
{
    url: 'Back_images/2-nature-wallpaper-grass.jpg'
},
{
    url: 'Back_images/10950083.jpg'
},
{
    url:'Back_images/tree.jpeg'
},
{
    url:'Back_images/Green-Grass-Field-Wallpaper.jpg'
}]

// --------below part we assign initial value for j variable-----------------
let j = 0;

// -----------this set interval function will change our background image every 6000 milli seconds once----------------
    setInterval(() => {

        // ------this j++ increment will increment the value from zero upto our array length-------

        j++
//  ----------below condition will check if the j value equal to our array length if the condition is true then j value reassign 0--------------     

        if (j == natureImg.length) {
            j = 0
        }
// ----------below part is for assign the url to the background up to our array length-----------

        document.body.style.background = `url(${natureImg[j].url}) no-repeat`;
    }, 6000);


// ------below api key is used for access the open weather website-----------

let api_key = '86e8db4b3ed405a66cac748899d105ab';


let defaultCity = "chennai"
// -------once the window will be loaded weather info show for default city----------
window.addEventListener('DOMContentLoaded', getWeatherInfo(defaultCity))

// ----------this below part used when user search any city then the input value passed to the getweatherinfo function 
//                 and show the result for the searched city----------------------
input.addEventListener('keyup', (e) => {
    let searchCity = e.target.value
    getWeatherInfo(searchCity)
    // console.log(input.value[0]);

})

// ---------below function is to hit the api and get the info ----------------
function getWeatherInfo(city) {
// -------this fetch function used to fetch the value by api link ---------------
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
        .then(res => res.json())
        .then(res => {
            // console.log(res);
   // ----------in this part we will assign all fetched values to our html element ---------
            let fetchedTempreature = Math.floor(res.main.temp - 273.15)
            let temp_min = Math.floor(res.main.temp_min - 273.15)
            let temp_max = Math.floor(res.main.temp_max - 273.15)
            let fetchedImg = res.weather[0].icon
            let humidity = res.main.humidity
            let searchPlaceName = res.name
            let countryname = res.sys.country
            let realFeelWeather = Math.floor((res.main.feels_like) - 273.15)
            let windspeed = Math.floor(res.wind.speed * 3.6)
            let weatherDescript = res.weather[0].description


            image.src = `http://openweathermap.org/img/w/${fetchedImg}.png`
            wind.innerHTML = `காற்றின் வேகம்:${windspeed} கி.மீ/மணி`
            realfeel.innerText = `உணரக்கூடிய வெப்பநிலை:${realFeelWeather}°செ`
            Dishumidity.innerText = `ஈரப்பதம்:${humidity}%`
            place.innerHTML = `இடம்:${searchPlaceName},${countryname}.`
            description.innerText = `வானிலை விவரம்:${weatherDescript}`
            tempreature.innerText = `${fetchedTempreature}°செ`
            min.innerHTML = `குறைந்தபட்ச வெப்பநிலை:${temp_min}°செ`
            max.innerHTML = `அதிகபட்ச வெப்பநிலை:${temp_max}°செ`

// -----------this below function will used to change the value in english into tamil language by switch condition----------
            switch (weatherDescript) {
                case "scattered clouds":
                    description.innerText = 'சிதறிய மேகங்கள்';
                    break;

                case "few clouds":
                    description.innerText = 'மேகங்கள்';
                    break;

                case "clear sky":
                    description.innerText = 'தெளிந்த வானம்';
                    break;

                case "overcast clouds":
                    description.innerText = 'மேகமூட்டம்';
                    break;

                case "broken clouds":
                    description.innerText = 'உடைந்த மேகங்கள்';
                    break;

                case "light rain":
                    description.innerText = 'தூறல்';
                    break;

                case "moderate rain":
                    description.innerText = 'மிதமான மழை';
                    break;

                case "light intensity drizzle":
                    description.innerText = 'மின்னலுடன் கூடிய தூறல்';
                    break;

                case "haze":
                    description.innerText = 'பனிமூட்டம்';
                    break;

                case "thunderstorm":
                    description.innerText = 'இடியுடன் கூடிய மழை';
                    break;

                case "fog", "mist":
                    description.innerText = 'மூடுபனி';
                    break;

                case "heavy intensity rain":
                    description.innerText = 'கடுமையான மழை';
                    break;

                default:
                    description.innerText = '';
                    break;
            }
        }).catch(
            error =>console.log("check your internet connection")
        )
}



// ---------when user click view more info then we will visible the another div-------------

viewBtn.addEventListener('click', () => {
    viewBtn.style.display = "none"
    moreInfoDiv.style.display = "block"
    bar.style.display = 'block'
})

// ----------user click the close btn we will disappear the detailed info div ---------
let closeBtn = document.querySelector('.close').addEventListener('click', () => {
    viewBtn.style.display = "block"
    moreInfoDiv.style.display = "none "
    bar.style.display = 'none'
})


