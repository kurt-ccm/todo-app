<script setup lang="ts">
import { ref } from 'vue';

defineEmits<{
    (e: 'handleFormSubmit', newTodoName: string, newTodoCompleted: boolean): void
}>()

const newTodoName = ref('');
const newTodoCompleted = ref(true);

// function handleFormSubmit(e: Event) {
//   e.preventDefault();
// //   $emit('event')
//   // handle this in the parent
// //   postCall();
// //   alert('Thanks for submitting!')
// }

</script>

<template>
    <h2>This is the input form page</h2>
    <form @submit.prevent="$emit('handleFormSubmit', newTodoName, newTodoCompleted)">
        <label for="newTodoName">Name of your todo?</label>
        <input type="text" v-model="newTodoName">
        <p>Is it completed?</p>
        <input type="checkbox" id="completed" v-model="newTodoCompleted">
        <label for="completed">Completed</label>
        <button>Submit!</button>
      </form>
</template>