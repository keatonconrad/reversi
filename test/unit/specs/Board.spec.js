import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Board from '@/components/Board.vue'

describe('Board.vue', () => {
  it('should create correct size board', () => {
    const wrapper = mount(Board);
    expect(wrapper.vm.$data.board.length).toEqual(8);
  })

  it('should change turns when a cell is clicked', () => {
    const wrapper = mount(Board);
    expect(wrapper.vm.$data.turn).toEqual('black');
    wrapper.find('td').trigger('click');
    expect(wrapper.vm.$data.turn).toEqual('white');
  })
})
