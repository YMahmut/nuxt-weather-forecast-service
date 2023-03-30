<template >
  <div class="location-info-part bg" >
      <h1>Welcome to my Weather Forecast Page</h1>
      <div v-if="!isShowingLocatioImages">
          <div>
              <transition name="fade">
                  <nuxt-link v-if="isColorfull" style="text-decoration: none" class="btn cursor-pointer" to="/CurrentWeather">Current Weather Information</nuxt-link>
              </transition>
          </div>
          <div class="fixed-msg">
              <button class="btn-unbordered" style="margin-bottom:50px"  @click="isShowingLocatioImages=true">
                  Click here to get information about Location Permisson.
              </button>
          </div>
          <div style="margin:10%">
              <img style="border-radius: 50%;" src="~~/static/img/cloudy-sunny-rainy.jpg" >
          </div>
      </div>

      <div v-else class="container">
          <div @click="isShowingLocatioImages=false" class="close-icon-wrapper cursor-pointer">
              <span class="close-icon">X</span>
          </div>
          <p>Allow location permission to show you the weather that about your city</p>
          <div class="image-wrapper">
              <img src="@/static/img/geoLocationInfo0.png" alt="">
          </div>
          <p>You can change the permission by Clicking the icon as shown below</p>
          <div class="image-wrapper">
              <img src="@/static/img/geoLocationInfo1.png" alt="">
          </div>
          <p>Switch "on" to allow it; or "off" if you don't need the Location permission</p>
          <div class="image-wrapper">
              <img src="@/static/img/geoLocationInfo2-eng.png" alt="">
          </div>
      </div>

  </div>
</template>

<script>
export default {
  data(){
      return{
          isShowingLocatioImages:false,
          isColorfull:true,
          interval:null,
      }
      },
  mounted(){
      this.interval=setInterval(()=>{
      this.isColorfull= !this.isColorfull;
     },900)
  },
  beforeUnmount(){
      clearInterval(this.interval);
      console.log("interval",this.interval)
  }
}
</script>

<style  scoped>

.bg{
  background-color: rgb(221 218 214);
  height: 100%;
}
h1{
  margin:8%
}
.fade-enter-active, .fade-leave-active {
transition: opacity 1s ease;
}
.fade-enter-from, .fade-leave-to {
opacity: 0.3;
}
@media screen and (min-width: 300px) {
  .container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: antiquewhite;
  border-radius: 13px;
  max-width: 50%;
  padding:20px;
}
.image-wrapper{
  margin-bottom: 20px;
}
}
img{
  max-width: 70%;
}
.location-info-part{
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  text-align: center;
}
.close-icon-wrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  text-align: center;
  width: 100%;
  margin: -20px -40px 0 0 ;
}
.close-icon{
  width: 25px;
  height: 25px;
  padding:2px;
  background: red;
  color:white;
  border-radius: 50%;
  font-weight: 900;
  font-family: sans-serif;
}
.close-icon:hover{
  transition: opacity .3s ease-in-out;
  background: rgb(114, 16, 16);
}

.cursor-pointer{
  cursor: pointer;
}
.btn{
  margin:20px;
  padding:11px;
  border-radius: 7px;
  border: 1px solid blue;
  background-color:blue;
  color:white;
  cursor: pointer;
}
.btn:hover{
background-color:rgb(134, 134, 240);
color:white;
}
.fixed-msg{
  position: fixed;
  top: 10px;
  right: 10px;
}
.btn-unbordered{
  margin:20px;
  padding:11px;
  border-radius: 7px;
  border: none;
  background-color:rgb(0, 115, 255);
  color:white;
  cursor: pointer;
}
.btn-unbordered:hover{
background-color:rgb(134, 134, 240);
color:white;
}
</style>