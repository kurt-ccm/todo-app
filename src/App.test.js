import {test, expect, describe} from 'vitest'
import App from './App.vue'
import { mount } from '@vue/test-utils'

const wrapper = mount(App)

test('mount component', () => {
    expect(App).toBeTruthy()
})