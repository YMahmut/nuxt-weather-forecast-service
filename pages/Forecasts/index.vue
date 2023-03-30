<template>
    <div style="background-color: rgb(221 218 214);height: 100%;padding: 5%;">
        <button class="btn-1 cursor-poninter" @click="$router.push('/')"> Home</button>
        <button class="btn-1" @click="$router.push('/CurrentWeather')"> Return Back</button>
        <div class="location-msg-wrapper">
            <div >
                <button class="btn-1 cursor-poninter" v-if="dataType==='CurrentWeather'" @click="OpenSelection('Forecasts')">Forecasts</button>
            </div>
        </div>
        <div class="input-wrapper">  
            <autocomplete-input autofocus v-model="searchingCity" :SelectCity="SelectCity"/>
        </div>


        <transition-group name="list">
            <div key="t-f-1-1" v-if=" !!forecastData && shiftTime" class="container-wrapper">  
                <h2>{{ forecastData.city.name }} ( {{ forecastDay ==="nextDay" ? getNextDay : forecastDay }} )</h2>
                <ul class="container">
                    <li :key="index" v-for="(fcast,index) in ForecastData(forecastDay)">
                        <h3 >{{ fcast.dt_txt.substring(10,16) }}</h3>
                        <h2 >{{  Math.floor(fcast.main.temp) }} °C</h2>
                        <h4>{{ fcast.weather[0].description }}</h4>
                        <img :src="`https://api.openweathermap.org/img/w/${fcast.weather[0].icon}.png`">
                    </li>
                </ul>
            </div>
            <div key="t-f-1-2" v-if="!!forecastDay" class="container-wrapper forecasts-buttons">
                    <button v-if="forecastDay !=='Today'" class="btn-1" @click="SelectForecastDay('Today')">Today</button>
                    <button v-if="forecastDay !=='Tomorrow'" class="btn-1" @click="SelectForecastDay('Tomorrow')">Tomorrow</button>
                    <button v-if="forecastDay !=='nextDay'" class="btn-1" @click="SelectForecastDay('nextDay')">{{ getNextDay}}</button>
            </div>
        </transition-group>

    </div>
</template>

<script >
import { mapActions, mapState } from "vuex";
    export default {
        data(){
            return{
                searchingCity:"",
                locationErrorMessage:"",
                location:{
                    x:null,
                    y:null,
                },
                dataType:"Forecasts",
                isMessageShowing:true,
                forecastDay:"Today",
                shiftTime:true,
            }
        },
        computed:{
            ...mapState({
                forecastData:(state)=>state.forecastData,
                city:(state)=>state.city,
            }),
            getNextDay(){
                const today= new Date();
                today.setDate(today.getDate()+2);
                return today.toLocaleDateString("en", { weekday: 'long' });
            },
            tomorrow(){
                const today= new Date();
                today.setDate(today.getDate()+1);
                return today;
            },
            theDayAfterTomorrow(){
                const today= new Date();
                today.setDate(today.getDate()+2);
                return today;
            },
        },
        created(){
            setTimeout(()=>{
                this.isMessageShowing=false;
            },2500)
        },
        mounted(){
            this.getForecastData(this.city);
        },
        methods:{
            ...mapActions({
                getForecastData:"getForecastData"
            }),
            SelectForecastDay(day){
                this.shiftTime=false;
                this.forecastDay=day;
                setTimeout(()=>{
                    this.shiftTime=true;
                },500)
                
            },
            ForecastData(forecastDay="Today"){
                if(forecastDay==="Today")
                    return this.forecastData.list.filter(f=>(new Date(f.dt_txt)).getDate()===(new Date()).getDate());
                else if(forecastDay==="Tomorrow")
                    return this.forecastData.list.filter(f=>(new Date(f.dt_txt)).getDate()===this.tomorrow.getDate());
                else if( forecastDay === "nextDay")
                    return this.forecastData.list.filter(f=>(new Date(f.dt_txt)).getDate()===this.theDayAfterTomorrow.getDate());
            },
            OpenSelection(selection){
                this.dataType=selection;
                this.$router.push("/"+selection);
            },
            
            SelectCity(){
                setTimeout(()=>{
                    this.getForecastData(this.searchingCity);
                },500);
            }
        },
    }
</script>

<style scoped>

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
    transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translate3d(-41px, -41px, -135px);
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
}
.location-msg > .success-p{
    background: blue;
    border: none;
}
.location-msg > p{
    margin: 10px;
    padding:20px;
    border-radius: 15px;
    border:none;
}
.input-wrapper{
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.container-wrapper{
    margin: 0 3% 0 3%;
    border-radius: 15px;
}
.forecasts-buttons{
    display: flex;
    justify-content: flex-end;
}
.city-searching-input{
    margin:10px;
    padding:13px;
    border-radius: 7px;
    font-size: large;
}
.container{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    background: antiquewhite;
    border-radius: 13px;
    list-style: none;
}
.container>* {
    flex: 1 1 10%;
    padding: 10px;
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
  transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>