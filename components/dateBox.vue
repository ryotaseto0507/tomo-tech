<template>
    <div>
        <div :id="`box_${val2}`" class="dateBox">
            <v-btn icon :id="`btn_${val2}`" @click="openModal">
            {{val1.getDate()}}
            </v-btn>
            <ul>
                <li v-for="(event,index) in matchedEvents(val1)" class="tag" :key="index">
                    {{event.detail}}
                </li>
            </ul>
            <my-modal @close="closeModal" v-if="modal">
                <v-textarea solo label="Details of your event" v-model="eventExplanation"></v-textarea>
                <v-icon>mdi-calendar-outline</v-icon>
                <select v-model="num1">
                    <option v-for="i in 10" >
                        {{i}}
                    </option>
                </select>
                <span>/</span>
                <select v-model="num2">
                    <option v-for="i in 10">
                        {{i}}
                    </option>
                </select>
                <v-icon>mdi-tag-plus-outline</v-icon>
                <v-icon>mdi-map-marker-plus</v-icon>
                <template slot="button">
                    <button @click="addNewEvent({id:$store.getters.max,date:val1,detail:eventExplanation,currentNumber:num1,maxNumber:num2})">Create</button>
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
            modal: false,
            num1: 1,
            num2: 1,
            eventExplanation: ""
        }
    },
    computed: {
        ...mapGetters({matchedEvents: 'getEvents'}),
        //matchedEvents: function(){
        //    return this.$store.getters.getEvents(this.val1)
       // }
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
            this.modal = true
        },
        closeModal(){
            this.modal = false
        },
        addNewEvent(newEvent){
            this.closeModal()
            this.$store.dispatch('addNewEvent',newEvent)
        }
    },
    components:{
        myModal
    }
}
</script>
<style >
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