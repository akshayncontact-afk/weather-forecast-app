class WeatherApp {
    constructor() {
        this.apiKey = 'KEY_HERE';//USE YOUR API KEY
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
        this.initializeApp();
    }

    initializeApp() {
        this.bindEvents();
        this.setCurrentDate();
        
        
        this.getWeatherByCity('Chennai');
    }

    bindEvents() {
        const searchBtn = document.getElementById('search-btn');
        const cityInput = document.getElementById('city-input');

        searchBtn.addEventListener('click', () => {
            this.handleSearch();
        });

        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
    }

    handleSearch() {
        const cityInput = document.getElementById('city-input');
        const city = cityInput.value.trim();

        if (city) {
            this.getWeatherByCity(city);
            cityInput.value = '';
        }
    }

    async getWeatherByCity(city) {
        this.showLoading(true);
        this.hideError();

        try {
            const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('City not found');
            }

            const data = await response.json();
            this.displayWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            this.showError();
        } finally {
            this.showLoading(false);
        }
    }

    displayWeatherData(data) {
        const weatherCard = document.getElementById('weather-card');
        
        
        document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
        
        
        document.getElementById('temp-value').textContent = Math.round(data.main.temp);
        
        
        document.getElementById('weather-description').textContent = data.weather[0].description;
        
        
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById('weather-icon').src = iconUrl;
        document.getElementById('weather-icon').alt = data.weather[0].description;
        
        
        document.getElementById('feels-like').textContent = `${Math.round(data.main.feels_like)}°C`;
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('wind-speed').textContent = `${data.wind.speed} m/s`;
        document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;

        
        weatherCard.style.animation = 'none';
        setTimeout(() => {
            weatherCard.style.animation = 'fadeIn 0.5s ease-out';
        }, 10);
    }

    setCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const dateString = now.toLocaleDateString('en-US', options);
        document.getElementById('current-date').textContent = dateString;
    }

    showLoading(show) {
        const weatherCard = document.getElementById('weather-card');
        if (show) {
            weatherCard.classList.add('loading');
        } else {
            weatherCard.classList.remove('loading');
        }
    }

    showError() {
        const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'block';
        
        // Hide error after 5 seconds
        setTimeout(() => {
            this.hideError();
        }, 5000);
    }

    hideError() {
        const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'none';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});


function formatTemperature(temp) {
    return Math.round(temp);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}