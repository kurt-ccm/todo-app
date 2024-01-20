<script setup lang="ts">
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import { Todo } from '../helpers/types';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleUp, faAngleDown, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const apiURL = 'https://calm-plum-jaguar-tutu.cyclic.app/todos';

library.add(faAngleUp);
library.add(faAngleDown);
library.add(faTrashCan)

const todoData = ref();
const dataIsLoaded = ref(false);


const searchParam = ref('');

const displayedData = ref();


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
        console.log(displayedData.value[0]);

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

const todosAscending = computed(() => {
    return displayedData.value.sort((a: Todo, b: Todo) => {
        if (a.todoName < b.todoName) {
            return -1;
        }
        if (a.todoName > b.todoName) {
            return 1;
        }
        return 0;
    })
})

const todosDescending = computed(() => {
    return displayedData.value.sort((a: Todo, b: Todo) => {
        if (a.todoName < b.todoName) {
            return 1;
        }
        if (a.todoName > b.todoName) {
            return -1;
        }
        return 0;
    })
})

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

function refreshData() {
    displayedData.value = todoData.value;
}

onMounted(() => {
    getCall();
})
</script>

<template>
    <base-card>
        <div id="home-page">
            <h2>Hello! Welcome to your todo site.</h2>
            <base-button><router-link to="/input">Create a new todo</router-link></base-button>
            <div>
                <div>
                    <base-button @click="refreshData">Refresh</base-button>
                </div>

                <base-button @click="filter(true)">Only show completed todos</base-button>
                <base-button @click="filter(false)">Only show non-completed todos</base-button>
            </div>

            <div>
                <input type="text" v-model="searchParam" placeholder="Search here...">
                <button @click="filterData">Search!</button>
            </div>
            <table v-if="dataIsLoaded && todoData">
                <tr>
                    <th>Title

                        <base-button @click="toggleAscending"><font-awesome-icon
                                :icon="['fas', 'angle-up']"></font-awesome-icon></base-button>
                        <base-button @click="toggleDescending"><font-awesome-icon
                                :icon="['fas', 'angle-down']"></font-awesome-icon></base-button>
                    </th>
                    <th>Complete</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="data in displayedData" :key="data._id">
                    <th>{{ data.todoName }}</th>
                    <th :class="data.isComplete ? 'completed' : 'not-completed'">{{ data.isComplete }}</th>
                    <th>
                        <base-button><router-link :to="{ name: 'details', params: { id: data._id } }">View details</router-link></base-button>
                        <base-button @click="handleDelete(data._id)"><font-awesome-icon
                                :icon="['fas', 'trash-can']" /></base-button>
                    </th>
                </tr>
            </table>
            <h3 v-else>No data is available. Try creating a todo!</h3>
        </div>
    </base-card>
</template>

<style scoped>
#main {
    width: 85%;
    margin: auto;
    text-align: center;
    display: flex;
    justify-content: center;
}

table {
    border: solid 2px black;
}

#home-page {
    display: flex;
    flex-direction: column;
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
    /* background-color: rgb(229, 119, 119); */
}
</style>
