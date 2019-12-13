export const strict = false

export const state = () => ({
    events: [
        {id: Number,Date: Date,eventExplanation: String, currentNumber: Number, MaxNumber: Number,}
    ]
})
export const getters ={
    events: state =>state.events,
    max: state => 1+state.posts.reduce(function(a,b){ return a > b.id ? a : b.id },0),
}
export const actions ={
    addNewEvent({commit},newEvent){
        commit('addEvent', newEvent)
    }
}
export const mutations ={
    addEvent(state,newEvent){
        state.events.push(newEvent)
    },
}