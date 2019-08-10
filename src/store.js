import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        fields: {
            field1: 0,
            field2: 0,
            field3: 0
        }
    },
    actions: {
        setField({commit}, fieldData){
            commit('updateField', fieldData)
        }
    },
    mutations: {
        updateField(state, fieldData){
            state.fields[fieldData.fieldName] = fieldData.value
        }
    },
    getters: {
        getFields(state){
            return state.fields
        },
        fieldsSum(state){
            return state.fields.field2 + state.fields.field3
        }
    }
})
