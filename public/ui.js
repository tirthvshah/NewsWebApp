class UI {
    constructor() {
      this.city;
      this.defaultCity = "Mumbai";
      this.temp = document.querySelector('[data-temperature]')
      this.wind = document.querySelector('[data-wind]')
      this.weather = document.querySelector('[data-weather]')
      this.location = document.querySelector('[data-location]')
      this.overcast = document.querySelector('[data-overcast]')
    }
  
    populateUI(data) {
      this.temp.innerHTML = `${data.main.temp}&deg;C`
      this.wind.textContent = data.wind.speed + ' m/s'
      this.weather.innerHTML = data.weather[0].description
      this.location.textContent = data.name + "'s Weather"
      this.overcast.textContent = 'Overcast'
    }
  
    clearUI() {
      uiContainer.innerHTML = "";
    }
  
    saveToLS(data) {
      localStorage.setItem("city", JSON.stringify(data));
    }
  
    getFromLS() {
      if (localStorage.getItem("city" == null)) {
        return this.defaultCity;
      } else {
        this.city = JSON.parse(localStorage.getItem("city"));
      }
  
      return this.city;
    }
  
    clearLS() {
      localStorage.clear();
    }
  }