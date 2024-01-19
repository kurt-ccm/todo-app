<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import router from '../router';

// defineEmits<{
//     (e: 'handleFormSubmit', newTodoName: string, newTodoCompleted: boolean): void
// }>()

const newTodoName = ref('');
const newTodoCompleted = ref(true);

const apiURL = 'https://calm-plum-jaguar-tutu.cyclic.app/todos';


// function handleFormSubmit(e: Event) {
//   e.preventDefault();
// //   $emit('event')
//   // handle this in the parent
// //   postCall();
// //   alert('Thanks for submitting!')
// }

async function postCall() {
    try {
        const postArgs = { todoName: newTodoName.value, isComplete: newTodoCompleted.value }
        const { data } = await axios.post(apiURL, postArgs)
        // getCall();
        router.replace('/');
        return data;
    } catch (error) {
        throw error
    }
}

</script>

<template>
    <h2>This is the input form page</h2>
    <form @submit.prevent="postCall">
        <label for="newTodoName">Name of your todo?</label>
        <input type="text" v-model="newTodoName">
        <p>Is it completed?</p>
        <input type="checkbox" id="completed" v-model="newTodoCompleted">
        <label for="completed">Completed</label>
        <button>Submit!</button>
      </form>
</template>