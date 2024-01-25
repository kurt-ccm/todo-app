import {test, expect, describe} from 'vitest'
import TheHeader from './TheHeader.vue'
import { mount } from '@vue/test-utils'

const wrapper = mount(TheHeader)

test('mount component', () => {
    expect(TheHeader).toBeTruthy()

    const h2Element = wrapper.get('[data-test=h2-test]')
    expect(h2Element.text()).toEqual('Welcome to the todo page')
})