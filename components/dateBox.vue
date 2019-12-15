<template>
    <div>
        <div :id="`box_${val2}`" class="dateBox">
            <v-btn icon :id="`btn_${val2}`" v-if="val1 > today || val1.getDate() == today.getDate()" @click="openModal">
                {{val1.getDate()}}
            </v-btn>
            <div :id="`btn_${val2}`"  v-else >
                {{val1.getDate()}}
            </div>
            <ul>
                <li v-for="(event,index) in matchedEvents(formedDate)" :key="index">
                    <v-btn @click="openEvent(event)"  class="tag" >
                        {{event.detail}}
                    </v-btn>
                </li>
            </ul>
           <my-modal @close="closeEvent" v-if="modal==2">
                <div class="modal-window">
                    <div class="spacing">
                        <v-icon class="display icon">mdi-tag-text</v-icon><p class="display">{{theEvent.activity.todo}}</p><br>
                        <v-icon class="display icon">mdi-alarm</v-icon><p class="display">{{theEvent.time}}</p><br>
                        <v-icon class="display icon">mdi-map-marker-radius</v-icon><p class="display">ここに場所を入れる</p><br>
                        <v-icon class="display icon">mdi-clipboard-text-outline</v-icon><p class="display">{{theEvent.detail}}</p><br>
                        <v-icon class="display icon">mdi-account-group</v-icon><p class="display">{{theEvent.currentNumber}}/{{theEvent.maxNumber}}</p><br>
                        <v-icon class="display icon">mdi-human-greeting</v-icon><p class="display">ここに作者を入れる</p><br>
                    </div>
                </div>
                <template slot="button">
                    <button class="button" style="vertical-align:middle">
                    <span>Join!</span>
                    </button>
                </template>
            </my-modal> 
            <my-modal @close="closeModal" v-if="modal==1">
                <v-textarea solo label="Detail of your event" v-model="eventDetail"></v-textarea>
                <div class="box flex">
                    <v-icon class="icon span" @click="openTimeWindow">mdi-alarm</v-icon>
                    <select class="span" v-model="num1">
                        <option v-for="i in 10" >
                            {{i}}
                        </option>
                    </select>
                    <span class="span">/</span>
                    <select class="span" v-model="num2">
                        <option v-for="i in 10">
                            {{i}}
                        </option>
                    </select>
                    <v-icon class="icon span" @click="openSelectWindow">mdi-tag-plus-outline</v-icon>
                    <v-icon class="icon span">mdi-map-marker-plus</v-icon>
                </div>
                <template slot="button">
                    <button class="button" style="vertical-align:middle" @click="addNewEvent({id:getMax,date:formedDate,detail:eventDetail,currentNumber:num1,maxNumber:num2,activity:todo,time:time})">
                        <span>Create!</span>
                    </button>
                </template>
            </my-modal>
            <my-modal v-if="modal_time" @close="closeTimeWindow">
                <v-time-picker v-model="time"></v-time-picker>
            </my-modal>
            <select-tag @close="closeSelectWindow" v-if="modal_select" >
                <div class="activity_button"  v-for="(activity,index) in activities" :key="index">
                    <v-btn :color="activities[index].color"  @click="defineActivity(activity)" >{{activity.todo}}</v-btn>
                </div>
            </select-tag>
        </div>
    </div>
</template>
<script >
import selectTag from '~/components/selectTag.vue'
import myModal from '~/components/myModal.vue'
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            today: new Date(),
            modal: 0,
            modal_select:false,
            modal_time:false,
            time:null,
            num1: 1,
            num2: 1,
            eventDetail: "",
            theEvent:Object,
            activities: [{id:1,todo:"Shopping",color:"orange"},{id:2,todo:"Movie",color:"blue"},{id:3,todo:"Food",color:"green"},{id:4,todo:"Sports",color:"purple"}],
            todo:null,
        }
    },
    computed: {
        ...mapGetters({matchedEvents: 'getEventsByDate',
                       getTheEvent: 'getTheEvent',
                       getMax: 'max'
                    }),
        formedDate(){
            return this.val1.getYear()+"/"+this.val1.getMonth()+"/"+this.val1.getDate()
        }
    },
    props:{
        val1: Date,
        val2: Number
    },
    mounted:function(){
        const btn = document.getElementById('btn_'+this.val2)
        const box = document.getElementById('box_'+this.val2)
        if (this.val1.getDate()==this.today.getDate()){
            box.style.border="2px solid black"
            box.style.padding="1px 3.5px"
        }
        if(this.val1.getDay()===0){
            btn.style.color="red"
        }else if(this.val1.getDay()===6){
            btn.style.color="blue"
        }
        if(this.val1.getMonth()<this.today.getMonth()&&this.val1<this.today){
            box.style.backgroundColor="rgba(40,40,40,0.3)"
        }else if(this.val1 < this.today && this.val1.getDate() != this.today.getDate()){
            box.style.backgroundColor="rgba(10,10,10,0.3)"
        }
        if (this.val1.getMonth()!=this.today.getMonth()){
            btn.style.opacity=0.4
        }
    },
    methods:{
        openModal(){
            this.eventDetail=""
            this.num1=1
            this.num2=1
            this.todo=null
            this.time=null
            this.modal = 1
        },
        closeModal(){
            this.modal = 0
        },
        addNewEvent(newEvent){
            if(newEvent.detail && newEvent.activity){
                this.closeModal()
                this.$store.dispatch('addNewEvent',newEvent)
            }else{
                alert('error')
            }
        },
        openEvent(event){
            this.theEvent=this.getTheEvent(event)
            this.modal = 2
        },
        closeEvent(){
            this.theEvent=null
            this.modal =0
        },
        openSelectWindow(){
            this.modal_select=true
        },
        closeSelectWindow(){
            this.modal_select=false
        },
        openTimeWindow(){
            this.modal_time=true
        },
        closeTimeWindow(){
            this.modal_time=false
        },
        defineActivity(activity){
            this.todo = activity
            this.modal_select=false
        }
    },
    components:{
        myModal,
        selectTag
    }
}
</script>
<style >
    .v-icon.v-icon{
        font-size: 35px;
        margin-right: 30px;
    }
    .display{
        display: inline;
    }
    .activity_button{
        padding:3px;
    }
    .button {
        display: inline-block;
        border-radius: 8px;
        background-color: #F4511E;
        border: none;
        color: #FFFFFF;
        text-align: center;
        font-size: 25px;
        padding: 7px;
        width: 150px;
        transition: all 0.5s;
        cursor: pointer;
        margin: 5px;
        position: relative;
        left:380px;
        top:20px;
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
    .pos_fixed{
        position: fixed;
        right:420px;
        top:180px;
    }
    /*.span{
        width:90px;
        height:50px;
        min-width:0;
        flex-spacing: 50px;
    }*/
    .flex{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .box{
        width:550px;
        margin:10px auto;
    }
    li{
        list-style: none
    }
    .tag{
        width: 150px;
        height: 50px;
        border-radius: 100px;
        background-color: red;
    }
    .dateBox{
        border: 1px solid rgb(0, 0, 0);
        border-radius: 5px;
        float:left;
        width:150px;
        height:150px;
        padding: 2px 5px;
        margin: 3px 3px;
    }
</style>