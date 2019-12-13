<template>
    <transition name="modal" appear>
        <div class="modal modal-overlay" @click.self="$emit('close')">
            <div class="modal-window">
                <v-btn icon ripple @click="$emit('close')" class="modal-close">
                    <v-icon>mdi-close-circle-outline</v-icon>
                </v-btn>
                <v-textarea></v-textarea>
                <v-icon>mdi-calendar-outline</v-icon>
                <select v-model="selected">
                    <option v-for="currentNumber in 10" :value="currentNumber">
                        {{currentNumber}}
                     </option>
                </select>
                <span>/</span>
                <select v-model="selected">
                    <option v-for="maxNumber in 10" :value="maxNumber">
                        {{maxNumber}}
                     </option>
                </select>
                <v-icon>mdi-tag-plus-outline</v-icon>
                <v-icon>mdi-map-marker-plus</v-icon>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    data(){
        return{
            currentNumber: 0
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
        background: rgba(0,0,0,0.5)
    }
    &-window{
        background:#fff;
        border-radius: 4px;
        overflow: hidden
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