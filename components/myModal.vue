<template>
    <transition name="modal" appear>
        <div class="modal modal-overlay" @click.self="$emit('close')">
            <div class="modal-window">
                <v-btn icon ripple @click="$emit('close')" >
                    <v-icon>mdi-close-circle-outline</v-icon>
                </v-btn>
                <v-textarea solo label="Details of your event" v-model="eventExplanation"></v-textarea>
                <v-icon>mdi-calendar-outline</v-icon>
                <select v-model="currentNumber">
                    <option v-for="i in 10" >
                        {{i}}
                    </option>
                </select>
                <span>/</span>
                <select v-model="maxNumber">
                    <option v-for="i in 10">
                        {{i}}
                    </option>
                </select>
                <v-icon>mdi-tag-plus-outline</v-icon>
                <v-icon>mdi-map-marker-plus</v-icon>
                <slot name="button">
                    <v-btn @click="createEvent(val,eventExplanation,currentNumber,maxNumber)">Create</v-btn>
                </slot>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    data(){
        return{
            currentNumber: 1,
            maxNumber: 1,
            eventExplanation: ""
        }
    },
    props:{
        val: Date
    },
    methods:{
        createEvent(date,exp,num1,num2){
            this.$store.dispatch('addNewEvent',{id:this.$store.getters.max,Date:date,eventExplanation:exp,currentNumber:num1,maxNumber:num2})
        }

    }

}
</script>
<style lang="stylus" scoped>
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
        border-radius: 4px;
    }
}
.modal-enter-active, .modal-leave-active {
    transition: opacity 1s;
    .modal-window {
        transition: opacity  0.4s, transform 0.4s;
    }
}
.modal-leave-active {
    transition: opacity 0.6s ease 0.4s;
}
.modal-enter, modal-leave-to{
    opacity: 0;
    .modal-window {
        opacity: 0;
        transform: translateY(-20px);
    }
}
</style>