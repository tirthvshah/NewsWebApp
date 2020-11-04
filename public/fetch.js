
class Fetch {
    async getCurrent(input) {
      const myKey = "deb145de56e63ef0be539c0e0dbb2f2d";
  
      //make request to url
  
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=Metric&appid=${myKey}`
      );
  
      const data = await response.json();
  
      console.log(data);
  
      return data;
    }
}