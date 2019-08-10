<template>
  <div id="app">
    <CryptoTable />
  </div>
</template>

<script>
import CryptoTable from './components/CryptoTable.vue'

export default {
    name: 'app',
    components: {
      CryptoTable
    }
}
</script>

<style>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

@media (max-width: 1023px) {

    .desktop-only {
        display: none;
    }

    #app {
        margin-top: 20px;
    }
}
</style>
