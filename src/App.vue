<template>
  <div id="app">
    <main-chart></main-chart>
    <filters></filters>
  </div>
</template>

<script>
import MainChart from './components/MainChart'
import Filters from './components/Filters'

export default {
  name: 'app',
  components: {
    MainChart,
    Filters
  }
}
</script>

<style>
</style>
