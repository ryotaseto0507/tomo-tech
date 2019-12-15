<template>
    <div class="containerall">
        <div class="container">
            <div class="showDays" id="calendar">
                <div v-for="(count, index) in numberOfDays" :key="count" class="days">
                    <date-box class="oneDay" :val1=day(index) :val2=index />
                </div>
            </div>
            <div class="backStr monthfont">{{month}}</div>
            <div v-for="(event,index) in getAllEvents" :key="index">
                {{event.id}}
            </div>
        </div>
        <my-modal2 v-if="start" @close="closeStart" >
                <div class="container2">
                    <transition v-on:after-enter="doNext" name="demo-title" appear>
                        <p class="p1">ようこそ Tomo-Tech へ！</p>
                    </transition>
                    <transition  v-on:after-enter="doNext1" name="demo-description">
                        <p v-if="show1" class="p2">Tomo-Techは東工大生同士で tomo にイベントに行くサイトです。<br></p>
                    </transition>
                    <transition v-on:after-enter="doNext2" name="demo-description-eng">
                       <p v-if="show2" class="p3">Everything will be based on your @ titech.ac.jp address</p>
                    </transition>
                    <template slot= "button">
                        <transition name="demo-enterbutton">
                            <button v-if="show3" class="button" style="vertical-align:middle" @click="closeStart" >
                                <span>Enter!</span>
                            </button>
                        </transition>
                    </template>
                </div>
        </my-modal2>
    </div>
</template>
<script>
import dateBox from '~/components/dateBox.vue'
import myModal2 from '~/components/myModal2.vue'
import {mapGetters} from 'vuex'
export default {
    head:{
        title: '出かけよう'
    },
    layout:'test',
    data() {
        return{
            numberOfDays: 42,
            today: new Date(),
            show1: false,
            show2: false,
            show3: false,
            start: 1
        }
    },
    computed: {
        month(){
            return (this.today.getMonth()+1)
        },
        ...mapGetters([
            'getAllEvents'
        ]),
    },
    components:{
        dateBox,
        myModal2
    },
    mounted: function() {
        const cal = document.getElementById("calendar");
        cal.scrollTop = 150;
    },
    methods:{
        day(i){
            const date = new Date()
            date.setDate(this.today.getDate() -14 - this.today.getDay() + i)
            return date
        },
        closeStart(){
            this.start = 0
        },
        doNext(){
            this.show1=true
        },
        doNext1(){
            this.show2=true
        },
        doNext2(){
            this.show3=true
        },
    }
}
</script>
<style scoped>
.monthfont{
    font-family: Arial, Helvetica, sans-serif;
}
.containerall{
    background-image: url('../static/back2.jpg');
    background-size: cover;
}
.showDays{
    height:1100px;
    margin:50px auto;
    overflow:auto;
    background-color: rgba(255, 255, 255, 0.3);
}
.container{
    width: 1200px;
    position:relative;
    background-color: rgba(255,255,255,0.3); 
    z-index:3;
}
.backStr{
    position: absolute;
    top: 10%;
    left:22%;
    font-size: 380pt;
    opacity: 0.2;
    z-index:-2;
}
.container2{
    background-image: url('../static/classicblue.png');
    background-size: cover;
    height:100%;
    width:100%;
    overflow: hidden;
    float: left;
    position: relative;
    max-width: none;
    color: white;
    
}
.demo-title-enter-active, .demo-title-leave-active{
  transition: opacity 1s;
}
.demo-title-enter, .demo-title-leave-to{
  opacity: 0;
}
.demo-description-enter-active{
    transition: opacity .5s;
}
.demo-description-enter{
  opacity: 0
}
.demo-description-eng-enter-active{
    transition: opacity .5s;
}
.demo-description-eng-enter{
  opacity: 0
}
.demo-enterbutton-enter-active{
    transition: opacity .5s;
}
.demo-enterbutton-enter{
  opacity: 0
}
.p1{
  font-size: 60px;
  font-weight: bold;
  font-family: YuGothic;
  position: relative;
  left:45px;
  top:80px;
}
.p2{
  font-size: 22px;
  font-family: Arial, Helvetica, sans-seif;
  font-weight: bold;
  position: relative;
  left:55px;
  top:120px;
}
.p3{
  font-size: 22px;
  font-family: Arial, Helvetica, sans-seif;
  font-weight: bold;
  position: relative;
  left:55px;
  top:120px;
}
.v-application .button {
    color: #FFFFFF;
}
.button {
  display: inline-block;
  border-radius: 10px;
  background-color: #3B8070;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 35px;
  font-family: Arial, Helvetica, sans-seif;
  font-weight: bold;
  padding: 7px;
  width: 180px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
  position: relative;
  left:950px;
  top:240px;
}
.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}
.button span:after {
  content: '»';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}
.button:hover span {
  padding-right: 25px;
}
.button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>