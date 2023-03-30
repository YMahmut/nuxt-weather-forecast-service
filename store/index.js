import axios from "axios";

export const state = () => ({
    selectedCityData:null,
    city:"",
    citiesForTable:["London","New York","Tokyo","Istanbul"],
    allCitiesForTable:[],
    showInput:false,
    forecastData:null,
    url:"https://api.openweathermap.org/data/2.5/",
    apik:process.env.MY_WEATHER_APIK || "appid=...", /* Remove this three dot ("...") and just Enter your openweathermap api key here*/
    isLocationPermissionAsked:false,
  })
  
  export const getters = {
  }
  
  export const mutations = {
    setCityData(state,payload){
        state.selectedCityData=payload;
        if(!!payload)
            state.city=`${payload.name}`;
    },
    setForecastData(state,payload){
        state.forecastData=payload;
        if(!!payload)
        state.city=`${payload.city.name}`;
    },
    setAllCitiesForTable(state,payload){
        state.allCitiesForTable.unshift(payload);
        
    },
    setShowInput(state){
        state.showInput=true;
    },
    setLocationPermissionAsked(state){
        state.isLocationPermissionAsked=true;
    }
  }
  
  export const actions = {
    async getCurrentWeatherData({ state, commit,dispatch },payload) {
        commit("setCityData",null);
        const city=!!payload ? payload : state.city || "İstanbul";
        if(!!city && !!city.length)
            await axios.get(state.url + "weather?" + `q=${city}&&` + state.apik +"&units=metric")
            .then(res=>{
                console.log("curretn data store",res.data);
                setTimeout(()=>{
                    commit("setCityData",res.data);
                },300)
            }).catch((e)=>{
                console.log(e)
            })
            .finally(()=>{   
                if(!state.showInput)
                setTimeout(()=>{
                    commit("setShowInput");
                    dispatch("getAllData"); 
                },500)
            })

    },
    async getAllData({state,commit}){
        state.citiesForTable.forEach(async(city)=>{
            await axios.get(state.url + "weather?" + `q=${city}&&` + state.apik +"&units=metric")
            .then(res=>{
              commit("setAllCitiesForTable",res.data)
            }).catch((e)=>{
                console.log(e)
            })
          });
    },
    async getForecastData({state,commit},payload){
        const city=!!payload ? payload : state.city || "İstanbul";
        if(!!city && !!city.length)
            axios.get(state.url + "forecast?" + `q=${city}&&` + state.apik +"&units=metric")
            .then(res=>{
                commit("setForecastData",res.data);
            }).catch((e)=>{
                console.log(e)
            })
    },
  }