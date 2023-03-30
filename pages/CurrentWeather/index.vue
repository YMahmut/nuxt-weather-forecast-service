<template>
    <div style="background-color: rgb(221 218 214);height: 100vh;padding: 1%;" >
      
        <button class="btn-1 cursor-poninter" @click="$router.push('/')">Home</button>
  
        <div class="location-msg-wrapper">
            <transition-group name="fade">
                <div :key="'fade-1'" v-if="isMessageShowing" class="location-msg">
                    <p :key="'fade-1-1'" v-if="!location.x || !location.y" class="error-p">{{ errorMessageAboutLocationPermission }}</p>
                </div>
            </transition-group>
            <div >
                <button class="btn-1 cursor-poninter" v-if="weatherDataType==='CurrentWeather'" @click="OpenSelection('Forecasts')">Forecasts</button>
                <button class="btn-1 cursor-poninter" v-else @click="OpenSelection('CurrentWeather')">Current Weather</button>
            </div>
        </div>
  
        <transition-group name="weather-detail">
            <div :key="'list-1'" v-if="!!selectedCityData" class="container-wrapper">  
              <div :key="'list-1-1'" class="container selected-city"  @click="viewDetail(selectedCityData.name)">
                  <h3 :key="'list-1-1-1'">{{ selectedCityData.name }}</h3>
                  <p :key="'list-1-1-2'">{{  Math.floor(selectedCityData.main.temp) }} °C</p>
                  <h4 :key="'list-1-1-3'">{{ selectedCityData.weather[0].description }}</h4>
                  <img :key="'list-1-1-4'" :src="`https://api.openweathermap.org/img/w/${selectedCityData.weather[0].icon}.png`">
              </div>
            </div>
        </transition-group>
        <div class="input-wrapper">  
          <Transition name="bounce">
            <autocomplete-input autofocus v-if="showInput" v-model="searchingCity" :SelectCity="SelectCity"/>
          </Transition>
        </div>
        <TransitionGroup name="bounce">
          <ul :key="'bounce-0'" v-if="!!allCitiesForTable && allCitiesForTable.length>=4" class="citiesForTable-list-wrapper" :style="!!searchingCity.length ? {opacity:'0.1'}:{}">
            <li class="citiesForTable-list" :key="'bounce-'+index" v-for="(specificCity,index) in allCitiesForTable" @click="viewDetail(specificCity.name)">
                <span :key="'bounce-'+index+'-1'">{{ specificCity.name }}</span>
                <span :key="'bounce-'+index+'-2'" >{{  Math.floor(specificCity.main.temp) }} °C</span>
                <span :key="'bounce-'+index+'-3'">{{ specificCity.weather[0].description }}</span>
                <img :key="'bounce-'+index+'-4'" :src="`https://api.openweathermap.org/img/w/${specificCity.weather[0].icon}.png`">
            </li>
          </ul>
        </TransitionGroup>
    </div>
  </template>
  
  <script >
  import axios from "axios";
  import { mapActions, mapMutations, mapState } from 'vuex'
  
    export default {
        data(){
            return{
                searchingCity:"",
                errorMessageAboutLocationPermission:"",
                location:{
                    x:null,
                    y:null,
                },
                weatherDataType:"CurrentWeather",
                isMessageShowing:true,
            }
        },
        computed:{
          ...mapState({
              selectedCityData:(state)=>state.selectedCityData,
              city:(state)=>state.city,
              citiesForTable:(state)=>state.citiesForTable,
              allCitiesForTable:(state)=>state.allCitiesForTable,
              showInput:(state)=>state.showInput,
              url:(state)=>state.url,
              apik:(state)=>state.apik,
              isLocationPermissionAsked:(state)=>state.isLocationPermissionAsked,
          })
        },
        created(){
            setTimeout(()=>{
                this.isMessageShowing=false;
            },2500)
        },
        mounted(){
            this.getLocation();
        },
        methods:{
            ...mapActions({
                getCurrentWeatherData:'getCurrentWeatherData'
            }),
            ...mapMutations({
                setLocationPermissionAsked:"setLocationPermissionAsked",
            }),
          getLocation(){
                if(this.isLocationPermissionAsked) {
                    this.getCurrentWeatherData()
                    return;
                }
                const succcessCallback=(position)=>{
                    if(!!position && !!position.coords && !!position.coords.latitude)
                        this.location["x"]=position.coords.latitude;
                    if(!!position && !!position.coords && !!position.coords.longitude)
                        this.location["y"]=position.coords.longitude;
                    console.log(position)
                    this.getCityByLocation();
                }
                const errorCallback = (error)=>{
                    this.errorMessageAboutLocationPermission=error.message;
                    console.log(error);
                    this.getCityByLocation();
                }
                navigator.geolocation.getCurrentPosition(succcessCallback, errorCallback);
            },
  
           async getCityByLocation(){
              if(!!this.location && !!this.location.x && !!this.location.y){
                const lat=this.location.x;
                const lng=this.location.y;
                await axios.get(this.url + "weather?"  + `lat=${lat}&lon=${lng}&` + this.apik )
                  .then((res)=>{
                    this.getCurrentWeatherData(res.data.name); 
                  })
                  .catch((e)=>console.log(e))
                  .finally(()=>{
                    this.setLocationPermissionAsked();
                  });
              }else this.getCurrentWeatherData();
          },
            SelectCity(){
                this.getCurrentWeatherData(this.searchingCity);
            },
                  
            OpenSelection(selection){
                this.weatherDataType=selection;
                this.$router.push("/"+selection);
            },
            viewDetail(cityName){
              this.$router.push('/CurrentWeather/'+cityName);
            }
        },
    }
  </script>
  
  <style scoped>
  
  .list-item {
  display: inline-block;
  margin-right: 10px;
  }
  .weather-detail-enter-active, .weather-detail-leave-active { transition: opacity .5s; }
    .weather-detail-enter, .weather-detail-leave-active { opacity: 0; }
  
  .citiesForTable-list{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    background: antiquewhite;
    border-radius: 9px;
    margin:1px
  }
  .citiesForTable-list > span{
    margin: 10px;
    padding: 10px;
    font-weight: 500;
    font-family: sans-serif;
  }
  .citiesForTable-list:hover{
    cursor: pointer;
    background: rgb(242, 201, 134) ;
  }
  .selected-city:hover{
    cursor: pointer;
    background: rgb(242, 201, 134) ;
  }
  .citiesForTable-list-wrapper{
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .location-msg-wrapper{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    border:none;
  }
  .location-msg > .error-p{
    background: #eb5c5c;
    color:papayawhip;
    border: none;
  }
  
  .location-msg > p{
    margin: 10px;
    padding:20px;
    border-radius: 15px;
    border:none;
  }
  
  .bounce-enter-active {
    animation: bounce-in 2s;
  }
  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
  }
  .input-wrapper{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  
  .container-wrapper{
    
    border-radius: 15px;
  }
 
  .container{
    display: flex;
    flex-direction: row;
    margin: 20px;
    padding: 10px;
    align-items: center;
    justify-content: space-evenly;
    background: antiquewhite;
    border-radius: 13px;
  }
  .cursor-pointer{
    cursor: pointer;
  }
  .btn-1{
    margin:20px;
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
  
  .fade-enter-active, .fade-leave-active {
  transition: opacity 3s;
  }
  .fade-enter, .fade-leave-to  {
  opacity: 0;
  }
  </style>