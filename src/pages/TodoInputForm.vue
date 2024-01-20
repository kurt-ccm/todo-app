<script setup lang="ts">
import axios from 'axios';
import { Ref, ref } from 'vue';
import router from '../router';
import useVuelidate from '@vuelidate/core';

import { alphaNum, required } from '@vuelidate/validators';
import { Todo } from '../helpers/types';

const newTodo: Ref<Todo> = ref({
    todoName: '',
    isComplete: false
})

const newTodoName = ref('');
const newTodoCompleted = ref(true);

const apiURL = 'https://calm-plum-jaguar-tutu.cyclic.app/todos';

const hasSpaces = (value: string) => /^[\w\-\s]+$/.test(value.trim())
const rules = {
    todoName: {
        required,
        // alphaNum,
        hasSpaces: hasSpaces
    }
}

const vuelidate = useVuelidate(rules, newTodo);


async function postCall() {
    try {
        vuelidate.value.$touch()
        if (vuelidate.value.$invalid) {
            console.log(vuelidate.value.$errors);
            
            alert('hey thats not cool')
            return
        }
        
        const postArgs = { todoName: newTodo.value.todoName.trim(), isComplete: newTodo.value.isComplete }
        
        const { data } = await axios.post(apiURL, postArgs)
        router.replace('/');
        return data;
    } catch (error) {
        throw error
    }
}

</script>

<template>
    <form @submit.prevent="postCall">
        <label for="newTodoName">Name of your todo?</label>
        <input type="text" v-model="newTodo.todoName">
        <input type="checkbox" id="completed" v-model="newTodo.isComplete">
        <label for="completed">Completed?</label>
        <button>Submit!</button>
    </form>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}
</style>