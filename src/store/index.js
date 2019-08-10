import Vuex from 'vuex';
import Vue from 'vue';
import Cryptocurrency from './modules/cryptocurrency.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Cryptocurrency
    },
});