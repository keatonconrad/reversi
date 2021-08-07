import Vue from 'vue'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('Board.vue', () => {
  it('allows setting board dimensions', () => {
    const wrapper = mount(App);
    jest.spyOn(window, 'alert').mockReturnValue();
    wrapper.find('input').setValue(8);
    wrapper.find('button').trigger('click');
    expect(window.alert).not.toHaveBeenCalled();
  })

  it('rejects board size under 3', () => {
    const wrapper = mount(App);
    jest.spyOn(window, 'alert').mockReturnValue();
    wrapper.find('input').setValue(2);
    wrapper.find('button').trigger('click');
    expect(window.alert).toHaveBeenCalled();
  })
})
