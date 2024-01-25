import { mount } from "@vue/test-utils";
import ErrorPage from './ErrorPage.vue'
import { describe, test, expect } from "vitest";

const wrapper = mount(ErrorPage)

describe('mounting error page', () => {
    test('error page mounts', () => {
        expect(wrapper.exists()).toBeTruthy()
    })
})
