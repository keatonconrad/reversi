import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Board from '@/components/Board.vue'

describe('Board.vue', () => {
  it('should create correct size board', () => {
    const wrapper = mount(Board, {
      propsData: {
        size: 8
      }
    });
    expect(wrapper.vm.$data.board.length).toEqual(8);
    expect(wrapper.vm.$data.board[0].length).toEqual(8);
  })

  it('should change turns when a cell is clicked', () => {
    const wrapper = mount(Board, {
      propsData: {
        size: 8
      }
    });
    expect(wrapper.vm.$data.turn).toEqual('black');
    wrapper.find('td').trigger('click');
    expect(wrapper.vm.$data.turn).toEqual('white');
  })

  it('should not do anything when clicking on an already-played cell', () => {
    const wrapper = mount(Board, {
      propsData: {
        size: 8
      }
    });
    expect(wrapper.vm.$data.turn).toEqual('black');
    wrapper.find('td').trigger('click');
    wrapper.find('td').trigger('click');
    expect(wrapper.vm.$data.turn).toEqual('white');
  })

  it('should return correct scores', () => {
    const wrapper = mount(Board, {
      propsData: {
        size: 5
      }
    });
    const cells = wrapper.findAll('td');
    for (var i = 0; i < cells.length; i++) {
      cells.at(i).trigger('click');
    }
    expect(wrapper.vm.$data.scores.black).toEqual(21);
    expect(wrapper.vm.$data.scores.white).toEqual(4);
  })

  it('should end game when all spaces are full', () => {
    const wrapper = mount(Board, {
      propsData: {
        size: 8
      }
    });
    const cells = wrapper.findAll('td');
    for (var i = 0; i < cells.length; i++) {
      cells.at(i).trigger('click');
    }
    expect(wrapper.vm.$data.totalCells).toEqual(64);
    expect(wrapper.vm.$data.gameOver).toEqual(true);
  })
})
