export const strict = false

export const state = () => ({
    events: [
        {id: Number,date: Number,detail: String, currentNumber: Number, maxNumber: Number,}
    ]
})
export const getters ={
    getAllEvents: state =>state.events,
    max: state => 1+state.events.reduce(function(a,b){ return a > b.id ? a : b.id },0),
    getEvents: (state) => (date) => {return state.events.filter(event => event.date === date)},
    getTheEvent: (state) => (event) => {return state.events.find(e => e.id ==event.id)}
}
export const actions ={
    addNewEvent({commit},payload){
        commit('addEvent', payload)
    }
}
export const mutations ={
    addEvent(state,newEvent){
        state.events.push(newEvent)
    },
}