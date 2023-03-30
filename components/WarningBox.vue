<template>
    <div class="centrelized">
        <transition-group name="slide-fade">
                <div :key="'fade-1'" v-if="isMessageShowing" class="location-msg">
                    <p :key="'fade-1-1'" class="error-p">{{ errorMessage}}</p>
                </div>
            </transition-group>
    </div>
</template>

<script>
    export default {
        props:{
            errorMessage:{
                type:String,
                default:"!"
            }
        },
        data(){
            return{
                isMessageShowing:false
            }
        },
        mounted(){
            setTimeout(()=>{
                this.isMessageShowing=true;
            },300);
        },
        beforeUnMount(){
            this.isMessageShowing=false;
        }
    }
</script>

<style scoped>

.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.centrelized{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>