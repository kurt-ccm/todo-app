<script setup lang="ts">
import router from './router';

// import { computed, onMounted, ref } from 'vue';
// import axios from 'axios';


// import {Todo} from './helpers/types'







// function submitForm(e:string,r:boolean) {
//   console.log(e,r);
//   router.replace('/');
  
// }



</script>

<template>
  <div id="main">
    <router-view></router-view>
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
