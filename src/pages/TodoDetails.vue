<script setup lang="ts">
import axios from 'axios';
import { Ref, onMounted, ref } from 'vue';

import { apiURL } from '../helpers/apiURL';
import { Todo } from '../helpers/types';
import router from '../router';

const props = defineProps(['id'])

const dataIsLoaded = ref(false);
const dataIsEditable = ref(false);
const singleTodo: Ref<Todo> = ref({
    todoName: '',
    isComplete: false
})

const getCallById = async () => {
    const { data } = await axios.get(`${apiURL}/${props.id}`);
    console.log(data);
    if (data.code === 200) {
        singleTodo.value.todoName = data.data.todoName;
        singleTodo.value.isComplete = data.data.isComplete;
        dataIsLoaded.value = true;
    }
}

const putCall = async () => {
    const { data } = await axios.delete(`${apiURL}/${props.id}`);
    console.log(data);
    
    if (data.code === 200) {
        const postArgs = { todoName: singleTodo.value.todoName.trim(), isComplete: singleTodo.value.isComplete }
        console.log('post arguments', postArgs);
        const { data } = await axios.post(apiURL, postArgs)
        console.log(data);
        router.replace('/');
    }
}

onMounted(() => {
    getCallById();
})
</script>

<template>
    <h2>Details for todo with id {{ props.id }}:</h2>
    <form v-if="dataIsLoaded" disabled>
        <button v-if="!dataIsEditable" @click.prevent="dataIsEditable = !dataIsEditable">Edit todo</button>
        <input v-model="singleTodo.todoName" :disabled="!dataIsEditable"/>
        <input id="isComplete" type="checkbox" v-model="singleTodo.isComplete" :disabled="!dataIsEditable">
        <label for="isComplete">Todo completed</label>
        <button v-if="dataIsEditable" @click.prevent="putCall">Submit changes!</button>
    </form>
    <p v-else>Data is loading...</p>
    <router-link to="/"><button>Home</button></router-link>
</template>