<template>
    <div>
        <h1>Cryptocurrency</h1>
        <div class="scroll-bar-wrap">
            <div class="table-wrapper">
                <table class="crypto-table">
                    <thead>
                        <tr>
                            <th class="desktop-only align-left">Rank</th>
                            <th class="align-left">Name</th>
                            <th class="align-right">Price</th>
                            <th class="desktop-only align-right">Market Cap</th>
                            <th class="desktop-only align-right">Daily Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="currency in getCurrencies" :key="currency.id">
                            <td class="desktop-only align-left">{{ currency.rank }}</td>
                            <td class="align-left">{{ currency.name }}</td>
                            <td class="align-right">{{ currency.priceUsd | formatPrice }}</td>
                            <td class="desktop-only align-right">{{ currency.marketCapUsd | formatPrice }}</td>
                            <td class="desktop-only align-right">{{ currency.volumeUsd24Hr | formatPrice }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="cover-bar desktop-only"></div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "CryptoTable",
    data() {
        return {};
    },

    created() {
        this.fetchCurrencies();
    },

    computed: {
        ...mapGetters(['getCurrencies', 'getTopCurrenciesNames'])
    },

    methods: {
        ...mapActions(['fetchCurrencies']),
    },

    filters: {
        formatPrice(value) {
            let formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
            });
            return value >= 1000000000 ? `${formatter.format(value / 1000000000)}b` : value >= 1000000 ? `${formatter.format(value / 1000000)}m` : formatter.format(value);
        },
    }
};
</script>

<style lang="scss" scoped>

.table-wrapper {
    width: 100%;
    max-height: calc(100vh - 177px - 1.34em);
    border-radius: 4px;
    overflow-y: scroll;
}

.table-wrapper::-webkit-scrollbar {
  width: 5px; 
  overflow:visible;
}

.table-wrapper::-webkit-scrollbar-thumb {
    overflow:visible;
    border-radius: 4px;
    background-color: rgba(0,0,0,0.3);
    box-shadow: 0 0 1px rgba(255,255,255,0.5);
}

.cover-bar {
    position: absolute;
    background: #fff;
    height: 100%;
    top: 0;
    right: 0;
    width: 5px;
    transition: all ease-in-out .3s;
    opacity: 1;
}

.scroll-bar-wrap {
    max-width: 805px;
    position: relative;
    margin: 80px auto 10px;
}

.scroll-bar-wrap:hover .cover-bar {
    opacity: 0;
    transition: all ease-in-out .3s;
}

.crypto-table {
    border-collapse: collapse;
    border-radius: 4px;
    width: 100%;

    td, th {
        padding: 12px 16px;
        max-width: 160px;
        width: 100%;
    }

    tbody tr:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    thead {
        position: fixed;
        transform: translateY(-42px);
        max-width: 800px;
        width: 100%;

        tr {
            display: flex;
            justify-content: space-around;
            background: linear-gradient(45deg, #efd736, #ffc277);
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
        }

    }

    tbody {

        tr {
            width: 100%;
            display: flex;
            justify-content: space-around;
            border-bottom: 1px solid rgba(34,36,38,.1);
            border-left: 1px solid rgba(34,36,38,.1);
            border-right: 1px solid rgba(34,36,38,.1);
        }

    }
}

.align-left {
    text-align: left;
}

.align-right {
    text-align: right;
}

@media (max-width: 1023px) {

    .scroll-bar-wrap {
        max-width: 800px;
        margin-bottom: 0;
    }

    .table-wrapper {
        max-height: calc(100vh - 137px);
    }

    .table-wrapper::-webkit-scrollbar {
        display: none;
    }
}

</style>
