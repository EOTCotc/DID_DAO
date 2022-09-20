import Vue from "vue";
import vuex from "vuex";
Vue.use(vuex)

import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const store =new vuex.Store({state,actions,mutations,getters})

export default store;