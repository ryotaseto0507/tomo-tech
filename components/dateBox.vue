<template>
    <div>
        <div :id="`box_${val2}`" class="dateBox">
            <v-btn icon :id="`btn_${val2}`">
            {{val1.getDate()}}
            </v-btn>
        </div>
    </div>
</template>
<script >
export default {
    data(){
        return{
            today: new Date()
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
            box.style.backgroundColor="grey"
        }
        if (this.val1.getMonth()!=this.today.getMonth()){
            btn.style.opacity=0.4
        }
    },
    methods:{
    }
}
</script>
<style >
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