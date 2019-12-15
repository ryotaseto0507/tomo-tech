<template>
    <transition name="modal" appear>
        <div class="modal modal-overlay" @click.self="$emit('close')">
            <div class="modal-window">
                <v-btn class="pos_relative" icon ripple @click="$emit('close')" >
                    <v-icon class="icon pos_fixed2">mdi-close-circle-outline</v-icon>
                </v-btn>
                <br>
                <slot/>
                <slot name="button">
                    <button @click="$emit('close')">Close</button>
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
.pos_relative{
    position: relative;
    left: 520px;
    top: -5px;
}
.pos_fixed2{
    position:relative
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
        border-radius: 4px;
        overflow : auto;
        width: 600px;
        height: 400px;
        padding: 30px;
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