<template>
  <div class="container">
    <transition v-on:after-enter="doNext" name="demo-title" appear>
      <p class="p1">ようこそ Tomo-Tech へ！</p>
    </transition>
    <transition  v-on:after-enter="doNext1" name="demo-description">
      <p v-if="show1" class="p2">Tomo-Techは東工大生同士で tomo にイベントに行くサイトです。<br></p>
    </transition>
    <transition name="demo-description-eng">
      <p v-if="show2" class="p3">Everything will be based on your @ titech.ac.jp address</p>
    </transition>
    
  </div>  
  
  </template>
  
<script>
export default {
    layout: 'test',
    data(){
      return{
        show1: false,
        show2: false
      }
    },
    methods:{
      doNext(){
        this.show1=true
      },
      doNext1(){
        this.show2=true
      },
    }
    
}
</script>
<style lang="stylus"> 
.container{
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
  transition: opacity 1.2s;
}
.demo-title-enter, .demo-title-leave-to{
  opacity: 0;
}
.demo-description-enter-active{
    transition: opacity 1s;
}
.demo-description-enter{
  opacity: 0
}
.demo-description-eng-enter-active{
    transition: opacity 1s;
}
.demo-description-eng-enter{
  opacity: 0
}
.p1{
  font-size: 60px;
  font-weight: bold;
  font-family: YuGothic;
  position: relative;
  left:50px;
  top:140px;
}
.p2{
  font-size: 25px;
  font-family: Arial, Helvetica, sans-seif;
  font-weight: bold;
  position: relative;
  left:70px;
  top:190px;
}
.p3{
  font-size: 25px;
  font-family: Arial, Helvetica, sans-seif;
  font-weight: bold;
  position: relative;
  left:70px;
  top:190px;
}
</style>