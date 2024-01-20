import { required, helpers } from '@vuelidate/validators';

export const rules = {
    todoName: {
        required,
        hasSpaces: helpers.withMessage('Only letters and spaces', (value: string) => /^[a-z\s]+$/i.test(value.trim())),
        includesVue: helpers.withMessage('Must contain the word "vue" please!', (value: string) => value.trim().toLowerCase().includes('vue'))
    }
}