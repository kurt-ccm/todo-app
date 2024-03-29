<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faAngleUp);
library.add(faAngleDown)

const apiURL = 'https://calm-plum-jaguar-tutu.cyclic.app/todos';

type Todo = {
  todoName: string,
  isComplete: boolean,
  createdAt?: string,
  updatedAt?: string,
  __v?: number,
  _id: string
}

const todoData = ref<Todo[]>([]);
const dataIsLoaded = ref(false);
const formIsVisible = ref(false);

const newTodoName = ref('');
const newTodoCompleted = ref(true);
const searchParam = ref('');

const displayedData = ref<Todo[]>([]);


function toggleShowForm() {
  formIsVisible.value = true;
}

function handleFormSubmit(e: Event) {
  e.preventDefault();
  postCall();
  alert('Thanks for submitting!')
}

async function handleDelete(id: string) {
  await deleteCall(id);
  dataIsLoaded.value = false;
  getCall();
}

async function getCall() {
  try {
    const { data } = await axios.get(apiURL)
    todoData.value = data.data
    displayedData.value = todoData.value;
    dataIsLoaded.value = true;
  } catch (error) {
    throw error
  }
}

async function postCall() {
  try {
    const postArgs = { todoName: newTodoName.value, isComplete: newTodoCompleted.value }
    const { data } = await axios.post(apiURL, postArgs)
    getCall();
    formIsVisible.value = false;
    return data;
  } catch (error) {
    throw error
  }
}

async function deleteCall(id: string) {
  try {
    const { data } = await axios.delete(`${apiURL}/${id}`);
    return data;
  } catch (error) {
    throw error
  }
}

async function updateCall(id: string, isComplete: boolean) {
  try {
    const { data } = await axios.put(`${apiURL}/${id}`, { isComplete: !isComplete });
    if (data.code === 200) {
      alert('Status updated!')
      await getCall();
    }
    return data;
  } catch (error) {
    throw error;
  }
}


const todosAscending = computed(() => 
  displayedData.value.sort((a: Todo, b: Todo) => a.todoName.localeCompare(b.todoName)))

const todosDescending = computed(() => 
  displayedData.value.sort((a: Todo, b: Todo) => b.todoName.localeCompare(a.todoName)))

function filter(complete: boolean) {
  displayedData.value = todoData.value.filter((todo: Todo) => {
    return todo.isComplete === complete;
  })
}

function toggleAscending() {
  displayedData.value = todosAscending.value;
}

function toggleDescending() {
  displayedData.value = todosDescending.value;
}


function filterData() {
  if (searchParam.value.length === 0) {
    displayedData.value = todoData.value;
    return
  }
  displayedData.value = todoData.value.filter((todo: Todo) => {
    return todo.todoName.toLowerCase().includes(searchParam.value.toLowerCase());
  })
}

function reset() {
  formIsVisible.value = false;
  getCall();
}

onMounted(() => {
  getCall();
})

</script>

<template>
  <div id="main">
    <h2>Hello! Welcome to your todo site.</h2>
    <div>
      <div>
        <button id="reset-button" @click="reset">Reset</button>
      </div>
      <button v-if="!formIsVisible" @click="toggleShowForm">Create a new todo</button>
      <form v-if="formIsVisible" action="submit" @submit="handleFormSubmit">
        <label for="newTodoName">Name of your todo?</label>
        <input type="text" v-model="newTodoName">
        <p>Is it completed?</p>
        <input type="checkbox" id="completed" v-model="newTodoCompleted">
        <label for="completed">Completed</label>
        <button>Submit!</button>
      </form>
      <button @click="filter(true)">Only show completed todos</button>
      <button @click="filter(false)">Only show non-completed todos</button>
    </div>

    <div>
      <input type="text" v-model="searchParam" placeholder="Search here...">
      <button @click="filterData">Search!</button>
    </div>
    <table v-if="dataIsLoaded && todoData">
      <tr>
        <th>Title

          <button @click="toggleAscending"><font-awesome-icon :icon="['fas', 'angle-up']"></font-awesome-icon></button>
          <button @click="toggleDescending"><font-awesome-icon :icon="['fas', 'angle-down']"></font-awesome-icon></button>
        </th>
        <th>Complete</th>
        <th>Actions</th>
      </tr>
      <tr v-for="data in displayedData" :key="data._id">
        <th>{{ data.todoName }}</th>
        <th :class="data.isComplete ? 'completed' : 'not-completed'">{{ data.isComplete }}</th>
        <th>
          <button @click="updateCall(data._id, data.isComplete)">{{ !data.isComplete ? 'Mark completed' : 'Mark as in progress'}}</button>
          <button @click="handleDelete(data._id)">Delete</button>
        </th>
      </tr>
    </table>
    <h3 v-else>No data is available. Try creating a todo!</h3>
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
