<script setup lang="ts">
import axios from 'axios';
import { Ref, onMounted, ref } from 'vue';

import { apiURL } from '../helpers/apiURL';
import { Todo } from '../helpers/types';
import router from '../router';
import useVuelidate from '@vuelidate/core';
import { rules } from '../helpers/rules';

const props = defineProps(['id'])

const dataIsLoaded = ref(false);
const dataIsEditable = ref(false);
const singleTodo: Ref<Todo> = ref({
    todoName: '',
    isComplete: false
})

const vuelidate = useVuelidate(rules, singleTodo);


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

    try {
        vuelidate.value.$touch()
        if (vuelidate.value.$invalid) {
            console.log(vuelidate.value.$errors);
            return
        }

        if (data.code === 200) {
            const postArgs = { todoName: singleTodo.value.todoName.trim(), isComplete: singleTodo.value.isComplete }
            const { data } = await axios.post(apiURL, postArgs)
            router.replace('/');
            return data;
        }

    } catch (error) {
        throw error
    }
}

onMounted(() => {
    getCallById();
})
</script>

<template>
    <base-card>

        <div>
            <h2>Details:</h2>
            <form v-if="dataIsLoaded" disabled>
                <div id="input-fields">
                    <input style="width: 60%;" v-model="singleTodo.todoName" :disabled="!dataIsEditable"
                        @blur="vuelidate.todoName.$touch" />
                    <span v-if="vuelidate.todoName.$error" class="red-text">
                        {{ vuelidate.todoName.$errors[0]?.$message }}
                    </span>
                    <div>
                        <input id="isComplete" type="checkbox" v-model="singleTodo.isComplete" :disabled="!dataIsEditable">
                        <label for="isComplete">Todo completed</label>
                    </div>

                </div>


                <base-button v-if="!dataIsEditable" @click.prevent="dataIsEditable = !dataIsEditable">Edit
                    todo</base-button>
                <base-button v-else @click.prevent="putCall">Submit changes!</base-button>
            </form>
            <p v-else>Data is loading...</p>
            <router-link to="/"><base-button>Home</base-button></router-link>
        </div>

    </base-card>
</template>

<style scoped>
/* div {
    display: flex;
    flex-direction: column;
    justify-content: center;
} */

#input-fields {
    display: flex;
    flex-direction: column;
    align-items: center;

}

.red-text {
    color: red
}
</style>