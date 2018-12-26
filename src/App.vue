<template>
  <div id="app">
    <router-view/>
    <main-chart></main-chart>
  </div>
</template>

<script>
import MainChart from './components/MainChart'

export default {
  name: 'app',
  components: {
    MainChart
  }
}
</script>

<style>
</style>
