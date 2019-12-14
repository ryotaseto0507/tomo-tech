<template>
    <div>
        <div :id="`box_${val2}`" class="dateBox">
            <v-btn icon :id="`btn_${val2}`" @click="openModal">
            {{val1.getDate()}}
            </v-btn>
            <ul>
                <v-btn @click="openEvent(event)" v-for="(event,index) in matchedEvents(val1.getDate())" class="tag" :key="index">
                    {{event.detail}}
                </v-btn>
            </ul>
           <my-modal @close="closeModal" v-if="modal==2">
                <v-icon class="icon">mdi-calendar-outline</v-icon>
                <div class="modal-window">
                    <div class="spacing">
                        <v-icon class="tagicon icon">mdi-tag-text</v-icon><p class="tagicon">tag</p><br>
                        <v-icon class="time icon">mdi-calendar-outline</v-icon><p class="time">ここに時間を入れる</p><br>
                        <v-icon class="map icon">mdi-map-marker-radius</v-icon><p class="map">ここに場所を入れる</p><br>
                        <v-icon class="text icon">mdi-clipboard-text-outline</v-icon><p class="text">{{eventDetail}}</p><br>
                        <v-icon class="group icon">mdi-account-group</v-icon><p class="group">ここに人数を入れる</p><br>
                        <v-icon class="author icon">mdi-human-greeting</v-icon><p class="author">ここに作者を入れる</p><br>
                    </div>
                </div>
            </my-modal> 
            <my-modal @close="closeModal" v-if="modal==1">
                <v-textarea solo label="Details of your event" v-model="eventExplanation"></v-textarea>
                <div class="box flex">
                    <v-icon class="icon span">mdi-calendar-outline</v-icon>
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
                    <v-icon class="icon span">mdi-tag-plus-outline</v-icon>
                    <v-icon class="icon span">mdi-map-marker-plus</v-icon>
                </div>
                    <template slot="button">
                        <button class="button" style="vertical-align:middle" @click="addNewEvent({id:$store.getters.max,date:val1.getDate(),detail:eventExplanation,currentNumber:num1,maxNumber:num2})">
                            <span>Create</span>
                        </button>
                    </template>
            </my-modal>
        </div>
    </div>
</template>
<script >
import myModal from '~/components/myModal.vue'
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            today: new Date(),
            modal: 0,
            num1: 1,
            num2: 1,
            eventExplanation: "",
            eventDetail:""
        }
    },
    computed: {
        ...mapGetters({matchedEvents: 'getEvents',
                       getTheEvent: 'getTheEvent'},
                    ),
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
            this.modal = 1
        },
        closeModal(){
            this.modal = 0
        },
        addNewEvent(newEvent){
            this.closeModal()
            this.$store.dispatch('addNewEvent',newEvent)
        },
        openEvent(event){
            this.eventDetail=this.getTheEvent(event).detail
            this.modal = 2
        }
    },
    components:{
        myModal
    }
}
</script>
<style >
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
        position: fixed;
        right:550px;
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
    .icon{
        font-size: 145px;
        margin-right: 30px;
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