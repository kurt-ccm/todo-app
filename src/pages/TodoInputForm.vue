<script setup lang="ts">
import axios from 'axios';
import { Ref, ref } from 'vue';
import router from '../router';
import useVuelidate from '@vuelidate/core';

import { required, helpers } from '@vuelidate/validators';
import { Todo } from '../helpers/types';
import { apiURL } from '../helpers/apiURL';

const newTodo: Ref<Todo> = ref({
    todoName: '',
    isComplete: false
})

const hasSpaces = (value: string) => /^[a-z\s]+$/i.test(value.trim())
const includesVue = (value: string) => value.trim().toLowerCase().includes('vue')
const rules = {
    todoName: {
        required,
        hasSpaces: helpers.withMessage('Only letters and spaces', hasSpaces),
        includesVue: helpers.withMessage('Must contain the word "vue" please!', includesVue)
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
    <base-card>
        <form @submit.prevent="postCall">
            <h3>Create a new todo</h3>
            <label for="newTodoName">Name of your todo?</label>
            <input type="text" v-model="newTodo.todoName" @blur="vuelidate.todoName.$touch">
            <span v-if="vuelidate.todoName.$error" class="red-text">
                {{ vuelidate.todoName.$errors[0]?.$message }}
            </span>
            <label for="completed">Completed?<input type="checkbox" id="completed" v-model="newTodo.isComplete"></label>
            <base-button>Submit!</base-button>
            <base-button><router-link to="/">Home</router-link></base-button>
        </form>
    </base-card>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
}

.red-text {
    color: red;
}
</style>