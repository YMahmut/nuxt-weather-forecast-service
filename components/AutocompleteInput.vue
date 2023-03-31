<template>
    <div class="centerilize">
      <input class="city-searching-input" :style="showWarning ? {background:'red'}:{}" type="text" v-model="searchText" @input="filterCities" placeholder="Enter a city..." @keypress.enter="SelectSearchingCity" />
      <div class="auto-complete-options">
        <ul class="suggestions-wrapper centerilize" v-if="showSuggestions">
          <li class="suggestions" v-for="(city, index) in filteredCities" :key="index" @click="searchForCity(city)">
            <p v-if="city.toLowerCase()===searchText.toLowerCase()" @click="SelectSearchingCity" style="text-align: center;">OK</p>
            <p v-else>{{ city }}</p>
          </li>
      </ul>
      </div>
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
            this.$emit("input",newVal);
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
            width: max-content;
            margin: 5px;
            padding: 10px;
            border-radius: 5px;
            z-index: 10;
        }
        .centerilize{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .auto-complete-options{
          display: flex;
          align-items: baseline;
          justify-content: center;
        }
        .suggestions{
          padding: 8px;
          min-width: 200px;
          width: 100%;
          height: 100%;
          border-radius: 7px;
          z-index: 10;
        }
        .suggestions:hover{
          cursor: pointer;
          background: rgb(250, 219, 179);
        }
        .suggestions > p{
          margin: 0;
          padding: 5px;
          z-index: 10;
        }
    </style>