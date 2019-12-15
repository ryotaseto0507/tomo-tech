<template>
    <transition name="modal" appear>
        <div class="modal modal-overlay" @click.self="$emit('close')">
            <div class="modal-window">
                <slot/>
                <slot name="button">
                    <button class="button pos_absolute" style="vertical-align:middle" @click="$emit('close')">Enter!</button>
                </slot>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    data(){
        return{
        }
    },
    props:{
    },
    methods:{
    }
}
</script>
<style lang="stylus" scoped>
.v-icon.v-icon{
    font-size: 35px;
    margin-right: 30px;
}
.pos_absolute{
    position: float;
    left: 780px;
    top: -110px;
}
.modal {
    &.modal-overlay {
        display: flex;
        align-items: center;
        justify-content: center;
        position:fixed;
        z-index:10;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
    }
    &-window{
        background:#fff;
        border-radius: 15px;
        overflow : hidden;
        width: 80%;
        height: 65%;
    
    }
}
.modal-enter-active, .modal-leave-active {
    transition: opacity 1s;
    .modal-window {
        background:#fff;
        border-radius: 15px;
        overflow: hidden;
        width: 80%;
        height: 65%;
    }
}
.modal-leave-active {
    transition: opacity 0.6s ease 0.4s;
}
.modal-enter, modal-leave-to{
    opacity: 0;
    .modal-window {
        background:#fff;
        border-radius: 15px;
        overflow: hidden;
        width: 80%;
        height: 65%;
    }
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