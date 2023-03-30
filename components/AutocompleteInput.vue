<template>
    <div>
      <input class="city-searching-input" :style="showWarning ? {background:'red'}:{}" type="text" v-model="searchText" @input="filterCities" placeholder="Enter a city..." @keypress.enter="SelectSearchingCity" >
      <ul class="suggestions-wrapper" v-if="showSuggestions">
        <li v-for="(city, index) in filteredCities" :key="index" @click="searchForCity(city)">{{ city }}</li>
      </ul>
      <div v-if="showWarning" class="suggestions-wrapper">
        <warning-box :error-message="'no match'"/>
      </div>
    </div>
  </template>
  
  <script>
  import {Places} from "@/static/Cities.js"
import WarningBox from './WarningBox.vue';
  export default {
  components: { WarningBox },
    props:{
        value:{
            type:String,
            default:"",
        },
        SelectCity:{
            type:Function,
            default:(()=>{})
        }
    },
    data() {
      return {
        searchText: this.value,
        cities: Places,
        showWarning:false,
      };
    },
    computed: {
      filteredCities() {
        return this.cities.filter(city => city.toLowerCase().startsWith(this.searchText.toLowerCase()));
      },
      showSuggestions() {
        return this.searchText.length > 0 && this.filteredCities.length > 0;
      }
    },
    methods: {
      filterCities() {
        this.$emit("input", this.searchText);
      },
      searchForCity(city) {
        this.searchText = city;
      },
      SelectSearchingCity(){
        this.SelectCity();
        setTimeout(()=>{
        this.searchText="";
        },700)
      }
    },
    watch:{
          searchText(newVal){
            this.$emit("input",newVal)
          },
          filteredCities(newVal){
            if(newVal.length===1){
                this.showWarning=false;
            }else if(newVal.length<=0){
                this.showWarning=true;
            }else{
                this.showWarning=false;
            }
          }
        }
  };
  </script>
  <style>
        .city-searching-input{
            margin:10px;
            padding:13px;
            border-radius: 7px;
            font-size: large;
        }
        .suggestions-wrapper{
            background: #f5f0e6;
            position: absolute;
            list-style: none;
            width: 17%;
            margin: 10px;
            padding: 5px;
            border-radius: 5px;
        }
    </style>