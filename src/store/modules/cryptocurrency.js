

const state = {
    cryptocurrencies: [],
    topCurrenciesNames: '',
};

const getters = {
    getCurrencies: (state) => state.cryptocurrencies,
    getTopCurrenciesNames: (state) => state.topCurrenciesNames,
};

const actions = {
    async fetchCurrencies({commit}) {
        const response = await fetch (
            `https://api.coincap.io/v2/assets?limit=15`, {
                method: 'GET',
            })
            .then(response => response.json());

        commit('setCurrencies', response.data);
        commit('setTopCurrenciesNames');
        commit('updatePrices');
    },
};

const mutations = {
    setCurrencies: (state, currencies) => (state.cryptocurrencies = currencies),

    setTopCurrenciesNames: (state) => {
        state.cryptocurrencies.forEach(element => {
            state.topCurrenciesNames += `${element.id},`;
        });
    },

    updatePrices: (state) => {
        if (state.topCurrenciesNames) {
            const tradeWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${state.topCurrenciesNames}`);

            tradeWs.onmessage = function (msg) {
                mutations.setPrice(state, JSON.parse(msg.data));
            };
        }
        
    },

    setPrice: (state, prices) => {
        state.cryptocurrencies.forEach(element => {
            if (prices.hasOwnProperty(element.id)) {
                element.priceUsd = prices[element.id];
            }
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};