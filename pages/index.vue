<template>
    <div>
        <div class="container">
        <div class="showDays" id="calendar">
            <div v-for="(count, index) in numberOfDays" :key="count" class="days">
                <date-box class="oneDay" :val1=day(index) :val2=index />
            </div>
        </div>
        <div class="backStr">{{month}}</div>
        </div>
    </div>
</template>
<script>
import dateBox from '~/components/dateBox.vue'
export default {
    head:{
        title: '出かけよう'
    },
    layout:'test',
    data() {
        return{
            numberOfDays: 42,
            today: new Date(),
        }
    },
    computed: {
        month(){
            return (this.today.getMonth()+1)
        }
    },
    components:{
        dateBox
    },
    mounted: function() {
        const cal = document.getElementById("calendar");
        cal.scrollTop = 150;
    },
    methods:{
        day(i){
            const date = new Date()
            date.setDate(this.today.getDate() -7 - this.today.getDay() + i);
            return date
        },
    }
}
</script>
<style scoped>
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
</style>