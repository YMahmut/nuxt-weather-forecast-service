<template>
    <div style="background-color: rgb(221 218 214);height: 100vh;padding: 1%;">
      <button class="btn-1" @click="$router.push('/CurrentWeather')"> Return Back</button>

      <transition-group  name="weather-detail" :duration="{enter:500,leave:800}">
          <div :key="'list-1'" v-if="isDataShowing">  
            <div :key="'list-1-1'" class="container-wrapper">
              <div>
                <h2 :key="'list-1-1-1'">{{ selectedCityData.name + " / "+  selectedCityData.sys.country }}</h2>
              </div>
              <div  class="container">  
                 <span style="display: flex;flex-direction: row;">
                  <p :key="'list-1-1-2'"> {{ selectedCityData.weather[0].description.charAt(0).toUpperCase() + selectedCityData.weather[0].description.slice(1) }}</p>
                  <img :key="'list-1-1-3'" :src="`https://api.openweathermap.org/img/w/${selectedCityData.weather[0].icon}.png`"/>
                 </span>
                </div>
              <div  class="container">
                <p :key="'list-1-1-4'">Current Temperature: {{  Math.floor(selectedCityData.main.temp) }} °C</p>
                <p :key="'list-1-1-4-1'">Maximum Temperature: {{  Math.floor(selectedCityData.main.temp_max) }} °C</p>
                <p :key="'list-1-1-4-2'">Minimum Temperature: {{  Math.floor(selectedCityData.main.temp_min) }} °C</p>
              </div>
              <div  class="container">
                <p :key="'list-1-1-5'">Presure: {{  selectedCityData.main.pressure }}</p>
                <p :key="'list-1-1-6'">Humidity: {{  selectedCityData.main.humidity }}</p>
                </div>
              <div  class="container">
                <p :key="'list-1-1-7'">Wind Speed: {{  selectedCityData.wind.speed }}</p>
                <p :key="'list-1-1-8'">Wind Deg: {{   selectedCityData.wind.deg }}</p>
              </div>
              </div>
          </div>
      </transition-group>
     
     </div>
  </template>
  
  <script>
import { mapState,mapActions } from 'vuex';

    export default {
      transitions:"weather-detail",
      data(){
        return{
          isDataShowing:false,
        }
      },
      mounted(){
        this.getCurrentWeatherData(this.$route.params.id);
        setTimeout(()=>{
          this.isDataShowing=true
        },1000)
      },
      computed:{
        ...mapState({
          selectedCityData:(state)=>state.selectedCityData
        })
      },
      methods:{
        ...mapActions({
          getCurrentWeatherData:'getCurrentWeatherData'
        }),
      }
    }
  </script>
  
  <style scoped>

  .weather-detail-enter-active, .weather-detail-leave-active { transition: opacity 1s; }
  .weather-detail-enter, .weather-detail-leave-active { opacity: 0; }


.container{
  display: flex;
  flex-direction: row;
  margin: 20px;
  padding: 10px;
  align-items: center;
  justify-content: space-around;
  background: rgb(237, 225, 210);
  border-radius: 9px;
  
}
.container-wrapper{
  display: flex;
  flex-direction: column;
  background: antiquewhite;
  border-radius: 13px;
  margin:40px;
  padding: 30px;
}
.btn-1{
    margin:15px;
    padding:11px;
    border-radius: 7px;
    border: 1px solid rgb(108, 110, 84);
    background-color:rgb(237, 225, 210);
    color:rgb(42, 37, 31);
    cursor: pointer;
    font-weight: 700;
}
.btn-1:hover{
  background-color:rgb(242, 201, 134);
  border: 1px solid white;

}
p{
  font-family: sans-serif;
  font-weight: 600;
}
  </style>