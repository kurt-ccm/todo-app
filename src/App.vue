<script setup lang="ts">
// import { computed, onMounted, ref } from 'vue';
// import axios from 'axios';


// import {Todo} from './helpers/types'







function submitForm(e:string,r:boolean) {
  console.log(e,r);
  
}



</script>

<template>
  <div id="main">
    <h2>Hello! Welcome to your todo site.</h2>
    <router-link to="/input">Create a new todo</router-link>
    <router-view @handleFormSubmit="submitForm"></router-view>
  </div>
</template>

<style scoped>
#main {
  width: 85%;
  margin: auto;
  text-align: center;
}

table {
  border: solid 2px black;
}

.completed {
  background-color: green;
}

.not-completed {
  background-color: red;
}

th {
  border: solid 2px rgb(48, 48, 188);
}

button {
  width: fit-content;
  height: auto;
  background-color: lightblue;
  margin: 2px;
}

#reset-button {
  background-color: rgb(229, 119, 119);
}
</style>
