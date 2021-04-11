<template>
  <ul>
    <li @click="onWinmin"></li>
    <li @click="onWinmax"></li>
    <li @click=onWinColse></li>
  </ul>
</template>

<script>
  import { ipcRenderer } from "electron"
  export default {
    name: 'WindowControl',
    methods: {
      onWinmin() {
        ipcRenderer.send('window-min')
      },

      onWinmax() {
        ipcRenderer.send('window-max')
      },

      onWinColse() {
        ipcRenderer.send('window-close')
      }
    }
  }
</script>

<style scoped>
  ul {
    display: flex;
    flex-direction: row;

    list-style: none;
    -webkit-app-region: no-drag;
  }

  ul li {
    height: 14px;
    width: 14px;
    margin: 0 4px;

    border-radius: 50%;
    cursor: pointer;
  }

  ul li:nth-child(1) {
    background-color: #4caf50;
  }

  ul li:nth-child(2) {
    background-color: #ff9800;
  }

  ul li:nth-child(3) {
    background-color: #f44336;
  }
</style>