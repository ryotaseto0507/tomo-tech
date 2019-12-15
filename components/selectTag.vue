<template>
    <transition name="modal" appear>
        <div class="modal modal-overlay" @click.self="$emit('close')">
            <div class="modal-window">
                <v-btn icon ripple @click="$emit('close')" >
                    <v-icon class="icon pos_fixed">mdi-close-circle-outline</v-icon>
                </v-btn>
                <slot/>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    
}
</script>
<style lang="stylus" scoped>
.modal {
    &.modal-overlay {
        display: flex;
        position:fixed;
        z-index:30;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0);
    }
    &-window{
        background:#fff;
        border-radius: 4px;
        overflow : auto;
        position: absolute;
        top:25%;
        left:50%;
        width: 120px;
        height: 200px;
        border: 1px solid black
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