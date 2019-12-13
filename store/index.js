export const strict = false

export const state = () => ({
    events: [
        {id: Number,Date: Date,eventExplanation: String, currentNumber: Number, MaxNumber: Number,}
    ],
    modal: false
})
export const getters ={
    events: state =>state.events,
    max: state => 1+state.posts.reduce(function(a,b){ return a > b.id ? a : b.id },0),
}
export const actions ={
    addNewEvent({commit},newEvent){
        commit('addEvent', newEvent)
    },
    changeModalState({commit}){
        commit('changeModal')
    }
}
export const mutations ={
    addEvent(state,newEvent){
        state.events.push(newEvent)
        state.modal = !state.modal
    },
    changeModal(state){
        state.modal = !state.modal
    }
}